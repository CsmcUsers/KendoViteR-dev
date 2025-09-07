import { ProvideTokenData } from '@/share/context';
import '@progress/kendo-theme-material/dist/all.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <ProvideTokenData>
            <App />
        </ProvideTokenData>
    </StrictMode>
);
