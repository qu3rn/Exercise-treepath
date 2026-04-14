import { useEffect } from 'react';
import { useTreeContext } from '../store/TreeContext';
import { searchTree } from '../utils/searchTree';
import { useDebounce } from './useDebounce';

export function useTreeSearch()
{
    const { state, dispatch } = useTreeContext();

    const debouncedQuery = useDebounce(state.searchQuery, 300);

    useEffect(() =>
    {
        const results = searchTree(state.tree!, debouncedQuery);
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: { results } });
    }, [debouncedQuery]);

    const handleSearchChange = (value: string) =>
    {
        dispatch({
            type: 'SET_SEARCH_QUERY',
            payload: { query: value },
        });
    };

    const handleSearch = () =>
    {
        const results = searchTree(state.tree!, state.searchQuery);
        dispatch({ type: 'SET_SEARCH_RESULTS', payload: { results } });
    };

    const handleClearSearch = () =>
    {
        dispatch({ type: 'CLEAR_SEARCH' });
    };

    return {
        searchQuery: state.searchQuery,
        searchResults: state.searchResults,
        handleSearchChange,
        handleSearch,
        handleClearSearch,
    };
}
