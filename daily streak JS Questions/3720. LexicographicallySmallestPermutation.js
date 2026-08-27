var lexGreaterPermutation = function(s, target) {
    let n = s.length;

    let count = new Array(26).fill(0);

    for (let ch of s) {
        count[ch.charCodeAt(0) - 97]++;
    }

    // Try to make the answer greater at position i.
    // We go from right to left because the prefix before i
    // has to remain exactly equal to target.
    for (let i = n - 1; i >= 0; i--) {

        // Rebuild frequency array
        let freq = count.slice();

        // Check whether target[0...i-1] can be formed
        let possible = true;

        for (let j = 0; j < i; j++) {
            let c = target.charCodeAt(j) - 97;

            if (freq[c] === 0) {
                possible = false;
                break;
            }

            freq[c]--;
        }

        if (!possible) {
            continue;
        }

        // At position i, we need the smallest character
        // that is strictly greater than target[i].
        let targetChar = target.charCodeAt(i) - 97;

        for (let c = targetChar + 1; c < 26; c++) {

            if (freq[c] > 0) {
                let answer = target.slice(0, i);

                answer += String.fromCharCode(c + 97);

                freq[c]--;

                // Put remaining characters in smallest order
                for (let x = 0; x < 26; x++) {
                    while (freq[x] > 0) {
                        answer += String.fromCharCode(x + 97);
                        freq[x]--;
                    }
                }

                return answer;
            }
        }
    }

    return "";
};