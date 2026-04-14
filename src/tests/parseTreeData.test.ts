import { describe, it, expect } from 'vitest';
import { parseTreeData } from '../utils/parseTreeData';

describe('parseTreeData', () =>
{
    describe('empty / blank input', () =>
    {
        it('throws on empty string', () =>
        {
            expect(() => parseTreeData('')).toThrow('JSON input is empty.');
        });

        it('throws on whitespace-only string', () =>
        {
            expect(() => parseTreeData('   ')).toThrow('JSON input is empty.');
        });
    });

    describe('invalid JSON', () =>
    {
        it('throws on malformed JSON', () =>
        {
            expect(() => parseTreeData('{name:')).toThrow('Invalid JSON format.');
        });
    });

    describe('wrong root structure', () =>
    {
        it('throws when root is an array', () =>
        {
            expect(() => parseTreeData('[]')).toThrow('root must be a JSON object');
        });

        it('throws when root is a primitive', () =>
        {
            expect(() => parseTreeData('"hello"')).toThrow('root must be a JSON object');
        });

        it('throws when root is a file node', () =>
        {
            const json = JSON.stringify({ type: 'file', name: 'file.txt', size: 100 });
            expect(() => parseTreeData(json)).toThrow('root node must be a folder');
        });
    });

    describe('invalid node fields', () =>
    {
        it('throws when folder name is missing', () =>
        {
            const json = JSON.stringify({ type: 'folder', children: [] });
            expect(() => parseTreeData(json)).toThrow('"name" must be a non-empty string');
        });

        it('throws when folder name is empty string', () =>
        {
            const json = JSON.stringify({ type: 'folder', name: '', children: [] });
            expect(() => parseTreeData(json)).toThrow('"name" must be a non-empty string');
        });

        it('throws when children is not an array', () =>
        {
            const json = JSON.stringify({ type: 'folder', name: 'root', children: null });
            expect(() => parseTreeData(json)).toThrow('"children" must be an array');
        });

        it('throws when file size is missing', () =>
        {
            const json = JSON.stringify({
                type: 'folder',
                name: 'root',
                children: [{ type: 'file', name: 'a.txt' }],
            });
            expect(() => parseTreeData(json)).toThrow('"size" must be a non-negative number');
        });

        it('throws when file size is negative', () =>
        {
            const json = JSON.stringify({
                type: 'folder',
                name: 'root',
                children: [{ type: 'file', name: 'a.txt', size: -1 }],
            });
            expect(() => parseTreeData(json)).toThrow('"size" must be a non-negative number');
        });
    });

    describe('valid input', () =>
    {
        it('parses a folder with no children', () =>
        {
            const json = JSON.stringify({ type: 'folder', name: 'root', children: [] });
            const result = parseTreeData(json);
            expect(result).toEqual({ type: 'folder', name: 'root', children: [] });
        });

        it('parses a folder with a file child', () =>
        {
            const json = JSON.stringify({
                type: 'folder',
                name: 'root',
                children: [{ type: 'file', name: 'index.ts', size: 512 }],
            });
            const result = parseTreeData(json);
            expect(result).toEqual({
                type: 'folder',
                name: 'root',
                children: [{ type: 'file', name: 'index.ts', size: 512 }],
            });
        });

        it('parses nested folders recursively', () =>
        {
            const json = JSON.stringify({
                type: 'folder',
                name: 'root',
                children: [
                    {
                        type: 'folder',
                        name: 'src',
                        children: [{ type: 'file', name: 'main.ts', size: 200 }],
                    },
                ],
            });
            const result = parseTreeData(json);
            expect(result.type).toBe('folder');
            if (result.type === 'folder')
            {
                expect(result.children[0].name).toBe('src');
                expect(result.children[0].type).toBe('folder');
            }
        });

        it('accepts size of 0', () =>
        {
            const json = JSON.stringify({
                type: 'folder',
                name: 'root',
                children: [{ type: 'file', name: 'empty.txt', size: 0 }],
            });
            expect(() => parseTreeData(json)).not.toThrow();
        });
    });
});
