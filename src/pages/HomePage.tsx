import { useState, useMemo, ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useTreeContext } from "../store/TreeContext";
import { parseTreeData } from "../utils/parseTreeData";
import EXAMPLE_JSON from "../assets/example";

export default function HomePage()
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

            dispatch({
                type: 'SET_TREE',
                payload: { tree: parsedTree },
            });

            dispatch({
                type: 'CLEAR_SEARCH',
            });

            navigate('/tree');
        } catch (err)
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

    return (
        <main className="min-h-screen py-8 px-4 bg-[#0D1117]">
            <section className="w-full max-w-[960px] mx-auto bg-[#161D2B] p-6 shadow-[0_0_0_1px_#1E2D45,0_16px_48px_rgba(0,0,0,0.6)] border-l-2 border-l-[#F28C28] border border-[#1E2D45]">
                <div className="flex justify-between gap-4 items-start mb-6 flex-wrap">
                    <div>
                        <h1 className="m-0 text-[32px] leading-[1.1] text-[#E2EAF8] tracking-widest uppercase font-bold">FileTree Explorer</h1>
                        <p className="mt-2 mb-0 text-[#5A7490] text-sm tracking-wide">
                            Paste JSON or upload a file to visualize and navigate the file tree.
                        </p>
                    </div>

                    {hasExistingTree && (
                        <button type="button" onClick={handleGoToTree} className="border border-[#2D3E5C] py-2.5 px-4 cursor-pointer font-semibold bg-transparent text-[#7A90B0] tracking-wider uppercase text-sm hover:border-[#F28C28] hover:text-[#F28C28] transition-colors">
                            Open current tree
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label htmlFor="json-input" className="font-semibold text-[#5A7490] text-xs tracking-widest uppercase">
                        JSON input
                    </label>

                    <textarea
                        id="json-input"
                        value={jsonInput}
                        onChange={handleTextareaChange}
                        spellCheck={false}
                        className="w-full min-h-[420px] p-4 border border-[#1E2D45] font-mono text-sm leading-normal resize-y bg-[#0D1117] text-[#C8D5EE] placeholder-[#2D3E5C] focus:outline-none focus:border-[#F28C28] transition-colors"
                        placeholder="Paste your JSON tree here..."
                    />

                    <div className="flex gap-3 flex-wrap items-center">
                        <label className="inline-flex items-center border border-[#2D3E5C] py-2.5 px-4 cursor-pointer font-semibold bg-transparent text-[#7A90B0] tracking-wider uppercase text-sm hover:border-[#F28C28] hover:text-[#F28C28] transition-colors">
                            Upload JSON file
                            <input
                                type="file"
                                accept="application/json,.json"
                                onChange={handleFileUpload}
                                className="hidden"
                            />
                        </label>

                        <button type="button" onClick={handleUseExample} className="border border-[#2D3E5C] py-2.5 px-4 cursor-pointer font-semibold bg-transparent text-[#7A90B0] tracking-wider uppercase text-sm hover:border-[#F28C28] hover:text-[#F28C28] transition-colors">
                            Use example
                        </button>

                        <button type="submit" className="border-0 py-2.5 px-6 cursor-pointer font-bold bg-[#F28C28] text-[#0D1117] tracking-wider uppercase text-sm hover:bg-[#FFa040] transition-colors">
                            Load tree
                        </button>
                    </div>

                    {error && (
                        <div role="alert" className="mt-1 py-3 px-[14px] bg-[#1A0D0D] text-[#FF6B6B] border border-[#5C1A1A] border-l-2 border-l-[#FF4444] text-sm tracking-wide">
                            {error}
                        </div>
                    )}
                </form>
            </section>
        </main>
    );
}
