/**
 * @param {number[]} landStartTime
 * @param {number[]} landDuration
 * @param {number[]} waterStartTime
 * @param {number[]} waterDuration
 * @return {number}
 */
var earliestFinishTime = function (
    landStartTime,
    landDuration,
    waterStartTime,
    waterDuration
) {

    function buildQuery(start, duration) {
        const rides = [];

        for (let i = 0; i < start.length; i++) {
            rides.push([start[i], duration[i]]);
        }

        rides.sort((a, b) => a[0] - b[0]);

        const n = rides.length;

        const starts = new Array(n);
        const prefixMinDur = new Array(n);
        const suffixMinEnd = new Array(n);

        for (let i = 0; i < n; i++) {
            starts[i] = rides[i][0];
        }

        prefixMinDur[0] = rides[0][1];

        for (let i = 1; i < n; i++) {
            prefixMinDur[i] = Math.min(
                prefixMinDur[i - 1],
                rides[i][1]
            );
        }

        suffixMinEnd[n - 1] =
            rides[n - 1][0] + rides[n - 1][1];

        for (let i = n - 2; i >= 0; i--) {
            suffixMinEnd[i] = Math.min(
                suffixMinEnd[i + 1],
                rides[i][0] + rides[i][1]
            );
        }

        function query(A) {
            let left = 0;
            let right = n - 1;
            let pos = -1;

            while (left <= right) {
                const mid = Math.floor((left + right) / 2);

                if (starts[mid] <= A) {
                    pos = mid;
                    left = mid + 1;
                } else {
                    right = mid - 1;
                }
            }

            let best = Infinity;

            // starts <= A
            if (pos !== -1) {
                best = Math.min(
                    best,
                    A + prefixMinDur[pos]
                );
            }

            // starts > A
            if (pos + 1 < n) {
                best = Math.min(
                    best,
                    suffixMinEnd[pos + 1]
                );
            }

            return best;
        }

        return query;
    }

    const waterQuery = buildQuery(
        waterStartTime,
        waterDuration
    );

    const landQuery = buildQuery(
        landStartTime,
        landDuration
    );

    let answer = Infinity;

    // Land -> Water
    for (let i = 0; i < landStartTime.length; i++) {
        const landFinish =
            landStartTime[i] + landDuration[i];

        answer = Math.min(
            answer,
            waterQuery(landFinish)
        );
    }

    // Water -> Land
    for (let j = 0; j < waterStartTime.length; j++) {
        const waterFinish =
            waterStartTime[j] + waterDuration[j];

        answer = Math.min(
            answer,
            landQuery(waterFinish)
        );
    }

    return answer;
};