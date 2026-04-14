import { isFileNode, isFolderNode, type FolderNode } from '../types/tree';

export const getFolderChildrenCount = (node: FolderNode): number =>
{
    return node.children.length;
};

export const getFolderTotalSize = (node: FolderNode): number =>
{
    return node.children.reduce((total, child) =>
    {
        if (isFileNode(child))
        {
            return total + child.size;
        }

        if (isFolderNode(child))
        {
            return total + getFolderTotalSize(child);
        }

        return total;
    }, 0);
};
