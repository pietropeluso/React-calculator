import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';

const renderApplication = Component => {
    ReactDOM.hydrate(
        <Component />,
        document.getElementById('root')
    );
}

renderApplication(Root);

if (module.hot) {
    module.hot.accept('./Root.js', () => {
        const App = require('./Root').default;
        renderApplication(App);
    });
}