import { useState, useMemo, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTreeContext } from "../store/TreeContext";
import { parseTreeData } from "../utils/parseTreeData";
import EXAMPLE_JSON from "../assets/example";

export function useHomeForm()
{
    const navigate = useNavigate();
    const { dispatch, state } = useTreeContext();

    const [jsonInput, setJsonInput] = useState<string>(() =>
    {
        return state.tree ? JSON.stringify(state.tree, null, 2) : EXAMPLE_JSON;
    });
    const [error, setError] = useState<string>('');

    const hasExistingTree = useMemo(() => state.tree !== null, [state.tree]);

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    {
        setJsonInput(event.target.value);

        if (error)
        {
            setError('');
        }
    };

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) =>
    {
        const file = event.target.files?.[0];

        if (!file)
        {
            return;
        }

        try
        {
            const fileContent = await file.text();
            setJsonInput(fileContent);
            setError('');
        } catch
        {
            setError('Could not read the uploaded file.');
        } finally
        {
            event.target.value = '';
        }
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>
    {
        event.preventDefault();

        try
        {
            const parsedTree = parseTreeData(jsonInput);

            dispatch({ type: 'SET_TREE', payload: { tree: parsedTree } });
            dispatch({ type: 'CLEAR_SEARCH' });

            navigate('/tree');
        }
        catch (err)
        {
            const message =
                err instanceof Error ? err.message : 'Something went wrong while parsing JSON.';
            setError(message);
        }
    };

    const handleUseExample = () =>
    {
        setJsonInput(EXAMPLE_JSON);
        setError('');
    };

    const handleGoToTree = () =>
    {
        navigate('/tree');
    };

    return {
        jsonInput,
        error,
        hasExistingTree,
        handleTextareaChange,
        handleFileUpload,
        handleSubmit,
        handleUseExample,
        handleGoToTree,
    };
}
