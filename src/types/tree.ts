type BaseNode = {
    name: string;
};

export type FileNode = BaseNode & {
    type: 'file';
    size: number;
};

export type FolderNode = BaseNode & {
    type: 'folder';
    children: TreeNode[];
};

export type TreeNode = FileNode | FolderNode;

export const isFileNode = (node: TreeNode): node is FileNode =>
{
    return node.type === 'file';
};

export const isFolderNode = (node: TreeNode): node is FolderNode =>
{
    return node.type === 'folder';
};

export type SearchResult = {
    path: string;
    node: TreeNode;
};
