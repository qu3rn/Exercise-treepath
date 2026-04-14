import { describe, it, expect } from 'vitest';
import { searchTree } from '../utils/searchTree';
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
                { type: 'file', name: 'utils.ts', size: 200 },
            ],
        },
        {
            type: 'folder',
            name: 'public',
            children: [
                { type: 'file', name: 'index.html', size: 50 },
            ],
        },
        { type: 'file', name: 'README.md', size: 300 },
    ],
};

describe('searchTree', () =>
{
    it('returns empty array for empty query', () =>
    {
        expect(searchTree(tree, '')).toEqual([]);
    });

    it('returns empty array for whitespace-only query', () =>
    {
        expect(searchTree(tree, '   ')).toEqual([]);
    });

    it('returns empty array when nothing matches', () =>
    {
        expect(searchTree(tree, 'zzz')).toEqual([]);
    });

    it('matches the root node by name', () =>
    {
        const results = searchTree(tree, 'root');
        expect(results).toHaveLength(1);
        expect(results[0].node.name).toBe('root');
        expect(results[0].path).toBe('root');
    });

    it('matches a nested file', () =>
    {
        const results = searchTree(tree, 'main');
        expect(results).toHaveLength(1);
        expect(results[0].node.name).toBe('main.ts');
        expect(results[0].path).toBe('root/src/main.ts');
    });

    it('matches a nested folder', () =>
    {
        const results = searchTree(tree, 'src');
        expect(results).toHaveLength(1);
        expect(results[0].node.name).toBe('src');
        expect(results[0].path).toBe('root/src');
    });

    it('is case-insensitive', () =>
    {
        const lower = searchTree(tree, 'readme');
        const upper = searchTree(tree, 'README');
        expect(lower).toHaveLength(1);
        expect(upper).toHaveLength(1);
        expect(lower[0].node.name).toBe('README.md');
    });

    it('returns multiple matches when query matches several nodes', () =>
    {
        // 'utils.ts' and nothing else, but 'ts' matches main.ts, utils.ts
        const results = searchTree(tree, '.ts');
        expect(results.length).toBeGreaterThanOrEqual(2);
        const names = results.map((r) => r.node.name);
        expect(names).toContain('main.ts');
        expect(names).toContain('utils.ts');
    });

    it('includes correct paths for all results', () =>
    {
        const results = searchTree(tree, 'index');
        expect(results).toHaveLength(1);
        expect(results[0].path).toBe('root/public/index.html');
    });
});
