#!/usr/bin/env node

// Node.js CLI Calculator
// Supported operations:
//  - addition      : add or +
//  - subtraction   : subtract or -
//  - multiplication: multiply or x or *
//  - division      : divide or / or ÷

// Usage examples:
//   node src/calculator.js add 3 5    # outputs: 8
//   node src/calculator.js divide 8 2 # outputs: 4

function printUsage() {
  console.error('Usage: node src/calculator.js <operation> <operand1> <operand2>');
  console.error('Operations: add | +, subtract | -, multiply | x | *, divide | / | ÷');
}

// Exportable functions for unit testing
function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
function divide(x, y) { if (y === 0) throw new Error('Division by zero'); return x / y; }

// CLI entrypoint: only run when invoked directly
if (require.main === module) {
  const [, , opRaw, aRaw, bRaw] = process.argv;

  if (!opRaw || !aRaw || !bRaw) {
    printUsage();
    process.exit(1);
  }

  const op = opRaw.toLowerCase();
  const a = Number(aRaw);
  const b = Number(bRaw);

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    console.error('Error: operands must be valid numbers');
    process.exit(1);
  }

  let result;

  switch (op) {
    case 'add':
    case '+':
      result = add(a, b);
      break;
    case 'subtract':
    case 'sub':
    case '-':
      result = subtract(a, b);
      break;
    case 'multiply':
    case 'mul':
    case 'x':
    case '*':
      result = multiply(a, b);
      break;
    case 'divide':
    case 'div':
    case '/':
    case '÷':
      if (b === 0) {
        console.error('Error: Division by zero');
        process.exit(2);
      }
      result = divide(a, b);
      break;
    default:
      console.error(`Error: unknown operation '${opRaw}'`);
      printUsage();
      process.exit(1);
  }

  // Print the numeric result to stdout
  console.log(result);
  process.exit(0);
}

// Export functions for tests
module.exports = { add, subtract, multiply, divide, printUsage };

