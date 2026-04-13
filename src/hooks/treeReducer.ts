import type { TreeState, TreeAction } from "../types/treeContext";
import { loadExpandedPathsFromStorage, loadSearchQueryFromStorage, loadSearchResultsFromStorage, loadTreeFromStorage } from "../utils/storage";

export const initialState: TreeState = {
    tree: loadTreeFromStorage(),
    expandedPaths: loadExpandedPathsFromStorage(),
    searchQuery: loadSearchQueryFromStorage(),
    searchResults: loadSearchResultsFromStorage(),
};

export const treeReducer = (state: TreeState, action: TreeAction): TreeState =>
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
