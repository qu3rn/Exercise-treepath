import type { TreeState, TreeAction } from "../types/treeContext";
import type { TreeNode } from "../types/tree";
import { loadExpandedPathsFromStorage, loadSearchQueryFromStorage, loadSearchResultsFromStorage, loadTreeFromStorage } from "../utils/storage";

const getAllFolderPaths = (node: TreeNode, parentPath = ''): string[] =>
{
    const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;

    if (node.type !== 'folder')
    {
        return [];
    }

    return [
        currentPath,
        ...node.children.flatMap((child) => getAllFolderPaths(child, currentPath)),
    ];
};

export const initialState: TreeState = {
    tree: loadTreeFromStorage(),
    expandedPaths: loadExpandedPathsFromStorage(),
    searchQuery: loadSearchQueryFromStorage(),
    searchResults: loadSearchResultsFromStorage(),
};

export const useTreeReducer = (state: TreeState, action: TreeAction): TreeState =>
{
    switch (action.type)
    {
        case 'SET_TREE': {
            return {
                ...state,
                tree: action.payload.tree,
                expandedPaths: [action.payload.tree.name],
                searchQuery: '',
                searchResults: [],
            };
        }

        case 'TOGGLE_EXPANDED': {
            const { path } = action.payload;
            const isExpanded = state.expandedPaths.includes(path);

            return {
                ...state,
                expandedPaths: isExpanded
                    ? state.expandedPaths.filter((item) => item !== path)
                    : [...state.expandedPaths, path],
            };
        }

        case 'EXPAND_ALL': {
            return {
                ...state,
                expandedPaths: state.tree ? getAllFolderPaths(state.tree) : [],
            };
        }

        case 'COLLAPSE_ALL': {
            return {
                ...state,
                expandedPaths: [],
            };
        }

        case 'SET_SEARCH_QUERY': {
            return {
                ...state,
                searchQuery: action.payload.query,
            };
        }

        case 'SET_SEARCH_RESULTS': {
            return {
                ...state,
                searchResults: action.payload.results,
            };
        }

        case 'CLEAR_SEARCH': {
            return {
                ...state,
                searchQuery: '',
                searchResults: [],
            };
        }

        case 'RESET_TREE': {
            return {
                tree: null,
                expandedPaths: [],
                searchQuery: '',
                searchResults: [],
            };
        }

        default: {
            return state;
        }
    }
};
