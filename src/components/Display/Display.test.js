import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Display from './Display';

describe('Display component', () => {
    let store;
    let getComponent;

    beforeEach(function() {
        store = {
            displayValue: 'displayValue',
        };

        getComponent = () => shallow(
            <Display.wrappedComponent calculatorStore={store} />
        );
    });

    it('renders a div element with a .display class', () => {
        const component = getComponent();

        expect(component.type()).toBe('div');
        expect(component.hasClass('display')).toBe(true);
    });

    it('renders the `display` value from the calculatorStore, inside a <p> element', () => {
        const component = getComponent();
        const child = component.childAt(0);

        expect(child.type()).toBe('p');
        expect(child.text()).toBe(store.displayValue);
    });
});