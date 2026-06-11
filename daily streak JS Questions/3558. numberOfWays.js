/**
 * @param {number[][]} edges
 * @return {number}
 */
var assignEdgeWeights = function(edges) {

    const MOD = 1000000007n;
    const n = edges.length + 1;

    const graph = Array.from(
        { length: n + 1 },
        () => []
    );

    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    let maxDepth = 0;

    const queue = [[1, 0]];
    const visited = new Array(n + 1).fill(false);

    visited[1] = true;

    while (queue.length) {

        const [node, depth] = queue.shift();

        maxDepth = Math.max(maxDepth, depth);

        for (const nei of graph[node]) {

            if (!visited[nei]) {

                visited[nei] = true;

                queue.push([
                    nei,
                    depth + 1
                ]);
            }
        }
    }

    function modPow(base, exp) {

        let result = 1n;
        let b = BigInt(base);
        let e = BigInt(exp);

        while (e > 0n) {

            if (e & 1n) {
                result =
                    (result * b) % MOD;
            }

            b = (b * b) % MOD;
            e >>= 1n;
        }

        return result;
    }

    return Number(
        modPow(2, maxDepth - 1)
    );
};