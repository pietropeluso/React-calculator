import { types, getSnapshot } from 'mobx-state-tree';

import { operations, buttonTypes } from '../constants/buttons';
import Row from './Row.store';

const DEFAULT_DEFAULT_VALUE = '0';
const DEFAULT_OPERATION_VALUE = '';

const calculatorModel = {
    value: types.optional(types.number, NaN),
    displayValue: types.optional(types.string, DEFAULT_DEFAULT_VALUE),
    operation: types.optional(types.string, DEFAULT_OPERATION_VALUE),
    awaitingOperand: types.optional(types.boolean, true),
    rows: types.optional(types.array(Row), []),
};

const calculatorViews = self => ({
    get rowsArray() {
        return getSnapshot(self.rows);
    },

    isThereADot(stringToCheck) {
        return (/\./).test(stringToCheck);
    },
});

const calculatorActions = self => ({
    clearAll() {
        self.updateState(DEFAULT_DEFAULT_VALUE, true, NaN, DEFAULT_OPERATION_VALUE);
    },

    updateState(
        newDisplayValue = null,
        newAwaitingOperand = null,
        newValue = null,
        newOperation = null,
    ) {
        const {
            value,
            displayValue,
            awaitingOperand,
            operation,
        } = self;

        self.displayValue = newDisplayValue !== null ? newDisplayValue : displayValue;
        self.awaitingOperand = newAwaitingOperand !== null ? newAwaitingOperand : awaitingOperand;
        self.value = newValue !== null ? newValue : value;
        self.operation = newOperation !== null ? newOperation : operation;
    },

    calculateResult(nextOperation = '') {
        const {
            value,
            displayValue,
            operation,
        } = self;
        let result;

        switch (operation) {
            case operations.ADDITION:
                result = value + parseFloat(displayValue);
                break;
            case operations.SUBTRACTION:
                result = value - parseFloat(displayValue);
                break;
            case operations.MULTIPLICATION:
                result = value * parseFloat(displayValue);
                break;
            case operations.DIVISION:
                result = value / parseFloat(displayValue);
                break;
            case operations.EQUAL:
                result = parseFloat(displayValue);
                break;
            case operations.PERCENT:
                result = parseFloat(displayValue) / 100;
        }

        const resultString = result.toString();

        self.updateState(resultString, true, NaN, nextOperation);
    },

    inputOperand(newOperand) {
        const {
            displayValue,
            operation,
            value,
            awaitingOperand
        } = self;

        // there can be only one dot for an operand
        if (newOperand === '.') {
            if (!self.isThereADot(displayValue)) {
                const newDisplayValue = displayValue.concat(newOperand);
                const newAwaitingOperand = operation ? false : true;
                return self.updateState(newDisplayValue, newAwaitingOperand);
            }
            return;
        }

        if (!operation) {
            const newDisplayValue = displayValue === DEFAULT_DEFAULT_VALUE ? newOperand : displayValue.concat(newOperand);
            return self.updateState(newDisplayValue, false);
        } else {
            if (!value) {
                const newValue = parseFloat(displayValue);
                return self.updateState(newOperand, false, newValue);
            }

            if (awaitingOperand) {
                const newValue = parseFloat(displayValue);
                return self.updateState(newOperand, false, newValue);
            } else {
                const newDisplayValue = displayValue.concat(newOperand);
                self.updateState(newDisplayValue);
            }
        }
    },

    invertValue(value) {
        const newValue = -1 * parseFloat(value);
        return newValue.toString();
    },

    inputOperation(newOperation) {
        const { displayValue, operation } = self;
        switch (newOperation) {
            case operations.INVERSION:
                self.displayValue = self.invertValue(displayValue);
                return;
            case operations.CLEAR:
                return self.clearAll();
        }

        if (operation) {
            // calculate result only an operation button has been clicked
            // and a previous operation button has been submitted
            return self.calculateResult(newOperation);
        }

        self.operation = newOperation;
    },

    isOperand(item) {
        return item.type === buttonTypes.OPERAND;
    },

    handleClick(item) {
        if (self.isOperand(item)) {
            return self.inputOperand(item.label);
        }

        return self.inputOperation(item.label);
    },
});

const Calculator = types
    .model('Calculator', calculatorModel)
    .views(calculatorViews)
    .actions(calculatorActions);

export {
    Calculator as default,
    calculatorActions,
    calculatorViews,
};
