var shortestBeautifulSubstring = function(s, k) {
    let positions = [];

    // Store positions of all 1s
    for (let i = 0; i < s.length; i++) {
        if (s[i] === '1') {
            positions.push(i);
        }
    }

    // Not enough 1s
    if (positions.length < k) {
        return "";
    }

    let answer = "";

    // Check every group of k consecutive 1s
    for (let i = 0; i + k - 1 < positions.length; i++) {
        let start = positions[i];
        let end = positions[i + k - 1];

        let candidate = s.substring(start, end + 1);

        // Choose shortest
        if (answer === "" || candidate.length < answer.length) {
            answer = candidate;
        }
        // If same length, choose lexicographically smaller
        else if (
            candidate.length === answer.length &&
            candidate < answer
        ) {
            answer = candidate;
        }
    }

    return answer;
};