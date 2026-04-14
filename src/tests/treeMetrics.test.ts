import { describe, it, expect } from 'vitest';
import { getFolderTotalSize } from '../utils/treeMetrics';
import type { FolderNode } from '../types/tree';

describe('getFolderTotalSize', () =>
{
    it('returns 0 for an empty folder', () =>
    {
        const folder: FolderNode = { type: 'folder', name: 'empty', children: [] };
        expect(getFolderTotalSize(folder)).toBe(0);
    });

    it('returns the sum of direct file children', () =>
    {
        const folder: FolderNode = {
            type: 'folder',
            name: 'root',
            children: [
                { type: 'file', name: 'a.txt', size: 100 },
                { type: 'file', name: 'b.txt', size: 200 },
            ],
        };
        expect(getFolderTotalSize(folder)).toBe(300);
    });

    it('recursively sums files in nested folders', () =>
    {
        const folder: FolderNode = {
            type: 'folder',
            name: 'root',
            children: [
                { type: 'file', name: 'root.txt', size: 10 },
                {
                    type: 'folder',
                    name: 'sub',
                    children: [
                        { type: 'file', name: 'a.ts', size: 40 },
                        { type: 'file', name: 'b.ts', size: 50 },
                    ],
                },
            ],
        };
        expect(getFolderTotalSize(folder)).toBe(100);
    });

    it('handles deeply nested structures', () =>
    {
        const folder: FolderNode = {
            type: 'folder',
            name: 'root',
            children: [
                {
                    type: 'folder',
                    name: 'a',
                    children: [
                        {
                            type: 'folder',
                            name: 'b',
                            children: [
                                { type: 'file', name: 'deep.ts', size: 999 },
                            ],
                        },
                    ],
                },
            ],
        };
        expect(getFolderTotalSize(folder)).toBe(999);
    });

    it('counts files with size 0', () =>
    {
        const folder: FolderNode = {
            type: 'folder',
            name: 'root',
            children: [
                { type: 'file', name: 'empty.txt', size: 0 },
                { type: 'file', name: 'small.txt', size: 5 },
            ],
        };
        expect(getFolderTotalSize(folder)).toBe(5);
    });
});
