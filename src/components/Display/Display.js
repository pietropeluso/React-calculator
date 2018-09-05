import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from 'mobx-react';

import styles from './display.css';

@inject('calculatorStore')
@observer
class Display extends Component {
    render() {
        const { displayValue } = this.props.calculatorStore;
        return (
            <div className={styles.display}>
                <p>{ displayValue }</p>
            </div>
        );
    }
}

Display.wrappedComponent.propTypes = {
    calculatorStore: PropTypes.object.isRequired,
};

export default Display;