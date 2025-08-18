import React from 'react';
import { useState } from 'react';

import '../App.css';
import Button from './Button';

function Calculator() {
    const [displayValue, setDisplayValue] = useState('0');
    const [lastType, setLastType] = useState(null);
    const [expression, setExpression] = useState('');
    const [currentInput, setCurrentInput] = useState('0');

    //Function to handle floating-point issues
    const formatResult = (result) => {
        const str = String(result);
        const num = parseFloat(result);

        if(!isFinite(num)){
            return str;
        }
        const rounded = Math.round(num * 10000000000) / 10000000000;
        let formatted = String(rounded);

        if(formatted.includes('.')){
            formatted = formatted.replace(/\.?0+$/, '');
        }
        return formatted;
    }

    const handleButtonClick = (value, type) => {
        const MAX_DISPLAY_LENGTH = 20;

        let updatedExpression = expression;
        
        if(value === '0' && updatedExpression === '0' && !updatedExpression.includes('.')) {
            return;
        }
        if (updatedExpression === '0' && value !== '.' && !isNaN(value)) {
            return value;
        }

        if (value === 'C') {
            setDisplayValue('0');
            setLastType(null);
            setExpression('');
            setCurrentInput('0'); 

        } else if (type === 'number') {
            if(currentInput.length >= MAX_DISPLAY_LENGTH) {
                return;
            }
            const newExpression = lastType === 'equals' ? value : expression + value;
            setExpression(newExpression);
            setDisplayValue(prev =>
                lastType === 'equals' ? prev : expression + value
            );
            
           if (lastType === 'operator' || lastType === 'equals') {
                setCurrentInput(value);
            } else {
                setCurrentInput(prev => prev === '0' ? value : prev + value);
            }
            setLastType('number');

        } else if (value === '.') {
            if (currentInput.includes('.')) {
                return; 
            }
            if (currentInput.length >= MAX_DISPLAY_LENGTH) {
                return;
            }
            setExpression(prev => prev + '.');
            setDisplayValue(prev => prev + '.');
            
            
            if (lastType === 'operator' || lastType === 'equals') {
                setCurrentInput('0.');
            } else if (currentInput === '0') {
                setCurrentInput('0.');
            } else {
                setCurrentInput(prev => prev + '.');
            }
            setLastType('decimal');
            
        } else if (['+', '-', '*', '/'].includes(value)) {
            setExpression(prev => {
                let updated = prev;
                if (lastType === 'equals') {
                    updated = currentInput + value;
                }else if (lastType === 'operator') {
                    const lastChar = prev.slice(-1);
                    if (value === '-' && lastChar !== '-') {
                        updated = prev + value;
                    } else {
                        
                        updated = prev.replace(/[\\+\-\\*\\/]+$/, '') + value;
                    }

                } else {
                    updated = prev + value;
                }
                setDisplayValue(updated);
                setCurrentInput(value);
                return updated;
            });
            setLastType('operator');

        } else if (value === '=') {
            try {
                const result = Function(`"use strict"; return (${expression})`)();
                const formattedResult = formatResult(result);
                setDisplayValue(formattedResult);
                setExpression(expression + ' = ' + formattedResult);
                setCurrentInput(formattedResult);
                setLastType('equals');
            } catch {
                setDisplayValue('Error');
                setExpression('Error');
                setLastType('error'); 
                setCurrentInput('Error');
            }
        }
    };

    const buttons = [
        { value: 'C', type: 'function', id: 'clear' },
        { value: '/', type: 'operator', id: 'divide' },
        { value: '*', type: 'operator', id: 'multiply' },
        { value: '7', type: 'number', id: 'seven' },
        { value: '8', type: 'number', id: 'eight' },
        { value: '9', type: 'number', id: 'nine' },
        { value: '-', type: 'operator', id: 'subtract' },
        { value: '4', type: 'number', id: 'four' },
        { value: '5', type: 'number', id: 'five' },
        { value: '6', type: 'number', id: 'six' },
        { value: '+', type: 'operator', id: 'add' },
        { value: '1', type: 'number', id: 'one' },
        { value: '2', type: 'number', id: 'two' },
        { value: '3', type: 'number', id: 'three' },
        { value: '0', type: 'number', id: 'zero' },
        { value: '.', type: 'operator', id: 'decimal' },
        { value: '=', type: 'operator', id: 'equals' },

    ]
    return (
        <div className='calculator'>
            <div className='calculator__body'>
                <div className='calculator__display'>
                    <div className='calculator__expression'>
                        {expression || ''} 
                    </div>
                    <div id='display' className='calculator__result'> 
                        {currentInput}
                    </div>
                </div>

                <div className='calculator__buttons'>
                    {buttons.map((button, index) => (
                        <Button
                            key={index}
                            value={button.value}
                            id={button.id}
                            type={button.type}
                            onClick={() => handleButtonClick(button.value, button.type)}
                        />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Calculator;