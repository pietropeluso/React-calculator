import sinon from 'sinon';

import CalculatorStore, {
    calculatorActions,
    calculatorViews,
} from './Calculator.store';
import { operations } from '../constants/buttons';

test('isThereADot() should return true if there is a dot in the provided string', () => {
    const fakeSelf = {};

    const views = calculatorViews(fakeSelf);

    expect(views.isThereADot('')).toBe(false);
    expect(views.isThereADot('aaaa')).toBe(false);
    expect(views.isThereADot('aaa.312')).toBe(true);
});

test('clearAll action should call `self.updateState` with four arguments', () => {
    const fakeSelf = {
        updateState: sinon.stub(),
    };
    const actions = calculatorActions(fakeSelf);

    actions.clearAll();

    expect(fakeSelf.updateState.calledOnce).toBe(true);
    expect(fakeSelf.updateState.calledWith('0', true, NaN, '')).toBe(true);
});

test(
    'updateState action should update the value of the following properties: ' +
    '(value, displayValue, operation, awaitingOperand) if the respective new value is provided',
    () => {
        const fakeSelf = {
            value: 1,
            displayValue: '12',
            operation: 'addition',
            awaitingOperand: true,
        };

        const newValue = 10;
        const newDisplayValue = '1234';
        const newAwaitingOperand = false;

        const actions = calculatorActions(fakeSelf);

        actions.updateState(newDisplayValue, newAwaitingOperand, newValue);

        expect(fakeSelf.displayValue).toEqual(newDisplayValue);
        expect(fakeSelf.value).toEqual(newValue);
        expect(fakeSelf.awaitingOperand).toEqual(newAwaitingOperand);
        expect(fakeSelf.operation).toEqual(fakeSelf.operation);
    }
);

test(
    'calculateResult action should call `self.updateState` to update the model with ' +
    'the result from the operation',
    () => {
        const fakeSelf = {
            value: 1,
            displayValue: '12',
            operation: operations.ADDITION,
            updateState: sinon.stub(),
        };

        const actions = calculatorActions(fakeSelf);

        actions.calculateResult();

        const expectedResultString = '13';

        expect(fakeSelf.updateState.calledOnce).toBe(true);
        expect(fakeSelf.updateState.calledWith(expectedResultString, true, NaN, '')).toBe(true);
    }
);

test('inputOperand action should call `self.isThereADot` if the submitted operand is a dot', () => {
    const fakeSelf = {
        displayValue: '10',
        operation: '',
        value: 1,
        awaitingOperand: true,
        isThereADot: sinon.stub(),
        updateState: () => null,
    };

    const actions = calculatorActions(fakeSelf);
    const operand = '.';

    actions.inputOperand(operand);

    expect(fakeSelf.isThereADot.calledOnce).toBe(true);
    expect(fakeSelf.isThereADot.calledWith(fakeSelf.displayValue)).toBe(true);
});

test(
    'inputOperand should call `self.updateState` if the submitted operand is a dot and ' +
    '`self.isThereADot` return false',
    () => {
        const fakeSelf = {
            displayValue: '10',
            operation: '',
            value: 1,
            awaitingOperand: true,
            isThereADot: () => false,
            updateState: sinon.stub(),
        };

        const actions = calculatorActions(fakeSelf);
        const operand = '.';

        actions.inputOperand(operand);

        const expectedNewDisplayValue = fakeSelf.displayValue.concat(operand);

        expect(fakeSelf.updateState.calledOnce).toBe(true);
        expect(fakeSelf.updateState.calledWith(expectedNewDisplayValue, true)).toBe(true);
    }
);

test(
    'inputOperand should call `self.updateState` if the submitted operand is a dot and ' +
    '`self.isThereADot` return false',
    () => {
        const fakeSelf = {
            displayValue: '10',
            operation: '',
            value: 1,
            awaitingOperand: true,
            isThereADot: () => false,
            updateState: sinon.stub(),
        };

        const actions = calculatorActions(fakeSelf);
        const operand = '.';

        actions.inputOperand(operand);

        const expectedNewDisplayValue = fakeSelf.displayValue.concat(operand);

        expect(fakeSelf.updateState.calledOnce).toBe(true);
        expect(fakeSelf.updateState.calledWith(expectedNewDisplayValue, true)).toBe(true);
    }
);

test(
    'inputOperand should call `self.updateState` if the submitted ' +
    'operand is NOT a dot and there is no operation selected yet',
    () => {
        const fakeSelf = {
            displayValue: '10',
            operation: '',
            value: 1,
            awaitingOperand: true,
            isThereADot: () => false,
            updateState: sinon.stub(),
        };

        const actions = calculatorActions(fakeSelf);
        const operand = '1';
        const expectedNewDisplayValue = fakeSelf.displayValue.concat(operand);

        actions.inputOperand(operand);

        expect(fakeSelf.updateState.calledOnce).toBe(true);
        expect(fakeSelf.updateState.calledWith(expectedNewDisplayValue, false)).toBe(true);
    }
);

test(
    'inputOperand should call `self.updateState` if the submitted ' +
    'operand is NOT a dot and there is already a valid operation selected and NOT valid `self.value`',
    () => {
        const fakeSelf = {
            displayValue: '10',
            operation: operations.ADDITION,
            value: NaN,
            awaitingOperand: true,
            isThereADot: () => false,
            updateState: sinon.stub(),
        };

        const actions = calculatorActions(fakeSelf);
        const operand = '1';
        const expectedNewValue = parseFloat(fakeSelf.displayValue);

        actions.inputOperand(operand);

        expect(fakeSelf.updateState.calledOnce).toBe(true);
        expect(fakeSelf.updateState.calledWith(operand, false, expectedNewValue)).toBe(true);
    }
);

test(
    'inputOperand should call `self.updateState` if the submitted ' +
    'operand is NOT a dot, there is already a valid operation selected and VALID `self.value` ' +
    'and there `self.awaitingOperand` is true',
    () => {
        const fakeSelf = {
            displayValue: '1',
            operation: operations.ADDITION,
            value: 10,
            awaitingOperand: true,
            isThereADot: () => false,
            updateState: sinon.stub(),
        };

        const actions = calculatorActions(fakeSelf);
        const operand = '1';
        const expectedNewValue = parseFloat(fakeSelf.displayValue);

        actions.inputOperand(operand);

        expect(fakeSelf.updateState.calledOnce).toBe(true);
        expect(fakeSelf.updateState.calledWith(operand, false, expectedNewValue)).toBe(true);
    }
);

test(
    'inputOperand should call `self.updateState` if the submitted ' +
    'operand is NOT a dot, there is already a valid operation selected and VALID `self.value` ' +
    'and there `self.awaitingOperand` is false',
    () => {
        const fakeSelf = {
            displayValue: '1',
            operation: operations.ADDITION,
            value: 10,
            awaitingOperand: false,
            isThereADot: () => false,
            updateState: sinon.stub(),
        };

        const actions = calculatorActions(fakeSelf);
        const operand = '1';
        const newDisplayValue = fakeSelf.displayValue.concat(operand);

        actions.inputOperand(operand);

        expect(fakeSelf.updateState.calledOnce).toBe(true);
        expect(fakeSelf.updateState.calledWith(newDisplayValue)).toBe(true);
    }
);

test('invertValue action should return the inverted value, converted into a string', () => {
    const fakeSelf = {};

    const actions = calculatorActions(fakeSelf);

    expect(actions.invertValue(-100)).toEqual('100');
    expect(actions.invertValue(10)).toEqual('-10');
});

test(
    'inputOperation action should update `self.displayValue` with the value returned by ' +
    '`self.invertValue()` if the operation provided is `operations.INVERSION`',
    () => {
        const fakeSelf = {
            displayValue: '123',
            operation: '',
            invertValue: sinon.stub(),
            clearAll: () => null,
        };

        const actions = calculatorActions(fakeSelf);
        const operation = operations.INVERSION;
        const returnedValue = 'aaa';
        fakeSelf.invertValue.returns(returnedValue);

        actions.inputOperation(operation);

        expect(fakeSelf.invertValue.calledOnce).toBe(true);
        expect(fakeSelf.invertValue.calledWith('123')).toBe(true);
        expect(fakeSelf.displayValue).toEqual(returnedValue);
    }
);

test(
    'inputOperation action should call `self.clearAll` if the operation provided ' +
    'is `operations.CLEAR`',
    () => {
        const fakeSelf = {
            displayValue: '123',
            operation: '',
            invertValue: () => null,
            clearAll: sinon.stub(),
        };

        const actions = calculatorActions(fakeSelf);
        const operation = operations.CLEAR;

        actions.inputOperation(operation);

        expect(fakeSelf.clearAll.calledOnce).toBe(true);
        expect(fakeSelf.clearAll.calledWith()).toBe(true);
    }
);

test(
    'inputOperation action should call `self.calculateResult` if the new operation provided ' +
    'is NOT `operations.CLEAR` or `operation.INVERSION` and there is already an active operation',
    () => {
        const fakeSelf = {
            displayValue: '123',
            operation: operations.ADDITION,
            invertValue: () => null,
            clearAll: () => null,
            calculateResult: sinon.stub(),
        };

        const actions = calculatorActions(fakeSelf);
        const operation = operations.DIVISION;

        actions.inputOperation(operation);

        expect(fakeSelf.calculateResult.calledOnce).toBe(true);
        expect(fakeSelf.calculateResult.calledWith(operation)).toBe(true);
    }
);

test(
    'inputOperation action should update `self.operation` if the new operation provided ' +
    'is NOT `operations.CLEAR` or `operation.INVERSION` and there is NO active operation',
    () => {
        const fakeSelf = {
            displayValue: '123',
            operation: '',
            invertValue: () => null,
            clearAll: () => null,
            calculateResult: sinon.stub(),
        };

        const actions = calculatorActions(fakeSelf);
        const operation = operations.DIVISION;

        actions.inputOperation(operation);

        expect(fakeSelf.calculateResult.calledOnce).toBe(false);
        expect(fakeSelf.operation).toEqual(operation);
    }
);
