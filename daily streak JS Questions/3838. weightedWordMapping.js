/**
 * @param {string[]} words
 * @param {number[]} weights
 * @return {string}
 */
var mapWordWeights = function(words, weights) {

    let answer = "";

    for (const word of words) {

        let totalWeight = 0;

        for (const ch of word) {

            const index =
                ch.charCodeAt(0) - 97;

            totalWeight += weights[index];
        }

        const remainder = totalWeight % 26;

        const mappedChar =
            String.fromCharCode(
                'z'.charCodeAt(0) - remainder
            );

        answer += mappedChar;
    }

    return answer;
};