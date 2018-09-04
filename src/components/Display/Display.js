import React from 'react';
import PropTypes from 'prop-types';

import styles from './display.css';

const Display = ({ value }) => (
    <div className={styles.display}>
        <p>{ value }</p>
    </div>
);

Display.propTypes = {
    value: PropTypes.string.isRequired,
};

export default Display;