import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import './styles/index.css';
import { TreeProvider } from './store/TreeContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <TreeProvider>
                <App />
            </TreeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
