import type { TreeNode as TreeNodeType } from '../../types/tree';
import TreeNode from './TreeNode';

type TreeProps = {
    root: TreeNodeType;
};

export default function Tree({ root }: TreeProps)
{
    return (
        <section className="w-full">
            <h2 className="m-0 mb-3 text-xs font-bold tracking-widest uppercase text-[#5A7490] border-b border-[#1E2D45] pb-2">
                File tree
            </h2>

            <div className="font-mono text-sm">
                <TreeNode node={root} parentPath="" depth={0} />
            </div>
        </section>
    );
}
