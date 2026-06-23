/**
 * @param {number} n
 * @param {number} l
 * @param {number} r
 * @return {number}
 */
var zigZagArrays = function(n, l, r) {
    const MOD = 1000000007;
    const m = r - l + 1;

    let up = new Array(m + 1).fill(0);
    let down = new Array(m + 1).fill(0);

    // length = 2
    for (let v = 1; v <= m; v++) {
        up[v] = v - 1;
        down[v] = m - v;
    }

    if (n === 2) {
        let ans = 0;
        for (let v = 1; v <= m; v++) {
            ans = (ans + up[v] + down[v]) % MOD;
        }
        return ans;
    }

    for (let len = 3; len <= n; len++) {

        let prefUp = new Array(m + 1).fill(0);
        let prefDown = new Array(m + 1).fill(0);

        for (let i = 1; i <= m; i++) {
            prefUp[i] = (prefUp[i - 1] + up[i]) % MOD;
            prefDown[i] = (prefDown[i - 1] + down[i]) % MOD;
        }

        let newUp = new Array(m + 1).fill(0);
        let newDown = new Array(m + 1).fill(0);

        for (let v = 1; v <= m; v++) {

            // sum of down[u] for u < v
            newUp[v] = prefDown[v - 1];

            // sum of up[u] for u > v
            newDown[v] =
                (prefUp[m] - prefUp[v] + MOD) % MOD;
        }

        up = newUp;
        down = newDown;
    }

    let answer = 0;

    for (let v = 1; v <= m; v++) {
        answer = (answer + up[v] + down[v]) % MOD;
    }

    return answer;
};