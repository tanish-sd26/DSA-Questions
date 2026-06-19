/**
 * @param {number[]} gain
 * @return {number}
 */
var largestAltitude = function(gain) {

    let current = 0;
    let maxAltitude = 0;

    for (const g of gain) {

        current += g;

        maxAltitude = Math.max(
            maxAltitude,
            current
        );
    }

    return maxAltitude;
};