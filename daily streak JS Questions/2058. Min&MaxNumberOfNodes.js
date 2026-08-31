/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var nodesBetweenCriticalPoints = function(head) {
    let prev = head;
    let curr = head.next;
    let index = 1;

    let firstCritical = -1;
    let lastCritical = -1;
    let prevCritical = -1;

    let minDistance = Infinity;

    while (curr.next !== null) {
        let next = curr.next;

        // Check if current node is a critical point
        if (
            (curr.val > prev.val && curr.val > next.val) ||
            (curr.val < prev.val && curr.val < next.val)
        ) {
            if (firstCritical === -1) {
                // First critical point
                firstCritical = index;
            } else {
                // Distance from previous critical point
                minDistance = Math.min(
                    minDistance,
                    index - prevCritical
                );
            }

            lastCritical = index;
            prevCritical = index;
        }

        prev = curr;
        curr = next;
        index++;
    }

    // Fewer than two critical points
    if (firstCritical === -1 || firstCritical === lastCritical) {
        return [-1, -1];
    }

    let maxDistance = lastCritical - firstCritical;

    return [minDistance, maxDistance];
};