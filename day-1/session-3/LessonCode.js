//Data types
//Strings
let myString = "Hello World!";
let anotherString = "hi5";
let numberString = "999";

console.log(typeof anotherString); 

//Numbers
let myNum = 5;
console.log(typeof myNum); 

//Booleans 
let myBool = false;
let notBool = true; 
console.log(typeof myBool); 

//Basic Operators 
let sum = 10 + 5;
let subtraction = 10 - 5;
let multiplication = 10 * 5; 
let division = 10 / 5; 
let remainder = 10 / 3;

let greeting = "Hello, " + "World!";
console.log(greeting);

let result = 10.1 + 10.3;
console.log(result);

let x = "Hello" + 10.1
console.log(x);
console.log(typeof x); 

//Conditionals 
let number = 10; 
if (number > 0) 
{ 
console.log("The number is positive."); 
} 
else if (number < 0) 
{ 
console.log("The number is negative."); 
} 
else 
{ 
console.log("The number is zero."); 
}

// Example of logical operators in JavaScript
let age = 25;
let hasDriverLicense = true;

// Using logical AND (&&)
if (age >= 18 && hasDriverLicense) {
    console.log("You are eligible to drive.");
} else {
    console.log("You are not eligible to drive.");
}

// Using logical OR (||)
let isStudent = false;
let isEmployed = true;

if (isStudent || isEmployed) {
    console.log("You are either a student or employed.");
} else {
    console.log("You are neither a student nor employed.");
}

// Using logical NOT (!)
let hasInsurance = false;

if (!hasInsurance) {
    console.log("You do not have insurance.");
} else {
    console.log("You have insurance.");
}
