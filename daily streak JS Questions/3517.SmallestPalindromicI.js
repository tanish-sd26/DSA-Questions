/**
 * @param {string} s
 * @return {string}
 */
var smallestPalindrome = function(s) {
    const freq = Array(26).fill(0);

    // Count frequencies
    for (const ch of s) {
        freq[ch.charCodeAt(0) - 97]++;
    }

    let left = [];
    let middle = "";

    // Build the left half in lexicographical order
    for (let i = 0; i < 26; i++) {
        const count = freq[i];
        const ch = String.fromCharCode(97 + i);

        left.push(ch.repeat(Math.floor(count / 2)));

        if (count % 2 === 1) {
            middle = ch;
        }
    }

    left = left.join("");
    const right = left.split("").reverse().join("");

    return left + middle + right;
};