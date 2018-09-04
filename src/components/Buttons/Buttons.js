import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import styles from './buttons.css';

class Buttons extends Component {
    renderRow = row => {
        const buttons = row.map(item => {
            return (
                <Button
                    label={item.label}
                    onClick={item.onClickHandler}
                    type={item.type}
                    key={item.label}
                />
            );
        });

        return (
            <div className={styles.row}>{ buttons }</div>
        )
    }

    render() {
        const rows = this.props.rows.map((row, index) => {
            return (
                <Fragment key={index}>
                    { this.renderRow(row) }
                </Fragment>
            )
        });

        return (
            <div>
                { rows }
            </div>
        )
    }
};

Buttons.propTypes = {
    rows: PropTypes.array.isRequired,
};

export default Buttons;