import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Header from './Header';

describe('Header component', () => {
    let getComponent;

    beforeEach(() => {
        getComponent = () => shallow(<Header />);
    });

    it('should render a div element with the .header class', () => {
        const component = getComponent();

        expect(component.type()).toBe('div');
        expect(component.hasClass('header')).toBe(true);
    });

    it('should render an image as child element', () => {
        const component = getComponent();
        const child = component.childAt(0)

        expect(child.type()).toBe('img');
        expect(child.hasClass('logo')).toBe(true);
    });
});