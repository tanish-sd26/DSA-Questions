/**
 * @param {string[]} classroom
 * @param {number} energy
 * @return {number}
 */
var minMoves = function(classroom, energy) {
    const m = classroom.length;
    const n = classroom[0].length;
    const cells = m * n;

    let start = -1;
    let litterCount = 0;

    // litterId[pos] = bit index of litter at this cell
    const litterId = new Int8Array(cells);
    litterId.fill(-1);

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            const pos = r * n + c;

            if (classroom[r][c] === 'S') {
                start = pos;
            } else if (classroom[r][c] === 'L') {
                litterId[pos] = litterCount++;
            }
        }
    }

    if (litterCount === 0) {
        return 0;
    }

    const masks = 1 << litterCount;
    const fullMask = masks - 1;
    const energyStates = energy + 1;

    /*
        Encode:
        state = ((mask * cells + position) * (energy + 1)) + remainingEnergy
    */

    const totalStates = masks * cells * energyStates;

    // Compact visited array instead of Set
    const visited = new Uint8Array(totalStates);

    function encode(pos, mask, e) {
        return ((mask * cells + pos) * energyStates) + e;
    }

    const startState = encode(start, 0, energy);

    /*
        Typed-array queue.
        Each state can be inserted at most once.
    */
    const queue = new Int32Array(totalStates);

    let head = 0;
    let tail = 0;

    queue[tail++] = startState;
    visited[startState] = 1;

    let moves = 0;

    const dr = [1, -1, 0, 0];
    const dc = [0, 0, 1, -1];

    while (head < tail) {
        const levelEnd = tail;

        while (head < levelEnd) {
            const state = queue[head++];

            let temp = Math.floor(state / energyStates);

            const e = state % energyStates;
            const pos = temp % cells;
            const mask = Math.floor(temp / cells);

            const r = Math.floor(pos / n);
            const c = pos % n;

            // No energy => cannot make another move
            if (e === 0) {
                continue;
            }

            for (let d = 0; d < 4; d++) {
                const nr = r + dr[d];
                const nc = c + dc[d];

                if (
                    nr < 0 ||
                    nr >= m ||
                    nc < 0 ||
                    nc >= n
                ) {
                    continue;
                }

                if (classroom[nr][nc] === 'X') {
                    continue;
                }

                const nextPos = nr * n + nc;

                let nextEnergy = e - 1;
                let nextMask = mask;

                // Collect litter
                const id = litterId[nextPos];

                if (id !== -1) {
                    nextMask |= (1 << id);
                }

                // IMPORTANT:
                // reaching the final litter with energy = 0 is valid
                if (nextMask === fullMask) {
                    return moves + 1;
                }

                // Reset area restores full energy
                if (classroom[nr][nc] === 'R') {
                    nextEnergy = energy;
                }

                /*
                    If energy becomes 0 and this isn't R,
                    this state cannot move anywhere later.
                    Since all litter isn't collected, no need to enqueue.
                */
                if (nextEnergy === 0) {
                    continue;
                }

                const nextState = encode(
                    nextPos,
                    nextMask,
                    nextEnergy
                );

                if (visited[nextState]) {
                    continue;
                }

                visited[nextState] = 1;
                queue[tail++] = nextState;
            }
        }

        moves++;
    }

    return -1;
};