import { types } from 'mobx-state-tree';

import { operations } from '../constants/buttons';

const calculatorModel = {
    value: types.optional(types.number, NaN),
    displayValue: types.optional(types.string, '0'),
    operation: types.optional(types.string, ''),
    awaitingOperand: types.optional(types.boolean, true),
};

const calculatorViews = self => ({
    isThereADot(stringToCheck) {
        return (/\./).test(stringToCheck);
    },
});

const calculatorActions = self => ({
    clearAll() {
        self.updateState('0', true, NaN, '');
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
            const newDisplayValue = displayValue === '0' ? newOperand : displayValue.concat(newOperand);
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
