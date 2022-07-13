class Calculator {
    constructor(previousOpTxtElement, currentOpTxtElement) {
        this.previousOpTxtElement = previousOpTxtElement
        this.currentOpTxtElement = currentOpTxtElement
        this.clear()
    }

    clear() {
        this.currentOp = ' '
        this.previousOp = ' '
        this.operation = undefined
    }

    delete() {
        this.currentOp = this.currentOp.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOp.includes('.')) return
        this.currentOp = this.currentOp.toString() + number.toString()

    }

    chooseOp(operation) {
        if (this.currentOp === '') return
        if (this.previousOp !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOp = this.currentOp
        this.currentOp = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOp)
        const current = parseFloat(this.currentOp)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOp = computation
        this.operation = undefined
        this.previousOp = ''

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOpTxtElement.innerHTML = this.getDisplayNumber(this.currentOp)
        if (this.operation != null) {
            this.previousOpTxtElement.innerHTML = `${this.getDisplayNumber(this.previousOp)} ${this.operation}`
        } else {
            this.previousOpTxtElement.innerHTML = ''
        }

    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButton = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOpTxtElement = document.querySelector('[data-previous]')
const currentOpTxtElement = document.querySelector('[data-current]')

const calculator = new Calculator(previousOpTxtElement, currentOpTxtElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerHTML)
        calculator.updateDisplay()
    })
})
operationButton.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOp(button.innerHTML)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})