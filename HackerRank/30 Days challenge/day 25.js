function processData(input) {
       const lines = input.split('\n');
    const t = parseInt(lines[0], 10);
    const results = [];

    for (let i = 1; i <= t; i++) {
        const n = parseInt(lines[i], 10);
        results.push(isPrime(n) ? "Prime" : "Not prime");
    }

    console.log(results.join('\n'));
}

function isPrime(n) {
    if (n <= 1) {
        return false;
    }
    if (n === 2) {
        return true;
    }
    if (n % 2 === 0) {
        return false;
    }

    const sqrtN = Math.sqrt(n);
    for (let i = 3; i <= sqrtN; i += 2) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}
 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
