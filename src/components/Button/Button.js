import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';

import styles from './button.css';
import { buttonTypes } from '../../constants/buttons';

const Button = ({
    label,
    type,
    onClick,
}) => {
    const style = classname(
        styles.button, {
            [styles.operand]: type === buttonTypes.OPERAND,
            [styles.operation]: type === buttonTypes.OPERATION,
            [styles.extendedButton]: label === '0',
    });

    return (
        <div
            onClick={onClick}
            className={style}>
            { label }
        </div>
    );
};

Button.propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default Button;