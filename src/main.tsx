import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App.tsx';
import 'antd/dist/reset.css';
import './styles/global.scss';
import { store, persistor } from './stores/store.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </StrictMode>
);
