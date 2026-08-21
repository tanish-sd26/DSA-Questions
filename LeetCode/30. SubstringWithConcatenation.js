/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function(s, words) {
    const wordLen = words[0].length;
    const wordCount = words.length;
    const totalLen = wordLen * wordCount;

    if (s.length < totalLen) return [];

    // Required frequency
    const need = new Map();

    for (const word of words) {
        need.set(word, (need.get(word) || 0) + 1);
    }

    const result = [];

    // Check every possible word alignment
    for (let offset = 0; offset < wordLen; offset++) {
        let left = offset;
        let count = 0;
        const window = new Map();

        for (let right = offset; right + wordLen <= s.length; right += wordLen) {
            const word = s.substring(right, right + wordLen);

            // Word does not exist in required words
            if (!need.has(word)) {
                window.clear();
                count = 0;
                left = right + wordLen;
                continue;
            }

            // Add current word
            window.set(word, (window.get(word) || 0) + 1);
            count++;

            // Too many occurrences of this word
            while (window.get(word) > need.get(word)) {
                const leftWord = s.substring(left, left + wordLen);

                window.set(leftWord, window.get(leftWord) - 1);
                count--;
                left += wordLen;
            }

            // Found exactly all words
            if (count === wordCount) {
                result.push(left);

                // Remove left word to continue searching
                const leftWord = s.substring(left, left + wordLen);
                window.set(leftWord, window.get(leftWord) - 1);
                count--;
                left += wordLen;
            }
        }
    }

    return result;
};