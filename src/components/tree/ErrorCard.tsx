import { Link } from "react-router-dom";

export default function ErrorCard({ message }: { message: string; })
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
