import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import styles from './app.css';
import Display from '../Display/Display';
import Buttons from '../Buttons/Buttons';
import Header from '../Header/Header';
import {
    buttonsRows,
    buttonTypes,
} from '../../constants/buttons';

const emptyState = {
    value: null,
    displayValue: '0',
    operation: '',
    awaitingOperand: true,
};

@inject('calculatorStore')
class App extends Component {
    handleButtonClick = item => {
        const {
            label,
            type,
        } = item;

        const {
            inputOperand,
            inputOperation,
        } = this.props.calculatorStore;

        return type === buttonTypes.OPERAND ?
            inputOperand(label)
            :
            inputOperation(label);
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
        const { displayValue } = this.props.calculatorStore;
        const rows = this.addClickHandlerToData(buttonsRows);

        return (
            <div className={styles.appContainer}>
                <Header />
                <Display value={displayValue} />
                <Buttons rows={rows} />
            </div>
        );
    }
}

App.wrappedComponent.propTypes = {
    calculatorStore: PropTypes.object.isRequired,
};

export default App;