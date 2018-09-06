import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import styles from './buttons.css';

class Buttons extends Component {
    renderButton = item => {
        const onClickHandler = () => {
            this.props.store.handleClick(item);
        }

        return (
            <Button
                label={item.label}
                onClick={onClickHandler}
                type={item.type}
                key={item.label}
            />
        );
    }

    renderRow = row => {
        const buttons = row.buttons.map(this.renderButton);
        return (
            <div className={styles.row}>
                { buttons }
            </div>
        )
    }

    renderRows() {
        const { rowsArray } = this.props.store;
        return rowsArray.map((row, index) => (
            <Fragment key={index}>
                { this.renderRow(row) }
            </Fragment>
        ))
    }

    render() {
        const content = this.renderRows();

        return (
            <div>
                { content }
            </div>
        )
    }
};

Buttons.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Buttons;