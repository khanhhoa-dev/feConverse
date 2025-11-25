import type { ComponentType, JSX } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { publicRoute } from './routes';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import type { LayoutProps } from './ts';
import { UserProvider } from './contexts/UserContext';
import { CartProvider } from './contexts/CartContext';

function App(): JSX.Element {
    return (
        <UserProvider>
            <CartProvider>
                <BrowserRouter
                    future={{
                        v7_relativeSplatPath: true,
                        v7_startTransition: true,
                    }}
                >
                    <Routes>
                        {publicRoute.map((route, i) => {
                            let Layout: ComponentType<LayoutProps> = DefaultLayout;
                            const Page: ComponentType = route.component;

                            if (route.layout) {
                                Layout = route.layout;
                            }
                            return (
                                <Route
                                    key={i}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </BrowserRouter>
            </CartProvider>
        </UserProvider>
    );
}

export default App;
