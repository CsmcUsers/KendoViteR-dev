import { Loader } from '@progress/kendo-react-indicators';
import { Suspense, lazy } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './share/common';
import './App.css';
import Layout from './components/Layout';
import pMinDelay from 'p-min-delay';
import Home from './pages/Home';

// 添加動畫樣式
const shimmerStyle = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
`;

if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = shimmerStyle;
    document.head.appendChild(style);
}

const loadingTime = 500;

// 路由配置
const routes = [
    { displayName: '關於我們', path: '/about', component: () => import('./pages/About') },
    { displayName: '產品', path: '/products', component: () => import('./pages/Products') },
    { displayName: '網格測試', path: '/grid-test', component: () => import('./pages/GridTest') },
    { displayName: '聯絡我們', path: '/contact', component: () => import('./pages/Contact') },
    { displayName: 'test07', path: '/test/test07', component: () => import('./pages/test/test07') },
    { displayName: 'test08', path: '/test/test08', component: () => import('./pages/test/test08') },
];

// 創建懶加載組件
const createLazyComponent = (importFunc) => {
    return lazy(() => pMinDelay(importFunc(), loadingTime));
};

const iconLoading = (
    <div
        style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            gap: '15px',
        }}
    >
        <Loader size='medium' type='converging-spinner' />
        <div style={{ fontSize: '16px', color: '#666' }}>載入中...</div>
    </div>
);

function AppContent() {
    const location = useLocation();

    return (
        <Layout>
            <Suspense key={location.pathname} fallback={iconLoading}>
                <Routes location={location}>
                    <Route
                        path={'/'}
                        element={
                            <ErrorBoundary>
                                <Home />
                            </ErrorBoundary>
                        }
                    />

                    {routes.map(({ path, component, exact, displayName }) => {
                        const Component = createLazyComponent(component);
                        return (
                            <Route
                                key={path}
                                path={exact ? '/' : path}
                                index={exact}
                                element={
                                    <ErrorBoundary>
                                        <Component displayName={displayName} />
                                    </ErrorBoundary>
                                }
                            />
                        );
                    })}
                </Routes>
            </Suspense>
        </Layout>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
