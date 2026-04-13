import { Link } from "react-router-dom";
import { useTreeContext } from "../../store/TreeContext";
import { isFolderNode } from "../../types/tree";
import type { TreeNode as TreeNodeType } from "../../types/tree";
import { buildNodePath } from "../../utils/buildNodePath";

type TreeNodeProps = {
    node: TreeNodeType;
    parentPath: string;
    depth?: number;
};

export default function TreeNode({
    node,
    parentPath,
    depth = 0,
}: TreeNodeProps)
{
    const { state, dispatch } = useTreeContext();
    const currentPath = buildNodePath(parentPath, node.name);
    const isExpanded = state.expandedPaths.includes(currentPath);
    const isFolder = isFolderNode(node);

    const handleToggle = () =>
    {
        if (!isFolder) return;
        dispatch({ type: 'TOGGLE_EXPANDED', payload: { path: currentPath } });
    };

    const indent = depth * 16;

    return (
        <div>
            <div
                className="flex items-center gap-1.5 py-[3px] pr-2 group hover:bg-[#1E2D45] transition-colors cursor-default"
                style={{ paddingLeft: `${indent + 8}px` }}
            >
                {isFolder ? (
                    <button
                        type="button"
                        onClick={handleToggle}
                        className="w-4 h-4 flex items-center justify-center text-[#3D5878] hover:text-[#F28C28] transition-colors text-[10px] flex-shrink-0 bg-transparent border-0 cursor-pointer p-0"
                    >
                        {isExpanded ? '▾' : '▸'}
                    </button>
                ) : (
                    <span className="w-4 flex-shrink-0" />
                )}

                <span className="text-[11px] flex-shrink-0">
                    {isFolder ? (
                        <span className="text-[#4755A0]">{isExpanded ? '▼' : '▶'}</span>
                    ) : (
                        <span className="text-[#3D5878]">—</span>
                    )}
                </span>

                <Link
                    to={`/tree/details?path=${encodeURIComponent(currentPath)}`}
                    className="text-[#A8BFCE] no-underline hover:text-[#F28C28] transition-colors tracking-wide group-hover:text-[#E2EAF8]"
                >
                    {node.name}
                </Link>

                {!isFolder && 'size' in node && (
                    <span className="ml-auto text-[10px] text-[#2D3E5C] tracking-wider">
                        {node.size != null ? `${node.size}B` : ''}
                    </span>
                )}
            </div>

            {isFolder && isExpanded && (
                <div className="border-l border-[#1E2D45]" style={{ marginLeft: `${indent + 16}px` }}>
                    {node.children.length > 0 ? (
                        node.children.map((child) => (
                            <TreeNode
                                key={buildNodePath(currentPath, child.name)}
                                node={child}
                                parentPath={currentPath}
                                depth={depth + 1}
                            />
                        ))
                    ) : (
                        <div className="py-1 px-3 text-[#2D3E5C] text-xs tracking-widest uppercase">
                            Empty folder
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
