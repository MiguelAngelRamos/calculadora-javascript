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
  value == "+" ? setOperation('+'):null;
  value == "-" ? setOperation('-'):null;
  value == "x" ? setOperation('*'):null;
  value == "/" ? setOperation('/'):null;
  value == "%" ? setOperation('%'):null;
  value == "+/-" ? setOperation('+/-'):null;

  value == "=" ? calculation():null;
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

  inputValueMemo = total;
  
  inputScreen.value = "";
  inputScreen.placeholder = total;
  
}
// 5,6 necesitamos trasnformarlo en 5.6
const transformCommaToPoint = (value) => {
  if(typeof value !== "number") {
    let resultTransform = value.replace(',','.');
    return parseFloat(resultTransform);
  }
  return value;
}