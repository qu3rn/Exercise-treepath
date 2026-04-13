import type { TreeNode } from "../types/tree";

// local storage helpers to keep data after reload doc
const TREE_STORAGE_KEY = 'file-tree-data';

export const saveTreeToStorage = (tree: TreeNode): void =>
{
    localStorage.setItem(TREE_STORAGE_KEY, JSON.stringify(tree));
};

export const loadTreeFromStorage = (): TreeNode | null =>
{
    const rawData = localStorage.getItem(TREE_STORAGE_KEY);

    if (!rawData)
    {
        return null;
    }

    return parseStoredTree(rawData);
};

const parseStoredTree = (rawData: string): TreeNode | null =>
{
    try
    {
        return JSON.parse(rawData) as TreeNode;
    }
    catch (error)
    {
        // In case there was corrupted data
        localStorage.removeItem(TREE_STORAGE_KEY);
        return null;
    }
};
