import { isFolderNode, type TreeNode } from '../types/tree';

export const findNodeByPath = (
    root: TreeNode,
    targetPath: string
): TreeNode | null =>
{
    const segments = targetPath.split('/').filter(Boolean);

    if (segments.length === 0)
    {
        return null;
    }

    if (segments[0] !== root.name)
    {
        return null;
    }

    let currentNode: TreeNode = root;

    for (let index = 1; index < segments.length; index += 1)
    {
        if (!isFolderNode(currentNode))
        {
            return null;
        }

        const nextNode = currentNode.children.find(
            (child) => child.name === segments[index]
        );

        if (!nextNode)
        {
            return null;
        }

        currentNode = nextNode;
    }

    return currentNode;
};
