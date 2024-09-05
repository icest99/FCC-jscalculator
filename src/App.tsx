import { useState } from 'react';

import './App.css';

function App() {
  const [answer, setAnswer] = useState('');
  const [expression, setExpression] = useState('');
  const et = expression.trim();

  const isOperator = (symbol: string) => {
    return /[+\-*/]/.test(symbol);
  };

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression, so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(' ');
    const newParts = [];
    for (let i = parts.length - 1; i >= 0; i--) {
      if (['*', '/', '+'].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(' ');
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression) as string);
      // setExpression(newExpression);
    } else {
      setAnswer(eval(answer + newExpression) as string);
    }
    setExpression('');
  }; //go through parts backwards

  console.log(expression);

  const buttonPress = (symbol: string) => {
    if (symbol === 'clear') {
      setAnswer('');
      setExpression('0');
    } else if (symbol === 'negative') {
      if (answer === '') return;
      setAnswer(
        answer.toString().charAt(0) === '-' ? answer.slice(1) : '-' + answer
      );
    } else if (symbol === 'percent') {
      if (answer === '') return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + ' ' + symbol + ' ');
    } else if (symbol === '=') {
      calculate();
    } else if (symbol === '0') {
      if (expression.charAt(0) !== '0') {
        setExpression(expression + symbol);
      }
    } else if (symbol === '.') {
      // split by operators and get the last nubmer.
      const lastNumber = expression.split(/[-+/*]/g).pop();
      // if lat number already has a decimal, don't add another
      if (lastNumber?.includes('.')) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === '0') {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  return (
    <>
      <div className='container'>
        <h1>Calculator Application</h1>
        <div id='calculator'>
          <div id='display' style={{ textAlign: 'right' }}>
            <div id='answer'>{answer}</div>
            <div id='expression'>{expression}</div>
          </div>
          <button
            id='clear'
            className='white'
            onClick={() => buttonPress('clear')}
          >
            C
          </button>
          <button
            id='negative'
            className='white'
            onClick={() => buttonPress('negative')}
          >
            +/-
          </button>
          <button
            id='percentage'
            className='white'
            onClick={() => buttonPress('percentage')}
          >
            %
          </button>
          <button
            id='divide'
            className='yellow'
            onClick={() => buttonPress('/')}
          >
            /
          </button>
          <button
            id='seven'
            className='dark-gray'
            onClick={() => buttonPress('7')}
          >
            7
          </button>
          <button
            id='eight'
            className='dark-gray'
            onClick={() => buttonPress('8')}
          >
            8
          </button>
          <button
            id='nine'
            className='dark-gray'
            onClick={() => buttonPress('9')}
          >
            9
          </button>
          <button
            id='multiply'
            className='yellow'
            onClick={() => buttonPress('*')}
          >
            *
          </button>
          <button
            id='four'
            className='dark-gray'
            onClick={() => buttonPress('4')}
          >
            4
          </button>
          <button
            id='five'
            className='dark-gray'
            onClick={() => buttonPress('5')}
          >
            5
          </button>
          <button
            id='six'
            className='dark-gray'
            onClick={() => buttonPress('6')}
          >
            6
          </button>
          <button
            id='subtract'
            className='yellow'
            onClick={() => buttonPress('-')}
          >
            -
          </button>
          <button
            id='one'
            className='dark-gray'
            onClick={() => buttonPress('1')}
          >
            1
          </button>
          <button
            id='two'
            className='dark-gray'
            onClick={() => buttonPress('2')}
          >
            2
          </button>
          <button
            id='three'
            className='dark-gray'
            onClick={() => buttonPress('3')}
          >
            3
          </button>
          <button id='add' className='yellow' onClick={() => buttonPress('+')}>
            +
          </button>
          <button
            id='zero'
            className='dark-gray'
            onClick={() => buttonPress('0')}
          >
            0
          </button>
          <button
            id='decimal'
            className='dark-gray'
            onClick={() => buttonPress('.')}
          >
            .
          </button>
          <button
            id='equals'
            className='yellow'
            onClick={() => buttonPress('=')}
          >
            =
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
