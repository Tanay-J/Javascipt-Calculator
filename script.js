const display = document.querySelector('.display')
const buttons = Array.from(document.querySelectorAll('button'));
let operation = '';
let num1 = '';
let num2 = '';
let result = '';
let operationDisplay = '';

buttons.forEach(num => {
     num.addEventListener('click', setDisplayValue)
})


function setDisplayValue(event){
  
    if(event.target.textContent === 'CLR'){
        num1 = '';
        num2 = '';
        operation = ''; 
        display.textContent = '0' ;
    }else if(event.target.value === 'back'){
        display.textContent = display.textContent.slice(0,-1);
        if(num1 && !num2 && !operation){
            num1 = num1.toString().slice(0,-1);
        }else if(num1 && operation && !num2){
            operation = operation.slice(0,-1);
        }else if(num1 && operation && num2){
            num2 = num2.slice(0,-1);   
        }
    }else if(event.target.className === 'btn' && operation === ''){
        if (hasDecimal(num1)) {
            //Do Nothing
         }else{
            num1 += event.target.textContent;
         }
        
        display.textContent = num1;        
    }else if(event.target.className === 'btn-op' && operation === ''){
        if(event.target.textContent === '='){
            display.textContent = ''; 
            num1 = '';
        }else{
            operationDisplay = event.target.textContent;
            operation = event.target.value;
            display.textContent = num1 + operationDisplay;
        }      
    }else if(event.target.className === 'btn' && operation !== ''){  
        if(operation === '/' && event.target.textContent === '0'){
            display.textContent = 'Oops!'
        }else{
            num2 += event.target.textContent;
            display.textContent = num1 + operationDisplay + num2;;
        }
       
    }else if(operation !== ''){
        
        if(event.target.textContent === '='){
            if(num2 && num1){
                
                result = operate(operation,parseFloat(num1),parseFloat(num2)).toFixed(2);
                num1 = result;
                num2 = '';
                operation = '';
                display.textContent = result;
            }
            
        }else if(num2 && num1){
            result = operate(operation,parseInt(num1),parseInt(num2));
            num1 = result;
            num2 = '';
            operation = event.target.textContent;
            display.textContent = num1 + operation;
        }
        
    }

    
}
function hasDecimal(num){
    return !!(num%1);
}
function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}

function operate(operator, num1, num2){
    if(operator == '+'){
        return add(num1,num2);
    }else if(operator == '-'){
        return  sub(num1,num2);
    }else if(operator == '*'){
        return multiply(num1,num2);
    }else if(operator =='/'){
        return divide(num1,num2);
    }
}

