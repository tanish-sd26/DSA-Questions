/**
 * @param {number[][]} edges
 * @param {number[][]} queries
 * @return {number[]}
 */
var assignEdgeWeights = function(edges, queries) {

    const MOD = 1000000007n;
    const n = edges.length + 1;

    const LOG = 17 + 1; // enough for 1e5

    const graph = Array.from(
        { length: n + 1 },
        () => []
    );

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    const depth = new Array(n + 1).fill(0);

    const up = Array.from(
        { length: n + 1 },
        () => Array(LOG).fill(0)
    );

    // BFS
    const queue = [1];
    let front = 0;

    const visited = new Array(n + 1).fill(false);
    visited[1] = true;

    while (front < queue.length) {

        const node = queue[front++];

        for (const nei of graph[node]) {

            if (!visited[nei]) {

                visited[nei] = true;

                depth[nei] = depth[node] + 1;

                up[nei][0] = node;

                queue.push(nei);
            }
        }
    }

    // Binary lifting table
    for (let j = 1; j < LOG; j++) {

        for (let node = 1; node <= n; node++) {

            const mid = up[node][j - 1];

            if (mid) {
                up[node][j] = up[mid][j - 1];
            }
        }
    }

    function lca(a, b) {

        if (depth[a] < depth[b]) {
            [a, b] = [b, a];
        }

        let diff = depth[a] - depth[b];

        for (let j = LOG - 1; j >= 0; j--) {

            if ((diff >> j) & 1) {
                a = up[a][j];
            }
        }

        if (a === b) {
            return a;
        }

        for (let j = LOG - 1; j >= 0; j--) {

            if (up[a][j] !== up[b][j]) {

                a = up[a][j];
                b = up[b][j];
            }
        }

        return up[a][0];
    }

    function modPow(exp) {

        let result = 1n;
        let base = 2n;
        let e = BigInt(exp);

        while (e > 0n) {

            if (e & 1n) {
                result = (result * base) % MOD;
            }

            base = (base * base) % MOD;
            e >>= 1n;
        }

        return Number(result);
    }

    const answer = [];

    for (const [u, v] of queries) {

        const ancestor = lca(u, v);

        const d =
            depth[u] +
            depth[v] -
            2 * depth[ancestor];

        if (d === 0) {
            answer.push(0);
        } else {
            answer.push(modPow(d - 1));
        }
    }

    return answer;
};