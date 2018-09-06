import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';

import styles from './app.css';
import Display from '../Display/Display';
import Buttons from '../Buttons/Buttons';
import Header from '../Header/Header';

@inject('calculatorStore')
class App extends Component {
    render() {
        return (
            <div className={styles.appContainer}>
                <Header />
                <Display />
                <Buttons store={this.props.calculatorStore} />
            </div>
        );
    }
}

App.wrappedComponent.propTypes = {
    calculatorStore: PropTypes.object.isRequired,
};

export default App;