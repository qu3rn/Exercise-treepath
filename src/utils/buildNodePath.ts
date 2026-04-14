export const buildNodePath = (parentPath: string, nodeName: string): string =>
{
    if (!parentPath)
    {
        return nodeName;
    }

    return `${parentPath}/${nodeName}`;
};
