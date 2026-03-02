let str1 = "T";
let str2 = "A";
let str3 = "N";
let str4 = "I";
let str5 = "S";
let str6 = "H";
let str7 = "A";

let result = str1 + str2 + str3 + str4 + str5 + str6 + str7;
console.log (result);

let f0 = 'x';
let f1 = 'y';
let f2 = f1+ " " + f0;
console.log(f2);
//fuctions with in functions
function createFunction() {
    function f(a, b) {
        const sum = a + b;
        return sum;
    }
    return f;
}
const f = createFunction();
console.log(f(3, 4)); // 7