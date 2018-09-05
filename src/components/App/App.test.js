import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import App from './App';

describe('App component', () => {
    let getComponent;
    let calculatorStore;

    beforeEach(() => {
        calculatorStore = {
            value: null,
            displayValue: '0',
            operation: '',
            awaitingOperand: true,
        };

        getComponent = (store = calculatorStore) =>
            shallow(<App.wrappedComponent calculatorStore={store} />);
    });

    it('should render a div element with the .appContainer class', () => {
        const component = getComponent();

        expect(component.type()).toBe('div');
        expect(component.hasClass('appContainer')).toBe(true);
    });

    it('should render Header, Display and Buttons components ', () => {
        const component = getComponent();
        const first = component.childAt(0)
        const second = component.childAt(1)
        const third = component.childAt(2)

        expect(first.name().includes('Header')).toBe(true);
        expect(second.name().includes('Display')).toBe(true);
        expect(third.name().includes('Buttons')).toBe(true);
    });
});