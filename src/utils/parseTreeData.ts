import type { FileNode, FolderNode, TreeNode } from "../types/tree";

const isObject = (value: unknown): value is Record<string, unknown> =>
{
    return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const isValidName = (value: unknown): value is string =>
{
    return typeof value === 'string' && value.trim().length > 0;
};

const isValidSize = (value: unknown): value is number =>
{
    return typeof value === 'number' && Number.isFinite(value) && value >= 0;
};

const parseFileNode = (value: Record<string, unknown>): FileNode =>
{
    if (!isValidName(value.name))
    {
        throw new Error('Invalid file node: "name" must be a non-empty string.');
    }

    if (value.type !== 'file')
    {
        throw new Error(`Invalid file node "${String(value.name)}": "type" must be "file".`);
    }

    if (!isValidSize(value.size))
    {
        throw new Error(`Invalid file node "${String(value.name)}": "size" must be a non-negative number.`);
    }

    return {
        name: value.name,
        type: 'file',
        size: value.size,
    };
};

const parseFolderNode = (value: Record<string, unknown>): FolderNode =>
{
    if (!isValidName(value.name))
    {
        throw new Error('Invalid folder node: "name" must be a non-empty string.');
    }

    if (value.type !== 'folder')
    {
        throw new Error(`Invalid folder node "${String(value.name)}": "type" must be "folder".`);
    }

    if (!Array.isArray(value.children))
    {
        throw new Error(`Invalid folder node "${String(value.name)}": "children" must be an array.`);
    }

    return {
        name: value.name,
        type: 'folder',
        children: value.children.map(parseTreeNode),
    };
};

export const parseTreeNode = (value: unknown): TreeNode =>
{
    if (!isObject(value))
    {
        throw new Error('Invalid node: expected an object.');
    }

    if (value.type === 'file')
    {
        return parseFileNode(value);
    }

    if (value.type === 'folder')
    {
        return parseFolderNode(value);
    }

    throw new Error(
        `Invalid node "${'name' in value ? String(value.name) : 'unknown'}": "type" must be "file" or "folder".`
    );
};

export const parseTreeData = (json: string): TreeNode =>
{
    let parsed: unknown;

    try
    {
        if (!json.trim())
        {
            throw new Error('JSON input is empty.');
        }

        if (!isObject(parsed))
        {
            throw new Error('Invalid structure: root must be a JSON object, not an array or primitive.');
        }

        if (parsed.type !== 'folder')
        {
            throw new Error('Invalid structure: root node must be a folder, not a file.');
        }

        parsed = JSON.parse(json);
    }
    catch
    {
        throw new Error('Invalid JSON format.');
    }

    return parseTreeNode(parsed);
};
