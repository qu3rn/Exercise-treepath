import type { Dispatch } from "react";
import type { TreeNode, SearchResult } from "./tree";

export type TreeState = {
    tree: TreeNode | null;
    expandedPaths: string[];
    searchQuery: string;
    searchResults: SearchResult[];
};

export type TreeContextValue = {
    state: TreeState;
    dispatch: Dispatch<TreeAction>;
};

export type SetTreePayload = {
    tree: TreeNode;
};

export type SetExpandedPayload = {
    path: string;
};

export type SetSearchQueryPayload = {
    query: string;
};

export type SetSearchResultsPayload = {
    results: SearchResult[];
};

export type ClearSearchPayload = undefined;

export type TreeAction =
    | { type: 'SET_TREE'; payload: SetTreePayload; }
    | { type: 'TOGGLE_EXPANDED'; payload: SetExpandedPayload; }
    | { type: 'SET_SEARCH_QUERY'; payload: SetSearchQueryPayload; }
    | { type: 'SET_SEARCH_RESULTS'; payload: SetSearchResultsPayload; }
    | { type: 'CLEAR_SEARCH'; payload?: ClearSearchPayload; }
    | { type: 'RESET_TREE'; };
