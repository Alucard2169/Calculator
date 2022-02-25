const allButtons = document.querySelectorAll('button');
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operator]');
const clear = document.querySelector('[data-clear]');
const del = document.querySelector('[data-delete]');
const currentNumber = document.querySelector('.current');
const previousNumber = document.querySelector('.previous');
const calc = document.querySelector('[data-sol]')


//calculator functionality class 

class Calculator {
    constructor(previousNumber, currentNumber) {
        this.previousNumber = previousNumber;
        this.currentNumber = currentNumber;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    del() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    calc() {
        let solution;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                solution = prev + current;
                break
            case '-':
                solution = prev - current;
                break
            case '*':
                solution = prev * current;
                break
            case "/":
                solution = prev / current;
                break
            default:
                return 
        }
        this.currentOperand = solution;
        this.operation = undefined;
        this.previousOperand = '';

    }

    currentOperation(operation) {
        if (this.currentOperand == '') return;
        if (this.previousOperand != ''){
            this.calc();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    appendInput(number) {
        if (number == '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    updateDisplay() {
        this.currentNumber.innerText = this.currentOperand;
        if (this.operation != null) {
            this.previousNumber.innerText =
                `${this.previousOperand} ${this.operation}`;
        }
        else {
            this.previousNumber.innerText = ''
        }
    }
}



// main calculator object

const calculator = new Calculator(previousNumber, currentNumber);


// button functionality

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendInput(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.currentOperation(button.innerText);
        calculator.updateDisplay()
    })
})

clear.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

calc.addEventListener('click', () => {
    calculator.calc();
    calculator.updateDisplay();
})

del.addEventListener('click', () => {
    calculator.del();
    calculator.updateDisplay();
})











// click effect

allButtons.forEach((button) => {
    button.addEventListener('click', () => {
        button.classList.add('clicked');
    })
})

function endEffect(e) {
    if (e.propertyName != 'transform') return;

    this.classList.remove('clicked')
}

allButtons.forEach((button) => {
    button.addEventListener('transitionend', endEffect)
})