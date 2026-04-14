type DetailItemProps = {
    label: string;
    value: string;
    mono?: boolean;
    accent?: boolean;
};

export default function DetailItem({ label, value, mono, accent }: DetailItemProps)
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
