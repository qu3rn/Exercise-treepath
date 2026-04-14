type EmptyStateProps = {
    message: string;
    className?: string;
};

export default function EmptyState({ message, className = '' }: EmptyStateProps)
{
    return (
        <p className={`text-[#2D3E5C] text-xs tracking-widest uppercase m-0 py-3 px-3 ${className}`}>
            {message}
        </p>
    );
}
