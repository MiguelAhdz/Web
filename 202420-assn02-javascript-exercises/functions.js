/////////////////////////////////////////////////////////
// JavaScript Exercises
/////////////////////////////////////////////////////////

console.log("Script has arrived");

/////////////////////////////////////////////////////////
// Functions and Scope
//
// JavaScript code relies heavily on first-class functions
// that are passed around and called in reponse to
// different events. The newer => syntax helps facilitate
// this.
//
// Write code according to the comments below.
//
/////////////////////////////////////////////////////////

console.log("-------------- First-Class Functions ---------------")

function shout(msg) {
    console.log("sss", msg);
}

shout("cough, cough");

let response = shout;

response("stop");

let pack = {
    nam: "tpdo ",
    action: response,

}
pack. action()

// write a normal named function definition that takes two numbers and returns the sum
function sum(a, b) {
    return a + b;
}

// declare a variable and assign it that function
let sumFunction = sum;

// call the function through the variable and print the result
console.log("sum:", sumFunction(5, 3));

// write an anonymous version of the same function using the "function" syntax
// call it and print the result
let anonymousSum = function(a, b) {
    return a + b;
};
console.log("anonymous sum:", anonymousSum(5, 3));

// write a => version of the same function (still using {} and return)
// call it and print the result
let arrowSum = (a, b) => {
    return a + b;
};
console.log("arrow sum:", arrowSum(5, 3));

// write a => version of the same function (with an expression body instead)
// call it and print the result
let simpleArrowSum = (a, b) => a + b;
console.log("arrow expression body:", simpleArrowSum(5, 3));


// write a => function that takes a string and return another => function that prints that string
// the internal function should *not* take the string as a parameter, since the variable is
//  already in scope
// call the initial function to get the callback, then call that to print the string
let createPrinter = (str) => () => console.log(str);
let printString = createPrinter("pumpkin noodles");
printString();

// write and call a => function that takes a string and uses setTimeout to print that
//  string 1000ms later
let delayedPrint = (str) => {
    setTimeout(() => console.log(str), 1000);
};
delayedPrint("print after 1000ms");



console.log("this script is done")
