import type { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

type SearchBarProps = {
    initialValue?: string;
    onChange: (query: string) => void;
    onSearch: (query: string) => void;
    onClear: () => void;
};

export default function SearchBar({
    initialValue = '',
    onChange,
    onSearch,
    onClear,
}: SearchBarProps)
{
    const [value, setValue] = useState(initialValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    {
        setValue(event.target.value);
        onChange(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();
        onSearch(value);
    };

    const handleClear = () =>
    {
        setValue('');
        onClear();
    };

    return (
        <form onSubmit={handleSubmit} className="w-full flex gap-2 items-stretch">
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Search by file or folder name..."
                className="w-100% flex-1 px-4 py-2.5 bg-[#0D1117] border border-[#1E2D45] text-[#C8D5EE] font-mono text-sm tracking-wide placeholder-[#2D3E5C] focus:outline-none focus:border-[#F28C28] transition-colors"
            />

            <button type="submit" className="border-0 px-5 py-2.5 cursor-pointer font-bold bg-[#F28C28] text-[#0D1117] tracking-wider uppercase text-sm hover:bg-[#FFa040] transition-colors">
                Search
            </button>

            <button type="button" onClick={handleClear} className="border border-[#2D3E5C] px-4 py-2.5 cursor-pointer font-semibold bg-transparent text-[#7A90B0] tracking-wider uppercase text-sm hover:border-[#F28C28] hover:text-[#F28C28] transition-colors">
                Clear
            </button>
        </form>
    );
}
