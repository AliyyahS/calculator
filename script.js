// DOM variables

const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const pointBtn = document.querySelector('#pointBtn');
const equalBtn = document.querySelector('#equalBtn');
const clearBtn = document.querySelector('#clearBtn');
const deleteBtn = document.querySelector('#deleteBtn');
const displayScreen = document.querySelector('#display-screen');
const activeScreen = document.querySelector('#active-screen');

// Initial states

let firstNumber = '';
let secondNumber = '';
let selectedOperator = '';

let displayValue = '';
let activeValue = '';

// Functions

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case 'x':
            return a * b;
        case '/':
            if (b === 0) {
                alert("That's invalid, you melon");
                return null;
            }
            return a / b;
        default:
            return null;
    }
}

function handleNumber(number) {
    if (activeValue === '' && number == 0) {
        activeScreen.textContent = 0;
        return null;
    } else {
        activeValue += number;
        activeScreen.textContent = activeValue;
        return activeValue;
    }
}

function handleOperator(operator) {
    if (firstNumber === '' && secondNumber === '') {
        selectedOperator = operator;
        firstNumber = Number(activeValue);
        displayValue = `${firstNumber} ${operator} `;
        activeValue = '';
    } else if (typeof firstNumber === 'number' && secondNumber === '') {
        secondNumber = Number(activeValue);
        displayValue += secondNumber;
        activeValue = '';
    }
    
    if (typeof firstNumber === 'number' && typeof secondNumber === 'number') {
        activeValue = roundAnswer(operate(selectedOperator, firstNumber, secondNumber));
        if (activeValue === null) {
            return;
        } else activeScreen.textContent = activeValue;
    }
    
    if (typeof activeValue === 'number') {
        selectedOperator = operator;
        firstNumber = activeValue;
        secondNumber = '';
        displayValue = `${firstNumber} ${operator} `;
        activeValue = '';
    }

    displayScreen.textContent = displayValue;
}

function calculate() {
    secondNumber = Number(activeValue);
    activeValue = roundAnswer(operate(selectedOperator, firstNumber, secondNumber));

    if (activeValue === null) {
        return;
    } else {
        displayValue = `${firstNumber} ${selectedOperator} ${secondNumber} =`
        displayScreen.textContent = displayValue;
        activeScreen.textContent = activeValue;
    }
}

function roundAnswer(number) {
    return Math.round(number * 1e6) / 1e6;
}

// Event listeners

numberBtns.forEach(function(button) {
    button.addEventListener('click', () => handleNumber(button.textContent));
});

operatorBtns.forEach(function(button) {
    button.addEventListener('click', () => handleOperator(button.textContent));
});

equalBtn.addEventListener('click', calculate);