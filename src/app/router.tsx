import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Tree from "../pages/Tree";
import NodeDetails from "../pages/NodeDetails";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/tree',
        element: <Tree />,
    },
    {
        path: '/tree/details',
        element: <NodeDetails />,
    },
]);
