/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var smallestPalindrome = function(s, k) {
    const freq = Array(26).fill(0);
    for (const ch of s) freq[ch.charCodeAt(0) - 97]++;

    let mid = "";
    const half = Array(26).fill(0);
    let total = 0;

    for (let i = 0; i < 26; i++) {
        if (freq[i] % 2 === 1) mid = String.fromCharCode(97 + i);
        half[i] = freq[i] >> 1;
        total += half[i];
    }

    // log factorials
    const logFact = Array(total + 1).fill(0);
    for (let i = 1; i <= total; i++) {
        logFact[i] = logFact[i - 1] + Math.log(i);
    }

    function countWays(cnt, len) {
        let logWays = logFact[len];
        for (const c of cnt) {
            logWays -= logFact[c];
        }

        // if definitely larger than 1e6
        if (logWays > Math.log(1e6)) return 1000001;

        return Math.round(Math.exp(logWays));
    }

    if (countWays(half, total) < k) return "";

    let left = "";

    for (let pos = 0; pos < total; pos++) {
        for (let ch = 0; ch < 26; ch++) {
            if (half[ch] === 0) continue;

            half[ch]--;

            const ways = countWays(half, total - pos - 1);

            if (k > ways) {
                k -= ways;
                half[ch]++;
            } else {
                left += String.fromCharCode(97 + ch);
                break;
            }
        }
    }

    const right = left.split("").reverse().join("");
    return left + mid + right;
};