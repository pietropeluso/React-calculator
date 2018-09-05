import React from 'react';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';

import stores from './stores';
import App from './components/App/App';

const Root = () => (
    <AppContainer>
        <Provider {...stores}>
            <App />
        </Provider>
    </AppContainer>
);

export default Root;
