import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";

function TreePage()
{
    return <div>TreePage</div>;
}

function NodeDetailsPage()
{
    return <div>NodeDetailsPage</div>;
}

export default function App()
{
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tree" element={<TreePage />} />
            <Route path="/node/:id" element={<NodeDetailsPage />} />
        </Routes>
    );
}
