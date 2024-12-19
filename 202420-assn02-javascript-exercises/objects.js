/////////////////////////////////////////////////////////
// JavaScript Exercises
/////////////////////////////////////////////////////////

console.log("Script has arrived");

/////////////////////////////////////////////////////////
// Objects, Dictionaries, and Associative Arrays
//
// (They're all the same thing)
//
// Write code according to the comments below.
//
/////////////////////////////////////////////////////////

console.log("-------------- Objects, Dictionaries, and Associative Arrays ---------------")

// create an array of three objects where each object has made up values for
//  name, age, and favorite_color
let apples =[
    {name: "pickle", age: 25, favorite_color: "blue"},
    {name: "rick", age: 30, favorite_color: "green"},
    {name: "bob", age: 22, favorite_color: "pink"},
]
console.log(apples.age);
// change the age of the third object to 27 using associative array syntax
apples[2].age = 27;

// using a for...of loop and object . notation, print the favorite colors
for (let apple of apples) {
    console.log(apple.favorite_color);
}

// using a for...in loop, print the property names in the first object in the array
// (i.e. name, age, favorite_color)
for (let property in apples[0]) {
    console.log(property);
}

// using Object.keys, print the array of keys in the second object (no loop, the whole thing)
console.log(Object.keys(apples[1]));

// using Object.values, print the array of values in the second object  (no loop, the whole thing)
console.log(Object.values(apples[1]));

console.log("-------------- Destructuring Bind and Spread Syntax ---------------")

// write a function that returns an array of three numbers
function returnThreeNumbers() {
    return [1, 2, 3];
}

// call that function and use destructuring syntax to assign the numbers to three separate variables
let [num1, num2, num3] = returnThreeNumbers();
console.log(num1, num2, num3);

// write a function that returns an object
function returnObject() {
    return { name: "tree", age: 19, favoriteColor: "blue" };
}

// call that function and use destructuring syntax to assign the property values to separate variables
let { name, age, favoriteColor } = returnObject();
console.log(name, age, favoriteColor);

// write a function that takes two named parameters using destructuring syntax
function printPerson({ name, age }) {
    console.log(`Name: ${name}, Age: ${age}`);
}

// call that function by passing in an object
printPerson({ name: "lee", age: 7 });

// using Object.entries and a for...of loop that destructures the [key, value] pair,
//  print the second object like:
// name: bob
// age: 32
// favorite_color: mauve
let person = { name: "bob", age: 32, favorite_color: "mauve" };

for (let [key, value] of Object.entries(person)) {
    console.log(`${key}: ${value}`);
}

// using spread syntax, copy your object array and add a fourth object
let ocean = [
    {name: "water", age: 0, favorite_color: "blue"},
    {name: "sea", age: 1, favorite_color: "white"},
    {name: "coral", age: 22, favorite_color: "red"},
];

let newApples = [...ocean, {name: "Dave", age: 40, favorite_color: "yellow"}];


// using spread syntax, make a copy of the third object in the array but with the name changed to 'batbatbat'
let modifiedObject = { ...apples[2], name: 'batbatbat' };
console.log(modifiedObject);

// write a function that uses spread syntax ("rest") to take a variable number of numbers and return the sum
function sumNumbers(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sumNumbers(1, 2, 3, 4));

console.log("this script is done")
