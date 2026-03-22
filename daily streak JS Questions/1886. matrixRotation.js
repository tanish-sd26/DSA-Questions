// Check if matrix can match target by rotating in 90-degree steps
var findRotation = function(mat, target) {

    let n = mat.length;

    // rotate matrix 90° clockwise
    const rotate = (matrix) => {

        // transpose
        for (let i = 0; i < n; i++) {
            for (let j = i; j < n; j++) {
                [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
            }
        }

        // reverse each row
        for (let i = 0; i < n; i++) {
            matrix[i].reverse();
        }
    };

    // check if two matrices are equal
    const isEqual = (a, b) => {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (a[i][j] !== b[i][j]) return false;
            }
        }
        return true;
    };

    // try all 4 rotations
    for (let k = 0; k < 4; k++) {
        if (isEqual(mat, target)) return true;
        rotate(mat);
    }

    return false;
};