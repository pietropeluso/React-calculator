import React, { Component } from 'react';

import styles from './app.css';
import Display from '../Display/Display';
import Buttons from '../Buttons/Buttons';
import {
    buttonsRows,
    buttonTypes,
    operations,
} from '../../constants/buttons';

const emptyState = {
    value: null,
    displayValue: '0',
    operation: '',
    awaitingOperand: true,
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = emptyState;
    }

    clearAll() {
        this.setState(emptyState);
    }

    clearOperation() {
        this.setState({ operation: '' });
    }

    calculateResult(nextOperation = '') {
        const {
            value,
            displayValue,
            operation,
        } = this.state;
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
        }

        this.setState({
            value: null,
            displayValue: result.toString(),
            operation: nextOperation,
            awaitingOperand: true,
        });
    }

    inputOperand(newOperand) {
        const {
            displayValue,
            operation,
            value,
            awaitingOperand
        } = this.state;

        if (!operation) {
            const newValue = displayValue === '0' ? newOperand : displayValue.concat(newOperand);
            return this.setState({
                displayValue: newValue,
                awaitingOperand: false,
            });
        } else {
            if (!value) {
                return this.setState({
                    value: parseFloat(displayValue),
                    displayValue: newOperand,
                    awaitingOperand: false,
                });
            }

            if (awaitingOperand) {
                this.setState({
                    value: parseFloat(displayValue),
                    awaitingOperand: false,
                    displayValue: newOperand,
                });
            } else {
                this.setState({
                    value: parseFloat(displayValue),
                    displayValue: displayValue.concat(newOperand),
                });
            }
        }
    }

    inputOperation(newOperation) {
        const { operation } = this.state;
        if (operation) {
            // calculate result only an operation button has been clicked
            // and a previous operation button has been submitted
            return this.calculateResult(newOperation);
        }

        this.setState({ operation: newOperation });
    }

    handleButtonClick = item => {
        const {
            label,
            type,
        } = item;

        return type === buttonTypes.OPERAND ?
            this.inputOperand(label)
            :
            this.inputOperation(label);
    }

    addClickHandlerToData = rows => {
        return rows.map(row => {
            return row.map(item => ({
                ...item,
                onClickHandler: () => this.handleButtonClick(item),
            }));
        });
    }

    render() {
        const { displayValue } = this.state;
        const rows = this.addClickHandlerToData(buttonsRows);

        return (
            <div className={styles.appContainer}>
                <Display value={displayValue} />
                <Buttons rows={rows} />
            </div>
        );
    }
}

export default App;