/**
 * @param {number} n
 * @param {number} k
 * @param {number[][]} invocations
 * @return {number[]}
 */
var remainingMethods = function(n, k, invocations) {
    const graph = Array.from({ length: n }, () => []);

    for (const [a, b] of invocations) {
        graph[a].push(b);
    }

    // Find all suspicious methods reachable from k
    const suspicious = Array(n).fill(false);
    const stack = [k];
    suspicious[k] = true;

    while (stack.length) {
        const u = stack.pop();

        for (const v of graph[u]) {
            if (!suspicious[v]) {
                suspicious[v] = true;
                stack.push(v);
            }
        }
    }

    // Check if any non-suspicious method invokes a suspicious method
    for (const [a, b] of invocations) {
        if (!suspicious[a] && suspicious[b]) {
            return Array.from({ length: n }, (_, i) => i);
        }
    }

    // Remove all suspicious methods
    const ans = [];

    for (let i = 0; i < n; i++) {
        if (!suspicious[i]) ans.push(i);
    }

    return ans;
};