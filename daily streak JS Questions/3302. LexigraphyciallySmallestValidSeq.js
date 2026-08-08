/**
 * @param {string} word1
 * @param {string} word2
 * @return {number[]}
 */
var validSequence = function(word1, word2) {
    const n = word1.length, m = word2.length;

    // arr[i] = starting index of the suffix of word2 that CAN be matched
    // exactly (0 changes) as a subsequence using word1[i..n-1].
    // arr[n] = m means "nothing matched yet" when no word1 chars remain.
    const arr = new Array(n + 1);
    arr[n] = m;
    for (let i = n - 1; i >= 0; i--) {
        arr[i] = arr[i + 1];
        if (arr[i] > 0 && word1[i] === word2[arr[i] - 1]) {
            arr[i]--;
        }
    }

    const result = new Array(m).fill(-1);
    let i = 0, j = 0, changed = false;

    while (i < n && j < m) {
        if (word1[i] === word2[j]) {
            // Exact match — always take it, it's the smallest valid index for j.
            result[j] = i;
            i++;
            j++;
        } else if (!changed && arr[i + 1] <= j + 1) {
        
            // word2 can still be matched exactly using word1[i+1:].
            result[j] = i;
            changed = true;
            i++;
            j++;
        } else {
            // Skip this character of word1, hope for an exact match later.
            i++;
        }
    }

    // If we managed to place all m indices, it's valid.
    return j === m ? result : [];
};