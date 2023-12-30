// DOM variables

const numberBtns = document.querySelectorAll('[data-number]')
const operatorBtns = document.querySelectorAll('[data-operator]')
const equalBtn = document.querySelector('#equalBtn')
const clearBtn = document.querySelector('#clearBtn')
const deleteBtn = document.querySelector('#deleteBtn')
const displayScreen = document.querySelector('#display-screen')
const activeScreen = document.querySelector('#active-screen')

// Initial states

let currentValue = ''
let previousValue = ''
let selectedOperator = undefined

// Functions

function clear() {
    currentValue = ''
    previousValue = ''
    selectedOperator = undefined
    displayScreen.textContent = ''
}

function deleteNumber() {
    currentValue = currentValue.toString().slice(0, -1)
}

function appendNumber(number) {
    if (number === '.' && currentValue.includes('.')) return
    if ((currentValue === '0' && number !== '.') || typeof currentValue === 'number') {
        currentValue = ''
    }
    currentValue = currentValue.toString() + number.toString()
}

function handleOperator(operator) {
    if (currentValue === '') return
    if (previousValue !== '') {
        operate(selectedOperator, previousValue, currentValue)
    }
    selectedOperator = operator
    previousValue = currentValue
    currentValue = ''
}

function handleEqual() {
    if (selectedOperator === undefined) return
    if (previousValue !== '' && currentValue !== '') {
        displayScreen.textContent += `${currentValue} =`
    }
}

function updateDisplay() {
    activeScreen.textContent = currentValue
    if (selectedOperator != null) {
        displayScreen.textContent = `${previousValue} ${selectedOperator} `
    }
}


function operate(operator, a, b) {
    if(a === '' || b === '') return

    let operation = 0;
    a = Number(a)
    b = Number(b)

    switch (operator) {
        case '+':
            operation = a + b
            break
        case '-':
            operation = a - b
            break
        case 'x':
            operation = a * b
            break
        case '/':
            if (b === 0) {
                alert("That's invalid, you melon")
                return
            }
            operation = a / b
            break
        default:
            return
    }

    currentValue = operation
    previousValue = ''
    selectedOperator = undefined
}

// Event listeners

numberBtns.forEach(function(button) {
    button.addEventListener('click', () => {
        appendNumber(button.textContent)
        updateDisplay()
    })
})

operatorBtns.forEach(function(button) {
    button.addEventListener('click', () => {
        handleOperator(button.textContent)
        updateDisplay()
    })
})

equalBtn.addEventListener('click', () => {
    handleEqual()
    operate(selectedOperator, previousValue, currentValue)
    updateDisplay()
})

clearBtn.addEventListener('click', () => {
    clear()
    updateDisplay()
})

deleteBtn.addEventListener('click', () => {
    deleteNumber()
    updateDisplay()
})