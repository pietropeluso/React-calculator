import { types } from 'mobx-state-tree';

const buttonModel = {
    label: types.string,
    type: types.string,
};

const Button = types.model('Button', buttonModel)

export default Button;
