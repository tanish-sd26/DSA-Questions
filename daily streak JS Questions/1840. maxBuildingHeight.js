/**
 * @param {number} n
 * @param {number[][]} restrictions
 * @return {number}
 */
var maxBuilding = function(n, restrictions) {

    restrictions.push([1, 0]);

    restrictions.sort((a, b) => a[0] - b[0]);

    if (restrictions[restrictions.length - 1][0] !== n) {
        restrictions.push([n, n - 1]);
    }

    const m = restrictions.length;

    // Forward pass
    for (let i = 1; i < m; i++) {

        const dist =
            restrictions[i][0] -
            restrictions[i - 1][0];

        restrictions[i][1] = Math.min(
            restrictions[i][1],
            restrictions[i - 1][1] + dist
        );
    }

    // Backward pass
    for (let i = m - 2; i >= 0; i--) {

        const dist =
            restrictions[i + 1][0] -
            restrictions[i][0];

        restrictions[i][1] = Math.min(
            restrictions[i][1],
            restrictions[i + 1][1] + dist
        );
    }

    let answer = 0;

    for (let i = 1; i < m; i++) {

        const id1 = restrictions[i - 1][0];
        const h1 = restrictions[i - 1][1];

        const id2 = restrictions[i][0];
        const h2 = restrictions[i][1];

        const dist = id2 - id1;

        const peak = Math.floor(
            (h1 + h2 + dist) / 2
        );

        answer = Math.max(answer, peak);
    }

    return answer;
};