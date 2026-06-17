/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var processStr = function(s, k) {

    let len = 0n;

    for (const ch of s) {

        if (ch >= 'a' && ch <= 'z') {
            len++;
        }
        else if (ch === '*') {
            if (len > 0n) len--;
        }
        else if (ch === '#') {
            len *= 2n;
        }
    }

    let K = BigInt(k);

    if (K >= len) {
        return '.';
    }

    for (let i = s.length - 1; i >= 0; i--) {

        const ch = s[i];

        if (ch >= 'a' && ch <= 'z') {

            if (K === len - 1n) {
                return ch;
            }

            len--;
        }

        else if (ch === '*') {

            len++;
        }

        else if (ch === '#') {

            const half = len / 2n;

            K %= half;

            len = half;
        }

        else if (ch === '%') {

            K = len - 1n - K;
        }
    }

    return '.';
};