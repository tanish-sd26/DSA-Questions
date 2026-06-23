/**
 * @param {string} text
 * @return {number}
 */
var maxNumberOfBalloons = function(text) {

    const freq = new Array(26).fill(0);

    for (const ch of text) {
        freq[ch.charCodeAt(0) - 97]++;
    }

    return Math.min(
        freq['b'.charCodeAt(0) - 97],
        freq['a'.charCodeAt(0) - 97],
        Math.floor(freq['l'.charCodeAt(0) - 97] / 2),
        Math.floor(freq['o'.charCodeAt(0) - 97] / 2),
        freq['n'.charCodeAt(0) - 97]
    );
};