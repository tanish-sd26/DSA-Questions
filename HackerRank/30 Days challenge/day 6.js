function processData(input) {
    const lines = input.trim().split('\n');
    const t = parseInt(lines[0]);

    for (let i = 1; i <= t; i++) {
        let even = "";
        let odd = "";

        for (let j = 0; j < lines[i].length; j++) {
            if (j % 2 === 0) {
                even += lines[i][j];
            } else {
                odd += lines[i][j];
            }
        }

        console.log(even + " " + odd);
    }
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
