import { types } from 'mobx-state-tree';

import Button from './Button.store';

const rowModel = {
    buttons: types.optional(types.array(Button), []),
};

const Row = types.model('Row', rowModel);

export default Row;
