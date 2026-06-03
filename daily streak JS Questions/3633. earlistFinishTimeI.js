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
    let ans = Infinity;

    for (let i = 0; i < landStartTime.length; i++) {
        for (let j = 0; j < waterStartTime.length; j++) {

            // Land -> Water
            let landFinish =
                landStartTime[i] + landDuration[i];

            let finish1 =
                Math.max(
                    landFinish,
                    waterStartTime[j]
                ) + waterDuration[j];

            ans = Math.min(ans, finish1);

            // Water -> Land
            let waterFinish =
                waterStartTime[j] + waterDuration[j];

            let finish2 =
                Math.max(
                    waterFinish,
                    landStartTime[i]
                ) + landDuration[i];

            ans = Math.min(ans, finish2);
        }
    }

    return ans;
};