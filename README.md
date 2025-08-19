# React Calculator

A fully functional calculator built with React that handles basic arithmetic operations with proper floating-point precision handling.

## Features

- **Basic Arithmetic Operations**: Addition, subtraction, multiplication, and division
- **Floating-Point Precision**: Automatically handles JavaScript's floating-point precision issues
- **Decimal Support**: Full decimal number input and calculation
- **Expression Display**: Shows both the current calculation and the full expression
- **Error Handling**: Graceful error handling for invalid operations
- **Responsive Design**: Clean, intuitive calculator interface
- **Clear Function**: Reset calculator with the 'C' button

## Demo

```
https://mxxpxn.github.io/calculator-js/
```

## Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd calculator-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

## Usage

### Basic Operations
- **Numbers (0-9)**: Click to input numbers
- **Decimal Point (.)**: Add decimal point to numbers
- **Operators (+, -, *, /)**: Perform arithmetic operations
- **Equals (=)**: Calculate and display result
- **Clear (C)**: Reset calculator to initial state

### Special Features

#### Floating-Point Precision
The calculator automatically handles JavaScript's floating-point arithmetic issues by:
- Rounding results to 10 decimal places to eliminate precision errors
- Removing trailing zeros for clean display
- Preserving mathematical accuracy for all calculations

#### Expression Tracking
- **Top Display**: Shows the full mathematical expression
- **Main Display**: Shows the current number or result
- **Chained Calculations**: Continue calculations using previous results

## Component Structure

```
Calculator/
├── Calculator.js          # Main calculator component
├── Button.js             # Individual calculator button component
└── App.css              # Styling for the calculator
```

## State Management

The calculator uses multiple React state variables:

- `displayValue`: The main number shown to the user
- `expression`: The complete mathematical expression
- `currentInput`: Tracks the current number being entered
- `lastType`: Tracks the type of the last button pressed

## Code Architecture

### Key Functions

#### `formatResult(result)`
Handles floating-point precision by:
- Rounding to 10 decimal places
- Removing unnecessary trailing zeros
- Handling edge cases (NaN, Infinity)

#### `handleButtonClick(value, type)`
Main event handler that processes all button interactions:
- **Numbers**: Builds current number display
- **Operators**: Manages expression building and operator precedence
- **Decimal**: Handles decimal point input with validation
- **Equals**: Evaluates expression and formats result
- **Clear**: Resets all calculator state

## Button Configuration

```javascript
const buttons = [
  { value: 'C', type: 'function', id: 'clear' },
  { value: '/', type: 'operator', id: 'divide' },
  { value: '*', type: 'operator', id: 'multiply' },
  // ... more buttons
]
```

## Styling

The calculator uses CSS classes:
- `.calculator`: Main container
- `.calculator__body`: Calculator body wrapper  
- `.calculator__display`: Display area container
- `.calculator__expression`: Expression display (top)
- `.calculator__result`: Main result display (bottom)
- `.calculator__buttons`: Button grid container

## Known Limitations

- Maximum display length: 20 characters
- Uses `Function()` for expression evaluation (safe for calculator context)
- No advanced mathematical functions (trigonometry, logarithms, etc.)
- No memory functions (M+, M-, MR, MC)

WILL BE SOON


## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React
- Solves common JavaScript floating-point precision issues
- Inspired by standard calculator interfaces