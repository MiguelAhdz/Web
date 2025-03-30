/////////////////////////////////////////////////////////
// JavaScript Exercises
/////////////////////////////////////////////////////////

console.log("I...am...JAVASCRIPT!");

/////////////////////////////////////////////////////////
// CS 1 in a dozen(ish) questions
//
// These exercises assume you are familiar with a c-style
// language like C++, Java, or C# and introduce JavaScript
// by contrast to those languages.
//
// Write code according to the comments below. If anything
// causes an error on purpose, comment your code out once
// you see the error.
//
/////////////////////////////////////////////////////////

console.log("-------------- Data and Variables ---------------")

// declare two constants and assign them floating point values
const food = 20.12;
const animal = 11.6;

// declare two variables and assign them floating point values
let tree = 12.32;
let ocean = 5.92;

// calculate the average of those values and output to the console using a *template literal*
//  (the `` notation)
// for example, "The average is 3.4"

console.log((food + animal + tree + ocean)/ 4);


console.log("-------------- Control Structures ---------------")

// write if statements to print out whether each of the following values is "false-y" (evaluates to false)
//  positive number, negative number, zero
//  empty string "", blank string "  "
//  null, NaN, Infinity, undefined
//  an undefined variable
let someUndefinedVariable;
let values = [1, -1, 0, "", "  ", null, NaN, Infinity, undefined, someUndefinedVariable];
values.forEach(value => {
    if (!value) {
        console.log(`The value ${value} is false-y`);
    } else {
        console.log(`The value ${value} is truthy`);
    }
});

// write a for loop that prints the numbers from 0 to 10
for (let i = 0; i <= 10; i++) {
    console.log(i);
}

// write a while loop that counts down from 20 to 0 by threes
let j = 20;
while (j >= 0) {
    console.log(j);
    j -= 3;
}

console.log("-------------- Functions ---------------")

// write a function that takes two parameters and returns their sum
function sum(a, b) {
    return a + b;
}

// call it with one argument and print the result
console.log("one argument:", sum(5));
// call it with two arguments and print the result
console.log("two arguments:", sum(5, 10));
// call it with three arguments and print the result
console.log("three arguments:", sum(5, 10, 15));

console.log("-------------- Arrays ---------------")

// declare an array of 5 integer values ranging from -10 to 10
let array = [-7,-3,0,2,5];

// change the third value in the array to -17 and print the array
array[2]= -17;
console.log(array);

// write a for...in loop over the array and print each value (each value that is "bound" to the specified variable)
for (let i = 0; i < array.length ; i++) {
    console.log(array[i] + " ");
}

// write a for...of loop over the array and print each value
for (let item of array) {
    console.log(item);
}

// use the array.sort method to sort the array and print it

array.sort((a, b) => a - b);
for (let item of array) {
    console.log(item);
}

// use the array.join method to create a comma-separated string from the array and print it
let joinedString = array.join(", ");
console.log(joinedString);

console.log("This script is done.")
