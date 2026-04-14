import { Link, Navigate } from 'react-router-dom';
import { isFileNode, isFolderNode } from '../types/tree';
import { findNodeByPath } from '../utils/findNodeByPath';
import { formatSize } from '../utils/formatSize';
import { getFolderChildrenCount, getFolderTotalSize } from '../utils/treeMetrics';
import { useTreeContext } from '../store/TreeContext';
import { buildNodePath } from '../utils/buildNodePath';
import { useParams } from "react-router-dom";

export default function NodeDetails()
{
    const { state } = useTreeContext();
    const { "*": nodePath } = useParams();

    if (!state.tree)
    {
        return <Navigate to="/" replace />;
    }

    const decodedPath = nodePath ?? '';
    const node = findNodeByPath(state.tree, decodedPath);

    if (!node)
    {
        return (
            <main className="min-h-screen py-8 px-4 bg-[#0D1117]">
                <div className="w-full max-w-[960px] mx-auto">
                    <ErrorCard message="Node not found." />
                </div>
            </main>
        );
    }

    const isFolder = isFolderNode(node);

    return (
        <main className="min-h-screen py-8 px-4 bg-[#0D1117]">
            <div className="w-full max-w-[960px] mx-auto">
                {/* Header */}
                <section className="flex justify-between items-start gap-4 flex-wrap mb-6 pb-4 border-b border-[#1E2D45]">
                    <div>
                        <h1 className="m-0 text-[28px] leading-[1.1] text-[#E2EAF8] tracking-widest uppercase font-bold">
                            Node details
                        </h1>
                        <p className="mt-2 mb-0 text-[#3D5878] text-xs font-mono tracking-wider">
                            {decodedPath}
                        </p>
                    </div>

                    <Link
                        to="/tree"
                        className="border border-[#2D3E5C] py-2.5 px-4 font-semibold bg-transparent text-[#7A90B0] tracking-wider uppercase text-sm no-underline hover:border-[#F28C28] hover:text-[#F28C28] transition-colors"
                    >
                        Back to tree
                    </Link>
                </section>

                {/* Main card */}
                <section className="bg-[#161D2B] border border-[#1E2D45] border-l-2 border-l-[#4755A0] p-5">
                    {/* Type badge */}
                    <div className="mb-4">
                        <span className={`inline-block text-[10px] font-bold tracking-widest uppercase px-2 py-1 border ${isFolder ? 'border-[#4755A0] text-[#4755A0] bg-[#1B2640]' : 'border-[#2D3E5C] text-[#5A7490] bg-[#111827]'}`}>
                            {node.type}
                        </span>
                    </div>

                    {/* Details grid */}
                    <div className="flex flex-col divide-y divide-[#1E2D45]">
                        <DetailItem label="Name" value={node.name} />
                        <DetailItem label="Full path" value={decodedPath} mono />

                        {isFileNode(node) && (
                            <DetailItem label="Size" value={formatSize(node.size)} accent />
                        )}

                        {isFolderNode(node) && (
                            <>
                                <DetailItem
                                    label="Direct children"
                                    value={String(getFolderChildrenCount(node))}
                                    accent
                                />
                                <DetailItem
                                    label="Total subtree size"
                                    value={formatSize(getFolderTotalSize(node))}
                                    accent
                                />
                            </>
                        )}
                    </div>
                </section>

                {/* Children list */}
                {isFolderNode(node) && (
                    <section className="mt-4 bg-[#161D2B] border border-[#1E2D45]">
                        <h2 className="m-0 px-5 py-3 text-xs font-bold tracking-widest uppercase text-[#5A7490] border-b border-[#1E2D45]">
                            Children
                        </h2>

                        {node.children.length === 0 ? (
                            <p className="px-5 py-4 text-[#2D3E5C] text-xs tracking-widest uppercase m-0">
                                This folder has no children.
                            </p>
                        ) : (
                            <ul className="m-0 p-0 list-none">
                                {node.children.map((child) =>
                                {
                                    const childPath = buildNodePath(decodedPath, child.name);

                                    return (
                                        <li key={childPath} className="border-b border-[#1A2438] last:border-b-0">
                                            <Link
                                                to={`/tree/${childPath}`}
                                                className="flex items-center gap-3 px-5 py-2.5 no-underline text-[#A8BFCE] font-mono text-sm tracking-wide hover:bg-[#1E2D45] hover:text-[#F28C28] transition-colors"
                                            >
                                                <span className={`text-[10px] font-bold tracking-widest uppercase border px-1.5 py-0.5 ${child.type === 'folder' ? 'border-[#4755A0] text-[#4755A0]' : 'border-[#2D3E5C] text-[#3D5878]'}`}>
                                                    {child.type === 'folder' ? 'dir' : 'file'}
                                                </span>
                                                <span>{child.name}</span>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </section>
                )}
            </div>
        </main>
    );
}

type DetailItemProps = {
    label: string;
    value: string;
    mono?: boolean;
    accent?: boolean;
};

function DetailItem({ label, value, mono, accent }: DetailItemProps)
{
    return (
        <div className="flex justify-between items-baseline gap-4 py-3">
            <span className="text-xs font-bold tracking-widest uppercase text-[#5A7490] flex-shrink-0">
                {label}
            </span>
            <span className={`text-sm text-right ${mono ? 'font-mono text-[#7A90B0]' : ''} ${accent ? 'text-[#F28C28] font-bold' : 'text-[#C8D5EE]'}`}>
                {value}
            </span>
        </div>
    );
}

function ErrorCard({ message }: { message: string; })
{
    return (
        <div className="bg-[#161D2B] border border-[#1E2D45] border-l-2 border-l-[#4755A0] p-5">
            <h1 className="m-0 mb-3 text-[28px] text-[#E2EAF8] tracking-widest uppercase font-bold">Node details</h1>
            <p className="text-[#FF6B6B] text-sm tracking-wide mb-4">{message}</p>
            <Link
                to="/tree"
                className="border border-[#2D3E5C] py-2 px-4 font-semibold bg-transparent text-[#7A90B0] tracking-wider uppercase text-sm no-underline hover:border-[#F28C28] hover:text-[#F28C28] transition-colors"
            >
                Back to tree
            </Link>
        </div>
    );
}
