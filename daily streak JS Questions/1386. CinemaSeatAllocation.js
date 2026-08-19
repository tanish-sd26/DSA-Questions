var maxNumberOfFamilies = function(n, reservedSeats) {
    const rows = new Map();

    // Store reserved seats using a bitmask
    for (const [row, seat] of reservedSeats) {
        if (!rows.has(row)) {
            rows.set(row, 0);
        }

        rows.set(row, rows.get(row) | (1 << seat));
    }

    let answer = (n - rows.size) * 2;

    // Masks for the three possible blocks
    const left = (1 << 2) | (1 << 3) | (1 << 4) | (1 << 5);
    const middle = (1 << 4) | (1 << 5) | (1 << 6) | (1 << 7);
    const right = (1 << 6) | (1 << 7) | (1 << 8) | (1 << 9);

    for (const mask of rows.values()) {
        const leftFree = (mask & left) === 0;
        const rightFree = (mask & right) === 0;

        if (leftFree && rightFree) {
            answer += 2;
        } else if (leftFree || rightFree || (mask & middle) === 0) {
            answer += 1;
        }
    }

    return answer;
};