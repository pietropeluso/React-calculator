const buttonTypes = {
    OPERAND: 'operand',
    OPERATION: 'operation',
    NONE: 'none',
};

const operations = {
    ADDITION: '+',
    SUBTRACTION: '-',
    MULTIPLICATION: '*',
    DIVISION: '/',
    PERCENT: '%',
    EQUAL: '=',
    CLEAR: 'c',
};

const firstRow = [
    {
        label: 'AC',
        type: buttonTypes.OPERATION,
    },
    {
        label: '±',
        type: buttonTypes.OPERATION,
    },
    {
        label: operations.PERCENT,
        type: buttonTypes.OPERATION,
    },
    {
        label: operations.DIVISION,
        type: buttonTypes.OPERATION,
    },
];

const secondRow = [
    {
        label: '7',
        type: buttonTypes.OPERAND,
    },
    {
        label: '8',
        type: buttonTypes.OPERAND,
    },
    {
        label: '9',
        type: buttonTypes.OPERAND,
    },
    {
        label: operations.MULTIPLICATION,
        type: buttonTypes.OPERATION,
    },
];

const thirdRow = [
    {
        label: '4',
        type: buttonTypes.OPERAND,
    },
    {
        label: '5',
        type: buttonTypes.OPERAND,
    },
    {
        label: '6',
        type: buttonTypes.OPERAND,
    },
    {
        label: operations.SUBTRACTION,
        type: buttonTypes.OPERATION,
    },
];

const fourthRow = [
    {
        label: '1',
        type: buttonTypes.OPERAND,
    },
    {
        label: '2',
        type: buttonTypes.OPERAND,
    },
    {
        label: '3',
        type: buttonTypes.OPERAND,
    },
    {
        label: operations.ADDITION,
        type: buttonTypes.OPERATION,
    },
];

const fifthRow = [
    {
        label: '0',
        type: buttonTypes.OPERAND,
    },
    {
        label: '',
        type: buttonTypes.NONE,
    },
    {
        label: '.',
        type: buttonTypes.OPERAND,
    },
    {
        label: operations.EQUAL,
        type: buttonTypes.OPERATION,
    },
]

const buttonsRows = [
    firstRow,
    secondRow,
    thirdRow,
    fourthRow,
    fifthRow,
];

export {
    buttonsRows,
    buttonTypes,
    operations,
};