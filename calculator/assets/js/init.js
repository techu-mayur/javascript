  // Add event listener to buttons
  const buttons = document.querySelectorAll('.calculator_body input[type="button"]');
  buttons.forEach((button) => {
    button.addEventListener('click', handleButtonClick);
  });
  let isCalculatorOn = true;
  // Handle button click events
  function handleButtonClick(event) {
    const buttonValue = event.target.value;
    const inputField = document.forms['calcform'].txt1;
    if (!isCalculatorOn) {
      if (buttonValue === 'ON/OFF') {
        isCalculatorOn = true;
        inputField.disabled = false;
        clearInput();
      }
      return;
    }
    switch (buttonValue) {
      case 'C/CL':
        clearInput();
        break;
      case '+/-':
        changeSign();
        break;
      case '=':
        calculateResult();
        break;
      case 'TAX+':
        addTax();
        break;
      case 'TAX-':
        subtractTax();
        break;
      case 'RATE':
        calculateRate();
        break;
      case 'ON/OFF':
        isCalculatorOn = false;
        inputField.disabled = true;
        clearInput();
        break;
      case 'M+':
        addToMemory();
        break;
      case 'M-':
        subtractFromMemory();
        break;
      default:
        addToInput(buttonValue);
    }
  }
  // Concatenate the clicked number or operator to the input field
  function addToInput(value) {
    const inputField = document.forms['calcform'].txt1;
    if (inputField.value === '0') {
      inputField.value = '';
    }
    inputField.value += value;
  }
  // Evaluate the mathematical expression and display the result
  function calculateResult() {
    const inputField = document.forms['calcform'].txt1;
    const expression = inputField.value;
    try {
      const result = eval(expression);
      inputField.value = result;
    } catch (error) {
      inputField.value = 'Error';
    }
  }
  // Clear the input field
  function clearInput() {
    const inputField = document.forms['calcform'].txt1;
    inputField.value = '';
  }
  // Change the sign of the input value (+/-)
  function changeSign() {
    const inputField = document.forms['calcform'].txt1;
    const currentValue = parseFloat(inputField.value);
    inputField.value = -currentValue;
  }
  // Add tax to the current value
  function addTax() {
    const inputField = document.forms['calcform'].txt1;
    const currentValue = parseFloat(inputField.value);
    const tax = 0.1; // Example tax rate, you can change this as per your requirement
    const result = currentValue + (currentValue * tax);
    inputField.value = result;
  }
  // Subtract tax from the current value
  function subtractTax() {
    const inputField = document.forms['calcform'].txt1;
    const currentValue = parseFloat(inputField.value);
    const tax = 0.1; // Example tax rate, you can change this as per your requirement
    const result = currentValue - (currentValue * tax);
    inputField.value = result;
  }
  // Calculate the rate of the current value
  function calculateRate() {
    const inputField = document.forms['calcform'].txt1;
    const currentValue = parseFloat(inputField.value);
    const rate = 0.05; // Example rate, you can change this as per your requirement
    const result = currentValue * rate;
    inputField.value = result;
  }
  // Add the current value to memory
  function addToMemory() {
    const inputField = document.forms['calcform'].txt1;
    const currentValue = parseFloat(inputField.value);
    const memoryValue = parseFloat(localStorage.getItem('memory')) || 0;
    const result = memoryValue + currentValue;
    localStorage.setItem('memory', result);
  }
  // Subtract the current value from memory
  function subtractFromMemory() {
    const inputField = document.forms['calcform'].txt1;
    const currentValue = parseFloat(inputField.value);
    const memoryValue = parseFloat(localStorage.getItem('memory')) || 0;
    const result = memoryValue - currentValue;
    localStorage.setItem('memory', result);
  }
