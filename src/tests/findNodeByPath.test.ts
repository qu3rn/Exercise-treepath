import { describe, it, expect } from 'vitest';
import { findNodeByPath } from '../utils/findNodeByPath';
import type { FolderNode } from '../types/tree';

const tree: FolderNode = {
    type: 'folder',
    name: 'root',
    children: [
        {
            type: 'folder',
            name: 'src',
            children: [
                { type: 'file', name: 'main.ts', size: 100 },
                {
                    type: 'folder',
                    name: 'utils',
                    children: [
                        { type: 'file', name: 'helpers.ts', size: 50 },
                    ],
                },
            ],
        },
        { type: 'file', name: 'README.md', size: 300 },
    ],
};

describe('findNodeByPath', () =>
{
    it('returns the root node when path is just the root name', () =>
    {
        const result = findNodeByPath(tree, 'root');
        expect(result).toBe(tree);
    });

    it('finds a direct file child of root', () =>
    {
        const result = findNodeByPath(tree, 'root/README.md');
        expect(result?.name).toBe('README.md');
        expect(result?.type).toBe('file');
    });

    it('finds a direct folder child of root', () =>
    {
        const result = findNodeByPath(tree, 'root/src');
        expect(result?.name).toBe('src');
        expect(result?.type).toBe('folder');
    });

    it('finds a deeply nested file', () =>
    {
        const result = findNodeByPath(tree, 'root/src/utils/helpers.ts');
        expect(result?.name).toBe('helpers.ts');
        expect(result?.type).toBe('file');
    });

    it('finds a deeply nested folder', () =>
    {
        const result = findNodeByPath(tree, 'root/src/utils');
        expect(result?.name).toBe('utils');
        expect(result?.type).toBe('folder');
    });

    it('returns null for empty path', () =>
    {
        expect(findNodeByPath(tree, '')).toBeNull();
    });

    it('returns null when first segment does not match root', () =>
    {
        expect(findNodeByPath(tree, 'wrong/src')).toBeNull();
    });

    it('returns null for a nonexistent child', () =>
    {
        expect(findNodeByPath(tree, 'root/nonexistent')).toBeNull();
    });

    it('returns null for a path that goes through a file as if it were a folder', () =>
    {
        expect(findNodeByPath(tree, 'root/README.md/child')).toBeNull();
    });
});
