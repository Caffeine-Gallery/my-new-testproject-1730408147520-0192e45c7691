import { backend } from 'declarations/backend';

let display = document.getElementById('display');
let buttons = document.querySelectorAll('.keypad button, .btn-danger');
let currentInput = '';
let operator = '';
let firstOperand = null;

buttons.forEach(button => {
    button.addEventListener('click', () => handleButtonClick(button.textContent));
});

async function handleButtonClick(value) {
    if (value === 'Clear') {
        currentInput = '';
        operator = '';
        firstOperand = null;
        display.value = '';
    } else if ('0123456789.'.includes(value)) {
        currentInput += value;
        display.value = currentInput;
    } else if ('+-*/'.includes(value)) {
        if (currentInput !== '') {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
                currentInput = '';
                operator = value;
            } else {
                await performCalculation();
                operator = value;
            }
        }
    } else if (value === '=') {
        await performCalculation();
    }
}

async function performCalculation() {
    if (firstOperand !== null && currentInput !== '' && operator !== '') {
        const secondOperand = parseFloat(currentInput);
        let result;

        display.value = 'Calculating...';

        try {
            switch (operator) {
                case '+':
                    result = await backend.add(firstOperand, secondOperand);
                    break;
                case '-':
                    result = await backend.subtract(firstOperand, secondOperand);
                    break;
                case '*':
                    result = await backend.multiply(firstOperand, secondOperand);
                    break;
                case '/':
                    result = await backend.divide(firstOperand, secondOperand);
                    break;
            }

            display.value = result.toString();
            firstOperand = result;
            currentInput = '';
        } catch (error) {
            display.value = 'Error';
            console.error('Calculation error:', error);
        }
    }
}
