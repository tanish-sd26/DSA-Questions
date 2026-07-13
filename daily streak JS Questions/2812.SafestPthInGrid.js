/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumSafenessFactor = function (grid) {
    const n = grid.length;
    const dirs = [[1,0],[-1,0],[0,1],[0,-1]];

    //Multi-source BFS to calculate distance from nearest thief
    const dist = Array.from({ length: n }, () => Array(n).fill(Infinity));
    const queue = [];
    let head = 0;

    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] === 1) {
                dist[r][c] = 0;
                queue.push([r, c]);
            }
        }
    }

    while (head < queue.length) {
        const [r, c] = queue[head++];

        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;

            if (
                nr >= 0 &&
                nr < n &&
                nc >= 0 &&
                nc < n &&
                dist[nr][nc] === Infinity
            ) {
                dist[nr][nc] = dist[r][c] + 1;
                queue.push([nr, nc]);
            }
        }
    }

    // Max Heap implementation
    class MaxHeap {
        constructor() {
            this.heap = [];
        }

        push(item) {
            this.heap.push(item);
            this.bubbleUp();
        }

        bubbleUp() {
            let idx = this.heap.length - 1;

            while (idx > 0) {
                let parent = Math.floor((idx - 1) / 2);

                if (this.heap[parent][0] >= this.heap[idx][0]) break;

                [this.heap[parent], this.heap[idx]] =
                    [this.heap[idx], this.heap[parent]];

                idx = parent;
            }
        }

        pop() {
            if (this.heap.length === 1) return this.heap.pop();

            const top = this.heap[0];
            this.heap[0] = this.heap.pop();
            this.sinkDown();

            return top;
        }

        sinkDown() {
            let idx = 0;

            while (true) {
                let left = idx * 2 + 1;
                let right = idx * 2 + 2;
                let largest = idx;

                if (
                    left < this.heap.length &&
                    this.heap[left][0] > this.heap[largest][0]
                ) {
                    largest = left;
                }

                if (
                    right < this.heap.length &&
                    this.heap[right][0] > this.heap[largest][0]
                ) {
                    largest = right;
                }

                if (largest === idx) break;

                [this.heap[idx], this.heap[largest]] =
                    [this.heap[largest], this.heap[idx]];

                idx = largest;
            }
        }

        size() {
            return this.heap.length;
        }
    }

    const heap = new MaxHeap();
    const best = Array.from({ length: n }, () => Array(n).fill(-1));

    heap.push([dist[0][0], 0, 0]);
    best[0][0] = dist[0][0];

    while (heap.size()) {
        const [safe, r, c] = heap.pop();

        if (r === n - 1 && c === n - 1) {
            return safe;
        }

        for (const [dr, dc] of dirs) {
            const nr = r + dr;
            const nc = c + dc;

            if (
                nr >= 0 &&
                nr < n &&
                nc >= 0 &&
                nc < n
            ) {
                const newSafe = Math.min(safe, dist[nr][nc]);

                if (newSafe > best[nr][nc]) {
                    best[nr][nc] = newSafe;
                    heap.push([newSafe, nr, nc]);
                }
            }
        }
    }

    return 0;
};