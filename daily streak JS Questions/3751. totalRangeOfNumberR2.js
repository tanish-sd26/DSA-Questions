/**
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var totalWaviness = function(num1, num2) {

    function getWaviness(num) {
        const s = num.toString();

        if (s.length < 3) {
            return 0;
        }

        let count = 0;

        for (let i = 1; i < s.length - 1; i++) {

            const prev = Number(s[i - 1]);
            const curr = Number(s[i]);
            const next = Number(s[i + 1]);

            const peak =
                curr > prev &&
                curr > next;

            const valley =
                curr < prev &&
                curr < next;

            if (peak || valley) {
                count++;
            }
        }

        return count;
    }

    let answer = 0;

    for (let num = num1; num <= num2; num++) {
        answer += getWaviness(num);
    }

    return answer;
};