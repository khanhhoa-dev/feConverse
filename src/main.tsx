import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import GlobalStyles from './components/GlobalStyles.tsx';
import 'antd/dist/reset.css';
import './styles/global.scss';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GlobalStyles>
            <App />
        </GlobalStyles>
    </StrictMode>
);
