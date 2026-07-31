/**
 * @param {string} word
 * @return {number}
 */
var minimumPushes = function(word) {
    const freq = Array(26).fill(0);

    // Count frequency of each character
    for (const ch of word) {
        freq[ch.charCodeAt(0) - 97]++;
    }

    // Sort frequencies in descending order
    freq.sort((a, b) => b - a);

    let ans = 0;

    for (let i = 0; i < 26; i++) {
        if (freq[i] === 0) break;

        const cost = Math.floor(i / 8) + 1;
        ans += freq[i] * cost;
    }

    return ans;
};