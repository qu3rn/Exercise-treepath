import
{
    createContext,
    useContext,
    useEffect,
    useMemo,
    useReducer,
    type PropsWithChildren
} from "react";
import
{
    EXPANDED_PATHS_STORAGE_KEY,
    removeTreeFromStorage,
    saveTreeToStorage,
    SEARCH_QUERY_STORAGE_KEY,
    SEARCH_RESULTS_STORAGE_KEY
} from "../utils/storage";
import type { TreeContextValue } from "../types/treeContext";
import { useTreeReducer, initialState } from "../hooks/UseTreeReducer";

const TreeContext = createContext<TreeContextValue | null>(null);

export const TreeProvider = ({ children }: PropsWithChildren) =>
{
    const [state, dispatch] = useReducer(useTreeReducer, initialState);

    useEffect(() =>
    {
        if (state.tree)
        {
            saveTreeToStorage(state.tree);
            return;
        }

        removeTreeFromStorage();

    }, [state.tree]);

    useEffect(() =>
    {
        localStorage.setItem(EXPANDED_PATHS_STORAGE_KEY, JSON.stringify(state.expandedPaths));
    }, [state.expandedPaths]);

    useEffect(() =>
    {
        localStorage.setItem(SEARCH_QUERY_STORAGE_KEY, state.searchQuery);
    }, [state.searchQuery]);

    useEffect(() =>
    {
        localStorage.setItem(SEARCH_RESULTS_STORAGE_KEY, JSON.stringify(state.searchResults));
    }, [state.searchResults]);

    const value = useMemo(
        () => ({
            state,
            dispatch,
        }),
        [state]
    );

    return <TreeContext.Provider value={value}>{children}</TreeContext.Provider>;
};

export const useTreeContext = (): TreeContextValue =>
{
    const context = useContext(TreeContext);

    if (!context)
    {
        throw new Error('useTreeContext must be used within TreeProvider.');
    }

    return context;
};
