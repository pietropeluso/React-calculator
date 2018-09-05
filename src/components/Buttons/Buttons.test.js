import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Buttons from './Buttons';

describe('Buttons component', () => {
    let firstRow;
    let secondRow;
    let data;
    let getComponent;

    beforeEach(() => {
        firstRow = [
            {
                label: '11',
                type: '11',
                onClickHandler: () => null,
            },
            {
                label: '12',
                type: '12',
                onClickHandler: () => null,
            },
        ];
        secondRow = [
            {
                label: '21',
                type: '21',
                onClickHandler: () => null,
            },
            {
                label: '22',
                type: '22',
                onClickHandler: () => null,
            },
        ];

        data = [
            firstRow,
            secondRow,
        ];

        getComponent = (rows = data) => shallow(<Buttons rows={rows} />);
    });

    it('renders a div element with a .display class', () => {
        const component = getComponent();

        expect(component.type()).toBe('div');
    });

    it('should render a number of children equals to the size of rows provided', () => {
        const component = getComponent();

        expect(component.children().length).toEqual(data.length);
    });

    it('should render as many Button components, inside each row, as many elements in each row', () => {
        const component = getComponent();

        data.forEach((row, index) => {
            const child = component.childAt(index);
            expect(child.find('Button').length).toEqual(row.length);
            expect(child.hasClass('row')).toBe(true);
        });
    });
});