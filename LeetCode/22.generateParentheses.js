var generateParenthesis = function(n) {
    let result = [];

    function backtrack(current, open, close) {
        // Base case
        if (current.length === 2 * n) {
            result.push(current);
            return;
        }

        // Add opening bracket
        if (open < n) {
            backtrack(current + "(", open + 1, close);
        }

        // Add closing bracket
        if (close < open) {
            backtrack(current + ")", open, close + 1);
        }
    }

    backtrack("", 0, 0);
    return result;
};
