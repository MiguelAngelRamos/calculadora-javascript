let inputValueMemo = 0;
let operator;

const getContentClick = event => {
  // console.log(event.target.innerHTML);
  const value  = event.target.innerHTML;
  // este value va ser un string "x" o "2"
  // de que x puede ser transformado a valor numero
  // en cambio "2" puede ser parseado a 2 number
  filterAction(value);
}

// Función para filtrar los procesos
const filterAction = (value) => {
  let valorNumber;
  // HAGO CLICK EN LA X
  // 4 STRING "4"
  value != ','?valorNumber = parseInt(value):null;
  // NaN

  if(isNaN(valorNumber) && value == ',') {
    addNumberInput(value)
  } else if(!isNaN(valorNumber) && valorNumber !=','){
    addNumberInput(parseInt(value));
  }

  // operaciones
  switch (value) {
    case "+":
      setOperation("+");
      break;
    case "-":
      setOperation("-");
      break;
    case "x":
      setOperation("*");
      break;
    case "/":
      setOperation("/");
      break;
    case "%":
      setOperation("%");
      break;
    case "+/-":
      setOperation("+/-");
      break;
    case "=":
      calculation();
      break;
    case "AC":
      resetCalculator();
      break;
    default:
      break;
  }
  // value == "+" ? setOperation('+'):null;
  // value == "-" ? setOperation('-'):null;
  // value == "x" ? setOperation('*'):null;
  // value == "/" ? setOperation('/'):null;
  // value == "%" ? setOperation('%'):null;
  // value == "+/-" ? setOperation('+/-'):null;
  // value == "=" ? calculation():null;
}

const addNumberInput = (value) => {
  
  //const inputScreen = document.getElementsByClassName('calculator__screen')[0];
  const inputScreen = document.querySelector('.calculator__screen'); // capturando el elemento
  const inputValue = inputScreen.value;
  
  if(inputValue === "0" && inputValue.length === 1 && value != ',') {
    inputScreen.value = value
    return;
  }
  console.log(typeof inputValue); // string
  console.log(typeof value); // numero
  // no se suman si no que se concatenan
  inputScreen.value = inputValue + value;
 
}

// operaciones (op)
const setOperation = (op) => {
  const inputScreenValue = document.querySelector('.calculator__screen').value;
  // el valor del input
  operator = op;
  console.log(operator);
  if(inputScreenValue !=0) {
    // vamos a llamar a otra funcion que nos realize el calculo
    calculation();
  }
}

const calculation = () => {
  let total = 0;
  const inputScreen = document.querySelector('.calculator__screen');
  // <input />
  let valueOne = transformCommaToPoint(inputValueMemo); // es un number
  let valueTwo = transformCommaToPoint(inputScreen.value); // siempre es un string, pero cuando pasa por la funcion es un numero float
  
  // suma
  if(operator === '+' && inputScreen.value !== "") {
    total = valueOne + valueTwo;
  }
 
  // La resta
  if(operator === '-' && inputScreen.value !=="") {
    if(valueOne !== 0) {
      total = valueOne - valueTwo;
    } else {
      total = valueTwo;
    }
  }
  
  // Multiplicación
  if(operator === '*' && inputScreen.value !=="") {
    if(valueOne !== 0) {
      total = valueOne * valueTwo;
    } else {
      total = valueTwo;
    }
  }

  // División

  if(operator === '/' && inputScreen.value !=="") {
    if(valueOne !== 0) {
      total = valueOne / valueTwo;
    } else {
      total = valueTwo;
    }
  }

  // Porcentaje
  if(operator === '%' && inputScreen.value !=="") {
      total =  valueTwo / 100;
  }
  //  "+/-"

  // antes  de asignarle a la variable global de memoria
  // hacemos la transformacion
  total = transformPointToComma(total);
  inputValueMemo = total;
  inputScreen.value = "";
  inputScreen.placeholder = total;
}

// AC Limpiar el visor
const resetCalculator = () => {
  const inputScreen = document.querySelector('.calculator__screen');
  inputScreen.value = 0;
  inputValueMemo = 0;
  operator = null;
}
// 5,6 necesitamos trasnformarlo en 5.6
const transformCommaToPoint = (value) => {
  if(typeof value !== "number") {
    let resultTransform = value.replace(',','.');
    return parseFloat(resultTransform);
  }
  // estoy devolviendo un valor numero con coma flotante
  return value;
}

const transformPointToComma = value => {
  let resultTransform = value.toString();
  resultTransform = resultTransform.replace('.', ',');
  return resultTransform;
}