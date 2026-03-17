// Largest submatrix of 1s after optimal column rearrangement
var largestSubmatrix = function(matrix) {

    let m = matrix.length;
    let n = matrix[0].length;

    // build heights (consecutive 1s column-wise)
    for (let i = 1; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] !== 0) {
                matrix[i][j] += matrix[i - 1][j];
            }
        }
    }

    let maxArea = 0;

    for (let i = 0; i < m; i++) {

        // sort row in descending order to simulate column rearrangement
        let row = [...matrix[i]].sort((a, b) => b - a);

        for (let j = 0; j < n; j++) {

            // width = j + 1, height = row[j]
            let area = row[j] * (j + 1);
            maxArea = Math.max(maxArea, area);
        }
    }

    return maxArea;
};