
// Node.js CLI Calculator
// Supported operations:
//  - addition      : add or +
//  - subtraction   : subtract or -
//  - multiplication: multiply or x or *
//  - division      : divide or / or ÷
//  - modulo        : modulo or % or mod
//  - exponentiation: pow or ^ or ** or exp
//  - square root   : sqrt or √

function printUsage() {
  console.error('Usage: node src/calculator.js <operation> <operand1> [operand2]');
  console.error('Operations: add | +, subtract | -, multiply | x | *, divide | / | ÷, modulo | %, pow | ^ | **, sqrt (unary)');
}

// Exportable functions for unit testing
function add(x, y) { return x + y; }
function subtract(x, y) { return x - y; }
function multiply(x, y) { return x * y; }
function divide(x, y) { if (y === 0) throw new Error('Division by zero'); return x / y; }
function modulo(x, y) { if (y === 0) throw new Error('Modulo by zero'); return x % y; }
function pow(x, y) { return Math.pow(x, y); }
function sqrt(x) { if (x < 0) throw new Error('Square root of negative number'); return Math.sqrt(x); }

// New API names requested in feature request
function power(base, exponent) { return pow(base, exponent); }
function squareRoot(n) { if (n < 0) throw new Error('Square root of negative number'); return Math.sqrt(n); }

// CLI entrypoint: only run when invoked directly
if (require.main === module) {
  const [, , opRaw, ...rest] = process.argv;

  if (!opRaw) {
    printUsage();
    process.exit(1);
  }

  const op = opRaw.toLowerCase();

  // Determine required operand count
  const unaryOps = new Set(['sqrt', '√']);
  const requiresTwo = !unaryOps.has(op);

  if (requiresTwo && rest.length < 2) {
    printUsage();
    process.exit(1);
  }
  if (!requiresTwo && rest.length < 1) {
    printUsage();
    process.exit(1);
  }

  const a = Number(rest[0]);
  const b = rest.length > 1 ? Number(rest[1]) : undefined;

  if (!Number.isFinite(a) || (requiresTwo && !Number.isFinite(b))) {
    console.error('Error: operands must be valid numbers');
    process.exit(1);
  }

  let result;

  try {
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
        result = divide(a, b);
        break;
      case 'modulo':
      case 'mod':
      case '%':
        result = modulo(a, b);
        break;
      case 'pow':
      case '^':
      case '**':
      case 'exp':
        result = pow(a, b);
        break;
      case 'sqrt':
      case '√':
        result = sqrt(a);
        break;
      default:
        console.error(`Error: unknown operation '${opRaw}'`);
        printUsage();
        process.exit(1);
    }
  } catch (err) {
    // Domain errors and division/modulo by zero
    console.error('Error:', err.message);
    if (/zero/i.test(err.message)) process.exit(2);
    if (/negative/i.test(err.message)) process.exit(3);
    process.exit(1);
  }

  // Print the numeric result to stdout
  console.log(result);
  process.exit(0);
}

// Export functions for tests
module.exports = { add, subtract, multiply, divide, modulo, pow, sqrt, power, squareRoot, printUsage };

