// Creazione di una classe che immagazzinerà tutte le informazioni provenienti dall'input utente
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  //  Definizione delle funzioni che Calculator può eseguire:
  // 1. Stato iniziale del display e delle proprietà da immagazzinare
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  // 2. Cancellare numero corrente
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1); // taglia via l'ultimo valore della stringa e salva in currentOperator il resto
  }

  // 3. Aggiungere al calcolo ogni numero che viene digitato
  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;  // ferma la funzione impedendo di aggiungere altri punti, se ce n'è già uno
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  // 4. Selezionare operatore
  chooseOperation(operation) {
    if (this.currentOperand === "") return; // "se il currentOperad è vuoto, non eseguire ancora niente"
    if (this.previousOperand !== "") {
      this.compute();
    } // "se c'è qualcosa sul previousOperand e, esegui il calcolo con quello che c'è su currentOperand"
    this.operation = operation; // definire cosa calculator deve usare nel calcolo del valore
    this.previousOperand = this.currentOperand; // "ho finito di digitare il numero corrente e scelto il tipo di operazione, quindi passa il numero su previousOperand..."
    this.currentOperand= ""; // "... e ripulisci la riga del currentOperand"
  }

  // 5. Esecuzione calcolo fra i valori inseriti
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand); // converte la stringa in numero
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return; // se l'utente non ha ancora digitato nessun numero ma preme =, non eseguire nulla
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  // 5.1. Helper function: inserisci simbolo di separazione fra le cifre di numeri grandi
  getDisplayNumber(number) {
    const stringNumber = number.toString(); // per dividere parte intera e parte decimale
    const integerDigits = parseFloat(stringNumber.split(".")[0]); // trasforma la stringa in array e divide in due porzioni: il primo numero prima del punto e il secondo dopo il punto
    const decimalDigits = stringNumber.split(".")[1]; // prende la seconda porzione di stringa all'indice 1
    let integerDisplay; // per mostrarlo separatamente
    if (isNaN(integerDigits)) {
      integerDisplay = ""; // se sullo schermo non c'è nulla o solo la parte decimale
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
    }; // maximumFractionDigits per assicurarmi di non avere nessuna cifra decimale dopo interDigits quando viene convertito in stringa
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay;
    }; // se l'utente ha digitato punto e numeri dopo di esso, mostrare tutto
  }

  // 6. Aggiornare il display durante il calcolo
  updateDisplay() {
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != null) {
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
    } else {
      this.previousOperandTextElement.innerText = "";
    }; // se l'operatore è presente, mostrarlo letteralmente come elemento testo alla fine di previousOperand
  }
}


// Costruzione di variabili per ogni tipo di tasto - quindi di data attribute
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClearButton = document.querySelector("[data-all-clear]");
const deleteButton = document.querySelector("[data-delete]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");


// Impostazione funzionamento delle variabili nell'oggetto Calculator
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

// Ogni volta che un tasto numero viene premuto, aggiungerlo a calcolo e display
numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

// Ogni volta un tasto operazione viene premuto, aggiungerlo a calcolo e display
operationButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

// Quando l'utente preme =, eseguire calcolo
equalsButton.addEventListener("click", button => {
  calculator.compute();
  calculator.updateDisplay();
})

// Quando l'utente preme AC, ripulire display
allClearButton.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener("click", button => {
  calculator.delete();
  calculator.updateDisplay();
})