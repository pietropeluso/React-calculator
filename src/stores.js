import Calculator from './stores/Calculator.store';
import { buttonsRows } from './constants/buttons';

const calculatorStore = Calculator.create({ rows: buttonsRows });

const getStores = () => ({
    calculatorStore,
});

const stores = getStores();

export default stores;