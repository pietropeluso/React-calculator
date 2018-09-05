import Calculator from './stores/Calculator.store';

const calculatorStore = Calculator.create();

const getStores = () => ({
    calculatorStore,
});

const stores = getStores();

export default stores;