/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val === undefined ? 0 : val)
 *     this.left = (left === undefined ? null : left)
 *     this.right = (right === undefined ? null : right)
 * }
 */

/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function(descriptions) {

    const nodes = new Map();
    const children = new Set();

    for (const [parent, child, isLeft] of descriptions) {

        if (!nodes.has(parent)) {
            nodes.set(parent, new TreeNode(parent));
        }

        if (!nodes.has(child)) {
            nodes.set(child, new TreeNode(child));
        }

        const parentNode = nodes.get(parent);
        const childNode = nodes.get(child);

        if (isLeft === 1) {
            parentNode.left = childNode;
        } else {
            parentNode.right = childNode;
        }

        children.add(child);
    }

    for (const [parent] of descriptions) {
        if (!children.has(parent)) {
            return nodes.get(parent);
        }
    }

    return null;
};