import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import Buttons from './Buttons';

describe('Buttons component', () => {
    let firstRow;
    let secondRow;
    let getComponent;
    let fakeStore;

    beforeEach(() => {
        firstRow = {
            buttons: [
                {
                    label: '11',
                    type: '11',
                },
                {
                    label: '12',
                    type: '12',
                },
            ],
        };
        secondRow = {
            buttons:[
                {
                    label: '21',
                    type: '21',
                },
                {
                    label: '22',
                    type: '22',
                },
            ],
        };

        fakeStore = {
            rowsArray: [
                firstRow,
                secondRow,
            ]
        };

        getComponent = (store = fakeStore) => shallow(<Buttons store={store} />);
    });

    it('renders a div element with a .display class', () => {
        const component = getComponent();

        expect(component.type()).toBe('div');
    });

    it('should render a number of children equals to the size of rows provided', () => {
        const component = getComponent();

        expect(component.children().length).toEqual(fakeStore.rowsArray.length);
    });

    it('should render as many Button components, inside each row, as many elements in each row', () => {
        const component = getComponent();

        fakeStore.rowsArray.forEach((row, index) => {
            const child = component.childAt(index);
            expect(child.hasClass('row')).toBe(true);
            expect(child.find('Button').length).toEqual(row.buttons.length);
            expect(child.hasClass('row')).toBe(true);
        });
    });
});