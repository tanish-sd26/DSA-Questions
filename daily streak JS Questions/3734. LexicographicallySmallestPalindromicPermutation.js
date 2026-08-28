var lexPalindromicPermutation = function (s, target) {
    const n = s.length;
    const halfLen = Math.floor(n / 2);

    // Count characters in s
    const count = new Array(26).fill(0);

    for (const ch of s) {
        count[ch.charCodeAt(0) - 97]++;
    }

    // Check whether a palindrome is possible
    let middle = "";

    for (let i = 0; i < 26; i++) {
        if (count[i] % 2 === 1) {
            if (middle !== "") {
                return "";
            }

            middle = String.fromCharCode(97 + i);
        }
    }

    // Characters available for the left half
    const halfCount = new Array(26).fill(0);

    for (let i = 0; i < 26; i++) {
        halfCount[i] = Math.floor(count[i] / 2);
    }

    // Build palindrome from left half
    function makePalindrome(left) {
        const right = left.split("").reverse().join("");
        return left + middle + right;
    }

    // ----------------------------------------
    // Case 1: Try target's first half exactly
    // ----------------------------------------

    const targetLeft = target.slice(0, halfLen);

    const tempCount = halfCount.slice();
    let possible = true;

    for (const ch of targetLeft) {
        const idx = ch.charCodeAt(0) - 97;

        if (tempCount[idx] === 0) {
            possible = false;
            break;
        }

        tempCount[idx]--;
    }

    if (possible) {
        const candidate = makePalindrome(targetLeft);

        // Strictly greater, NOT >=
        if (candidate > target) {
            return candidate;
        }
    }

    // ------------------------------------------------
    // Case 2: Find smallest left half > targetLeft
    // ------------------------------------------------

    /*
        We try to make the first difference as far right
        as possible.

        Example:

        targetLeft = "ba"
        available = "ab"

        "ab" < "ba"

        We go from right to left and try to increase
        one position:

        position 1:
            target = 'a'
            available greater char = 'b'

        => "ba"
    */

    const prefixUsed = new Array(26).fill(0);

    // We will try changing position i
    for (let i = halfLen - 1; i >= 0; i--) {

        // Remove targetLeft[i - 1] from prefix when moving?
        // Easier: recompute prefix counts for this i.
        const used = new Array(26).fill(0);

        let validPrefix = true;

        for (let j = 0; j < i; j++) {
            const idx = targetLeft.charCodeAt(j) - 97;

            used[idx]++;

            if (used[idx] > halfCount[idx]) {
                validPrefix = false;
                break;
            }
        }

        if (!validPrefix) {
            continue;
        }

        // Remaining characters after fixing prefix
        const remaining = halfCount.slice();

        for (let c = 0; c < 26; c++) {
            remaining[c] -= used[c];
        }

        // Find smallest character strictly greater
        // than targetLeft[i]
        const current = targetLeft.charCodeAt(i) - 97;

        for (let c = current + 1; c < 26; c++) {
            if (remaining[c] === 0) {
                continue;
            }

            // We found the smallest possible greater character
            remaining[c]--;

            let left = targetLeft.slice(0, i);
            left += String.fromCharCode(97 + c);

            // Fill the remaining positions with smallest chars
            for (let x = 0; x < 26; x++) {
                while (remaining[x] > 0) {
                    left += String.fromCharCode(97 + x);
                    remaining[x]--;
                }
            }

            return makePalindrome(left);
        }
    }

    // No valid palindrome greater than target
    return "";
};