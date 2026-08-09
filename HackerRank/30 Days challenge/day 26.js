function processData(input) {
    const lines = input.split('\n');

    const returnedParts = lines[0].trim().split(' ').map(Number);
    const dueParts = lines[1].trim().split(' ').map(Number);

    const rDay = returnedParts[0];
    const rMonth = returnedParts[1];
    const rYear = returnedParts[2];

    const dDay = dueParts[0];
    const dMonth = dueParts[1];
    const dYear = dueParts[2];

    let fine = 0;

    if (rYear > dYear) {
        // Case 4: Return year 
        fine = 10000;
    } else if (rYear === dYear) {
        if (rMonth > dMonth) {
            // Case 3: Same year, but month late
            fine = 500 * (rMonth - dMonth);
        } else if (rMonth === dMonth) {
            if (rDay > dDay) {
                // Case 2: Same month & year, but day late
                fine = 15 * (rDay - dDay);
            } else {
                // Case 1: On time
                fine = 0;
            }
        } else {
            // rMonth < dMonth 
            fine = 0;
        }
    } else {
        // rYear < dYear
        fine = 0;
    }

    console.log(fine);
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
