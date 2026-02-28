let adjective = "beautiful" ;
let noun = "girl" ;
let verb = "dance" ;
let place = "paris" ;
let adjective2 = "big" ;
let noun2 = "cake" ; 

const firstStory = "Once upon a time, there was a(n) " + adjective + " " + noun + " who loved to eat " + noun2 + "." + " The " + noun +" lived in a " + place + " and had " + adjective2 + " nostrils that blew fire when it was " + verb + ".";
console.log("First story: " +firstStory);

adjective = "dangerous" ;
noun = "dragon" ;
verb = "fly" ;
place = "china" ;
adjective2 = "biggest" ;
noun2 = "meat" ;

const secondStory = "Once upon a time, there was a " + adjective + " " +noun + " who loved to eat " +noun2 + "." + " The " + noun +" lived in a " + place + " and had " + adjective2 + " nostrils that blew fire when it was " + verb+ ".";
console.log("Second Story:" +secondStory);

let a = "tanisha";
console.log(typeof a);
let b ;
console.log(typeof b);

let string1 = "hann";
let string2 = "ji";
console.log(string1 + "  " + string2);

// bracket notation
let name ="tanuj";
console.log(name[3]);
//length property
console.log(name[name.length-1]);

//multiple notation
let firstTwo = name[2] + name[4];
console.log(firstTwo);

//escape character and \n for new lines 
let myLife = 'Hi, I am a software developer.\n I love depveloping my ideas though a projects when not even any one watch but i still work on it. cause it\'s my passion.';
console.log(myLife); 

//template literals
const age = "19";
const name1 = "tanisha";
const greeting = `my name is ${name1} andmy age is ${age}!`;

console.log(greeting);

//indexof method
let position = myLife.indexOf("love");
console.log(position);