import { useTreeContext } from '../../store/TreeContext';

export default function TreeToolbar()
{
    const { dispatch } = useTreeContext();

    return (
        <div className="flex gap-2">
            <button
                type="button"
                onClick={() => dispatch({ type: 'EXPAND_ALL' })}
                className="border border-[#2D3E5C] py-2.5 px-4 cursor-pointer font-semibold bg-transparent text-[#7A90B0] tracking-wider uppercase text-sm hover:border-[#F28C28] hover:text-[#F28C28] transition-colors"
            >
                Expand all
            </button>

            <button
                type="button"
                onClick={() => dispatch({ type: 'COLLAPSE_ALL' })}
                className="border border-[#2D3E5C] py-2.5 px-4 cursor-pointer font-semibold bg-transparent text-[#7A90B0] tracking-wider uppercase text-sm hover:border-[#F28C28] hover:text-[#F28C28] transition-colors"
            >
                Collapse all
            </button>
        </div>
    );
}
