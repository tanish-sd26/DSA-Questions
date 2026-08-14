/**
 * @param {string} s
 * @param {string} queryCharacters
 * @param {number[]} queryIndices
 * @return {number[]}
 */
var longestRepeating = function(s, queryCharacters, queryIndices) {
    const arr = s.split("");
    const n = arr.length;

    const tree = Array(4 * n);

    function merge(a, b) {
        if (!a) return b;
        if (!b) return a;

        const res = {
            leftChar: a.leftChar,
            rightChar: b.rightChar,
            prefix: a.prefix,
            suffix: b.suffix,
            len: a.len + b.len,
            best: Math.max(a.best, b.best)
        };

        if (a.rightChar === b.leftChar) {
            res.best = Math.max(res.best, a.suffix + b.prefix);
        }

        if (a.prefix === a.len && a.rightChar === b.leftChar) {
            res.prefix = a.len + b.prefix;
        }

        if (b.suffix === b.len && a.rightChar === b.leftChar) {
            res.suffix = b.len + a.suffix;
        }

        return res;
    }

    function build(node, l, r) {
        if (l === r) {
            tree[node] = {
                leftChar: arr[l],
                rightChar: arr[l],
                prefix: 1,
                suffix: 1,
                len: 1,
                best: 1
            };
            return;
        }

        const mid = (l + r) >> 1;
        build(node * 2, l, mid);
        build(node * 2 + 1, mid + 1, r);

        tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
    }

    function update(node, l, r, idx, ch) {
        if (l === r) {
            tree[node] = {
                leftChar: ch,
                rightChar: ch,
                prefix: 1,
                suffix: 1,
                len: 1,
                best: 1
            };
            return;
        }

        const mid = (l + r) >> 1;

        if (idx <= mid) {
            update(node * 2, l, mid, idx, ch);
        } else {
            update(node * 2 + 1, mid + 1, r, idx, ch);
        }

        tree[node] = merge(tree[node * 2], tree[node * 2 + 1]);
    }

    build(1, 0, n - 1);

    const ans = [];

    for (let i = 0; i < queryIndices.length; i++) {
        update(1, 0, n - 1, queryIndices[i], queryCharacters[i]);
        ans.push(tree[1].best);
    }

    return ans;
};