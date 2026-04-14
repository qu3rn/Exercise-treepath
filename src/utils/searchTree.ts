import { isFolderNode, type SearchResult, type TreeNode } from "../types/tree";
import { buildNodePath } from "./buildNodePath";

export function searchTree(
    root: TreeNode,
    query: string,
    parentPath = ''
): SearchResult[]
{
    const _query = query.trim().toLocaleLowerCase();

    if (!_query)
    {
        return [];
    }

    const currentPath = buildNodePath(parentPath, root.name);
    const results: SearchResult[] = [];

    const isRoot = root.name.toLowerCase().includes(_query);

    if (isRoot)
    {
        results.push({
            path: currentPath,
            node: root
        });
    }

    if (isFolderNode(root))
    {
        root.children.forEach((child) =>
        {
            results.push(...searchTree(child, _query, currentPath));
        });
    }

    return results;
};
