import type { ComponentType, JSX } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { publicRoute } from './routes';
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout';
import type { LayoutProps } from './ts';

function App(): JSX.Element {
    return (
        <BrowserRouter>
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
    );
}

export default App;
