import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

import Button from './Button';
import { buttonTypes } from '../../constants/buttons';

describe('Button component', () => {
    let properties;
    let getComponent;

    beforeEach(() => {
        properties = {
            label: 'label',
            type: 'type',
            onClick: sinon.stub(),
        };

        getComponent = (props = properties) =>
            shallow(<Button {...props} />);
    });

    it('renders a div element with a .display class', () => {
        const component = getComponent()

        expect(component.type()).toBe('div');
    });

    it('the css class for the component has always .button', () => {
        const component = getComponent()

        expect(component.hasClass('button')).toBe(true);
    });

    it(
        'the css class for the component has .operand if ' +
        '`type` is buttonTypes.OPERAND',
        () => {
            const newProps = {
                ...properties,
                type: buttonTypes.OPERAND
            }
            const component = getComponent(newProps)

            expect(component.hasClass('operand')).toBe(true);
        }
    );

    it(
        'the css class for the component has .operation if ' +
        '`type` is buttonTypes.OPERATION',
        () => {
            const newProps = {
                ...properties,
                type: buttonTypes.OPERATION
            }
            const component = getComponent(newProps)

            expect(component.hasClass('operation')).toBe(true);
        }
    );

    it(
        'the css class for the component has .extendedButton if ' +
        '`label` is `0`',
        () => {
            const newProps = {
                ...properties,
                label: '0'
            }
            const component = getComponent(newProps)

            expect(component.hasClass('extendedButton')).toBe(true);
        }
    );

    it('should call the provided onClick function if clicked', () => {
        const component = getComponent()

        component.simulate('click');

        expect(properties.onClick.calledOnce).toBe(true);
    });

    it('should render the `label` value from the properties', () => {
        const component = getComponent()

        expect(component.text()).toBe(properties.label);
    });
});