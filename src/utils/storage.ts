import type { SearchResult, TreeNode } from "../types/tree";

// local storage helpers to keep data after reload doc
export const TREE_STORAGE_KEY = 'file-tree-data';
export const EXPANDED_PATHS_STORAGE_KEY = 'file-tree-expanded-paths';
export const SEARCH_QUERY_STORAGE_KEY = 'file-tree-search-query';
export const SEARCH_RESULTS_STORAGE_KEY = 'file-tree-search-results';

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

export const loadExpandedPathsFromStorage = (): string[] =>
{
    try
    {
        const rawData = localStorage.getItem(EXPANDED_PATHS_STORAGE_KEY);

        if (!rawData)
        {
            return [];
        }

        const parsed = JSON.parse(rawData);

        if (!Array.isArray(parsed))
        {
            return [];
        }

        return parsed.filter((node): node is string => typeof node === 'string');
    }
    catch (error)
    {
        return [];
    }
};

export const loadSearchQueryFromStorage = (): string =>
{
    const data = localStorage.getItem(SEARCH_QUERY_STORAGE_KEY);
    return data ?? '';
};

export const loadSearchResultsFromStorage = (): SearchResult[] =>
{
    try
    {
        const rawData = localStorage.getItem(SEARCH_RESULTS_STORAGE_KEY);

        if (!rawData)
        {
            return [];
        }

        const parsed = JSON.parse(rawData);

        if (!Array.isArray(parsed))
        {
            return [];
        }

        const searchResults = parsed.filter((searchResult): searchResult is SearchResult =>
        {
            if (typeof searchResult != 'object' || searchResult !== null)
            {
                return false;
            }

            const result = searchResult as Record<string, unknown>;

            const isPath = typeof result === 'string';
            const isNode = typeof result === 'object' && result.node !== null;

            return isPath && isNode;
        });

        return searchResults;
    }
    catch (error)
    {
        return [];
    }
};

export const removeTreeFromStorage = (): void =>
{
    localStorage.removeItem(TREE_STORAGE_KEY);
};
