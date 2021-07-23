

// select elements
const input_element = document.querySelector('.input');
const output_operation_element = document.querySelector('.operation .value');
const output_result_element = document.querySelector('.result .value');

// some variables
const OPERATORS = ["+", "-", "*", "/"];
const POWER = "POWER(", FACTORIAL = "FACTORIAL";
let data = {
    operation: [],
    formula: []
}
let ans = 0;

// CALCULATOR BUTTONS
let calculator_buttons = [
    {
        name: "rad",
        symbol: "Rad",
        formula: false,
        type: "key"
    },
    {
        name: "deg",
        symbol: "Deg",
        formula: false,
        type: "key"
    },
    {
        name: "square-root",
        symbol: "√",
        formula: "Math.sqrt",
        type: "math_function"
    },
    {
        name: "square",
        symbol: "x²",
        formula: POWER,
        type: "math_function"
    },
    {
        name: "open-parenthesis",
        symbol: "(",
        formula: "(",
        type: "number"
    },
    {
        name: "close-parenthesis",
        symbol: ")",
        formula: ")",
        type: "number"
    },
    {
        name: "clear",
        symbol: "C",
        formula: false,
        type: "key"
    },
    {
        name: "delete",
        symbol: "⌫",
        formula: false,
        type: "key"
    },
    {
        name: "pi",
        symbol: "π",
        formula: "Math.PI",
        type: "number"
    },
    {
        name: "cos",
        symbol: "cos",
        formula: "trigo(Math.cos,",
        type: "trigo_function"
    }, {
        name: "sin",
        symbol: "sin",
        formula: "trigo(Math.sin,",
        type: "trigo_function"
    }, {
        name: "tan",
        symbol: "tan",
        formula: "trigo(Math.tan,",
        type: "trigo_function"
    }, {
        name: "7",
        symbol: 7,
        formula: 7,
        type: "number"
    }, {
        name: "8",
        symbol: 8,
        formula: 8,
        type: "number"
    }, {
        name: "9",
        symbol: 9,
        formula: 9,
        type: "number"
    },
    {
        name: "division",
        symbol: "÷",
        formula: "/",
        type: "operator"
    },
    {
        name: "e",
        symbol: "e",
        formula: "Math.E",
        type: "number"
    },
    {
        name: "acos",
        symbol: "cos<sup>-1</sup>",
        formula: "inv_trigo(Math.acos,",
        type: "trigo_function"
    }, {
        name: "asin",
        symbol: "sin<sup>-1</sup>",
        formula: "inv_trigo(Math.asin,",
        type: "trigo_function"
    }, {
        name: "atan",
        symbol: "tan<sup>-1</sup>",
        formula: "inv_trigo(Math.atan,",
        type: "trigo_function"
    },
    {
        name: "4",
        symbol: 4,
        formula: 4,
        type: "number"
    }, {
        name: "5",
        symbol: 5,
        formula: 5,
        type: "number"
    }, {
        name: "6",
        symbol: 6,
        formula: 6,
        type: "number"
    }, {
        name: "multiplication",
        symbol: "×",
        formula: "*",
        type: "operator"
    }, {
        name: "factorial",
        symbol: "x!",
        formula: FACTORIAL,
        type: "math_function"
    }, {
        name: "exp",
        symbol: "exp",
        formula: "Math.exp",
        type: "math_function"
    }, {
        name: "ln",
        symbol: "ln",
        formula: "Math.log",
        type: "math_function"
    }, {
        name: "log",
        symbol: "log",
        formula: "Math.log10",
        type: "math_function"
    }, {
        name: "1",
        symbol: 1,
        formula: 1,
        type: "number"
    }, {
        name: "2",
        symbol: 2,
        formula: 2,
        type: "number"
    }, {
        name: "3",
        symbol: 3,
        formula: 3,
        type: "number"
    }, {
        name: "subtraction",
        symbol: "‒",
        formula: "-",
        type: "operator"
    }, {
        name: "power",
        symbol: "x<span>y</span>",
        formula: POWER,
        type: "math_function"
    }, {
        name: "ANS",
        symbol: "ANS",
        formula: "ans",
        type: "number"
    }, {
        name: "percent",
        symbol: "%",
        formula: "/100",
        type: "number"
    }, {
        name: "comma",
        symbol: ".",
        formula: ".",
        type: "number"
    }, {
        name: "0",
        symbol: 0,
        formula: 0,
        type: "number"
    }, {
        name: "calculate",
        symbol: "=",
        formula: "=",
        type: "calculate"
    }, {
        name: "addition",
        symbol: "+",
        formula: "+",
        type: "operator"
    }
];

// create calculator buttons
function createCalculatorButtons() {
    const bnts_per_row = 8;
    let added_btns = 0;

    calculator_buttons.forEach(button => {
        if (added_btns % bnts_per_row == 0) {
            input_element.innerHTML += `<div class="row"></div>`;
        }

        const row = document.querySelector(".row:last-child");
        row.innerHTML += `<button id="${button.name}"> ${button.symbol}</button>`;

        added_btns++;
    })
}
createCalculatorButtons();

// rad and deg
let RADIAN = false;

const rad_btn = document.getElementById("rad");
const deg_btn = document.getElementById("deg");

deg_btn.classList.add("active-angle");

function angleToggler() {
    rad_btn.classList.toggle("active-angle");
    deg_btn.classList.toggle("active-angle");
}



// click event listener
input_element.addEventListener('click', event => {
    const target_btn = event.target;

    calculator_buttons.forEach(button => {
        if (button.name == target_btn.id) calculator(button);
    })
})

// calculator
function calculator(button) {
    if (button.type == "operator") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }
    else if (button.type == "number") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
    }
    else if (button.type == "trigo_function") {
        data.operation.push(button.symbol + "(");
        data.formula.push(button.formula);
    }
    else if (button.type == "math_function") {
        let symbol, formula;

        if (button.name == "factorial") {
            symbol = "!";
            formula = button.formula;

            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name == "power") {
            symbol = "^(";
            formula = button.formula;

            data.operation.push(symbol);
            data.formula.push(formula);
        } else if (button.name == "square") {
            symbol = "^(";
            formula = button.formula;

            data.operation.push(symbol);
            data.formula.push(formula);

            data.operation.push("2)");
            data.formula.push("2)");
        } else {
            symbol = button.symbol + "(";
            formula = button.formula + "(";
            data.operation.push(symbol);
            data.formula.push(formula);
        }
    }
    else if (button.type == "key") {
        if (button.name == "clear") {
            data.operation = [];
            data.formula = [];

            updateOutputResult(0);

        } else if (button.name == "delete") {
            data.operation.pop();
            data.formula.pop();
        } else if (button.name == "rad") {
            if (RADIAN == false) {
                angleToggler();
            }
            RADIAN = true;

        } else if (button.name == "deg") {
            if (RADIAN == true) {
                angleToggler();
            }
            RADIAN = false;

        }
    }
    else if (button.type == "calculate") {
        formula_str = data.formula.join('');

        // fix power and factorial issue
        // search for factorial and power functions
        let POWER_SEARCH_RESULT = search(data.formula, POWER);
        let FACTORIAL_SEARCH_RESULT = search(data.formula, FACTORIAL);

        // get power base and replace with the right formula
        const BASES = powerBaseGetter(data.formula, POWER_SEARCH_RESULT);
        BASES.forEach(base => {
            let toReplace = base + POWER;
            let replacement = "Math.pow(" + base + ",";

            formula_str = formula_str.replace(toReplace, replacement);
        })

        // get factorial number and replace with the right formula
        const NUMBERS = factorialNumberGetter(data.formula, FACTORIAL_SEARCH_RESULT);
        NUMBERS.forEach(factorial => {
            formula_str = formula_str.replace(factorial.toReplace, factorial.replacement);
        })


        // calculate
        let result;
        try {
            result = eval(formula_str);
        } catch (error) {
            if (error instanceof SyntaxError) {
                result = "Syntax Error!";
                updateOutputResult(result);
                return;
            }
        }

        // save result for later use
        ans = result;
        data.operation = [result];
        data.formula = [result];

        updateOutputResult(result);
        return;
    }

    updateOutputOperation(data.operation.join(''));
}

// factorial number getter
function factorialNumberGetter(formula, FACTORIAL_SEARCH_RESULT) {
    let numbrs = []; // save all numbrs in the same array
    let factorial_sequence = 0;

    FACTORIAL_SEARCH_RESULT.forEach(factorial_index => {
        let number = []; // current factorial number

        let next_index = factorial_index + 1;
        let next_input = formula[next_index];

        if (next_input == FACTORIAL) {
            factorial_sequence += 1;
            return;
        }
        // if there was a factorial sequence, we need to get
        // the index of the vvery first factorial function
        let first_factorial_index = factorial_index - factorial_sequence;

        // then to get the number right before it
        let previous_index = first_factorial_index - 1;
        let parenthesis_count = 0;

        while (previous_index >= 0) {
            if (formula[previous_index] == "(") { parenthesis_count--; }
            if (formula[previous_index] == ")") { parenthesis_count++; }

            let is_operator = false;
            OPERATORS.forEach(OPERATOR => {
                if (formula[previous_index] == OPERATOR) is_operator = true;
            })

            if (is_operator && parenthesis_count == 0) { break; }

            number.unshift(formula[previous_index]);
            previous_index--;
        }

        let number_str = number.join('');
        const factorial = "factorial(", close_parenthesis = ")";
        let times = factorial_sequence + 1;

        let toReplace = number_str + FACTORIAL.repeat(times);
        let replacement = factorial.repeat(times) + number_str + close_parenthesis.repeat(times);

        numbrs.push({
            toReplace: toReplace,
            replacement: replacement
        })

        // reset factorial_sequence
        factorial_sequence = 0;
    })
    return numbrs;
}


// power base getter
function powerBaseGetter(formula, POWER_SEARCH_RESULT) {
    let powers_bases = []; // save all bases in the same array

    POWER_SEARCH_RESULT.forEach(power_index => {
        let base = []; // current base
        let parenthesis_count = 0;
        let previous_index = power_index - 1;

        while (previous_index >= 0) {
            if (formula[previous_index] == "(") parenthesis_count--;
            if (formula[previous_index] == ")") parenthesis_count++;

            let is_operator = false;
            OPERATORS.forEach(OPERATOR => {
                if (formula[previous_index] == OPERATOR) is_operator = true;
            })

            let is_power = formula[previous_index] == POWER;

            if ((is_operator && parenthesis_count == 0) || is_power) break;

            base.unshift(formula[previous_index]);
            previous_index--;
        }

        powers_bases.push(base.join(''));
    })
    return powers_bases;
}


// search an array
function search(array, keyword) {
    let search_result = [];

    array.forEach((element, index) => {
        if (element == keyword) search_result.push(index);
    })
    return search_result;
}

// update output
function updateOutputOperation(operation) {
    output_operation_element.innerHTML = operation;
}
function updateOutputResult(result) {
    output_result_element.innerHTML = result;
}




// factorial function
function factorial(number) {
    if (number % 1 != 0) return gamma(number + 1);
    if (number === 0 || number === 1) return 1;

    let result = 1;
    for (let i = 1; i <= number; i++) {
        result *= i;
        if (result === Infinity) return Infinity;
    }
    return result;
}


// GAMMA FUNCTINON
function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants 
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (n < 0.5) {
        return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
        n--;
        var x = p[0];
        for (var i = 1; i < g + 2; i++) {
            x += p[i] / (n + i);
        }
        var t = n + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}

// trigonometric function
function trigo(callback, angle) {
    if (!RADIAN) {
        angle = angle * (Math.PI) / 180;
    }
    let result;
    if (angle % (Math.PI / 2) == 0) {
        result = Math.round(callback(angle));
    } else {
        result = callback(angle);
    }
    return result;
}
function inv_trigo(callback, value) {
    let angle = callback(value);

    if (!RADIAN) {
        angle = angle * 180 / Math.PI;
    }
    return angle;
}