import { Link, Navigate } from 'react-router-dom';
import { useTreeContext } from '../store/TreeContext';
import TreeSection from '../components/tree/TreeSection';
import TreeToolbar from '../components/tree/TreeToolbar';
import SearchBar from '../components/search/SearchBar';
import SearchResults from '../components/search/SearchResults';
import { useTreeSearch } from '../hooks/useTreeSearch';

export default function Tree()
{
    const { state } = useTreeContext();
    const {
        searchQuery,
        searchResults,
        handleSearchChange,
        handleSearch,
        handleClearSearch,
    } = useTreeSearch();

    if (!state.tree)
    {
        return <Navigate to="/" replace />;
    }

    return (
        <main className="min-h-screen py-8 px-4 bg-[#0D1117]">
            <div className="w-full max-w-[960px] mx-auto">
                <section className="flex justify-between items-start gap-4 flex-wrap mb-6 pb-4 border-b border-[#1E2D45]">
                    <div>
                        <h1 className="m-0 text-[28px] leading-[1.1] text-[#E2EAF8] tracking-widest uppercase font-bold">
                            Tree view
                        </h1>
                        <p className="mt-2 mb-0 text-[#5A7490] text-sm tracking-wide">
                            Browse folders, expand nodes, and open file or folder details.
                        </p>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <TreeToolbar />

                        <Link
                            to="/"
                            className="border border-[#2D3E5C] py-2.5 px-4 font-semibold bg-transparent text-[#7A90B0] tracking-wider uppercase text-sm no-underline hover:border-[#F28C28] hover:text-[#F28C28] transition-colors"
                        >
                            Back to input
                        </Link>
                    </div>
                </section>

                <section className='w-full flex justify-between items-start gap-4 flex-wrap mb-6 pb-4 border-b border-[#1E2D45]'>
                    <SearchBar
                        initialValue={searchQuery}
                        onChange={handleSearchChange}
                        onSearch={handleSearch}
                        onClear={handleClearSearch}
                    />
                </section>

                <SearchResults
                    query={searchQuery}
                    results={searchResults}
                />

                <div className="bg-[#161D2B] border border-[#1E2D45] border-l-2 border-l-[#4755A0] p-4">
                    <TreeSection root={state.tree} />
                </div>
            </div>
        </main>
    );
}
