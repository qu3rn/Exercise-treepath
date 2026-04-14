import { Link } from 'react-router-dom';
import type { SearchResult } from '../../types/tree';

type SearchResultsProps = {
    results: SearchResult[];
    query: string;
};

export default function SearchResults({
    results,
    query,
}: SearchResultsProps)
{
    if (!query.trim())
    {
        return null;
    }

    return (
        <section className="mt-4 bg-[#161D2B] border border-[#1E2D45]">
            <div className="flex justify-between items-center px-5 py-3 border-b border-[#1E2D45]">
                <h2 className="m-0 text-xs font-bold tracking-widest uppercase text-[#5A7490]">
                    Search results
                </h2>
                <span className="text-xs font-bold tracking-widest text-[#F28C28] uppercase">
                    {results.length} result{results.length === 1 ? '' : 's'}
                </span>
            </div>

            {results.length === 0 ? (
                <p className="px-5 py-4 m-0 text-[#2D3E5C] text-xs tracking-widest uppercase">
                    No matching files or folders found.
                </p>
            ) : (
                <ul className="m-0 p-0 list-none">
                    {results.map((result) => (
                        <li key={result.path} className="border-b border-[#1A2438] last:border-b-0">
                            <Link
                                to={`/tree/details?path=${encodeURIComponent(result.path)}`}
                                className="flex items-center gap-3 px-5 py-2.5 no-underline hover:bg-[#1E2D45] transition-colors group"
                            >
                                <span className={`text-[10px] font-bold tracking-widest uppercase border px-1.5 py-0.5 flex-shrink-0 ${result.node.type === 'folder' ? 'border-[#4755A0] text-[#4755A0]' : 'border-[#2D3E5C] text-[#3D5878]'}`}>
                                    {result.node.type === 'folder' ? 'dir' : 'file'}
                                </span>
                                <span className="text-[#A8BFCE] font-mono text-sm tracking-wide group-hover:text-[#F28C28] transition-colors">
                                    {result.node.name}
                                </span>
                                <span className="ml-auto text-[#2D3E5C] font-mono text-xs tracking-wider truncate">
                                    {result.path}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
