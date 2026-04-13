/**
 * Formats a file size in bytes to a readable string.
 * @param size - The size in bytes
 * @returns The formatted size string (B, KB, or MB)
 */
export const formatSize = (size: number): string =>
{
    if (size < 1024)
    {
        return `${size} B`;
    };

    if (size < 1024 * 1024)
    {
        return `${(size / 1024).toFixed(2)} KB`;
    };
    
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};
