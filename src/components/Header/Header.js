import React from 'react';

import styles from './header.css';
import logo from './ee-logo.svg';

const Header = () => (
    <div className={styles.header}>
        <img
            src={logo}
            className={styles.logo}
            alt='Equal Experts'
        />
    </div>
);

export default Header;