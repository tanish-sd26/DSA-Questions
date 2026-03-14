var getHappyString = function(n, k) {
    let result = [];

    function backtrack(curr) {
        if (curr.length === n) {
            result.push(curr);
            return;
        }

        for (let ch of ['a','b','c']) {
            if (curr.length === 0 || curr[curr.length - 1] !== ch) {
                backtrack(curr + ch);
            }
        }
    }

    backtrack("");

    return result[k - 1] || "";
};