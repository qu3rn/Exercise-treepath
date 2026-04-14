import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Tree from "../pages/Tree";
import NodeDetails from "../pages/NodeDetails";

export default function App()
{
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tree" element={<Tree />} />
            {/* <Route path="/tree/:nodePath" element={<NodeDetailsPage />} /> */}
            <Route path="/tree/details" element={<NodeDetails />} />
        </Routes>
    );
}
