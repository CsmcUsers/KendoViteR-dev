import { apiAuthGetFunctionAll } from '@/api';
import { ErrorBoundary } from '@/components/common-component';
import { Button } from '@progress/kendo-react-buttons';
import { Loader } from '@progress/kendo-react-indicators';
import _ from 'lodash';
import pMinDelay from 'p-min-delay';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import { LoginPage } from './components/login';
import Home from './pages/Home';
import { ProvideFlowData, ProvideUserData, useTokenContext } from './share/context';

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
    { displayName: '待簽核清單', path: '/flow/flow01', component: () => import('./pages/flow/Flow01/Flow01') },
    { displayName: '已簽核清單', path: '/flow/flow02', component: () => import('./pages/flow/Flow02/Flow02') },
    { displayName: '被退回清單', path: '/flow/flow04', component: () => import('./pages/flow/Flow04/Flow04') },
    { displayName: 'test07', path: '/test/test07', component: () => import('./pages/test/test07') },
    { displayName: 'test08', path: '/test/test08', component: () => import('./pages/test/test08') },
    { displayName: 'appr01', path: '/appr/appr01', component: () => import('./pages/appr/appr_01/appr_01') },
    { displayName: 'appr02', path: '/appr/appr02', component: () => import('./pages/appr/appr_02/appr_02') },
    { displayName: 'appr03', path: '/appr/appr03', component: () => import('./pages/appr/appr_03/appr_03') },
    { displayName: 'appr04', path: '/appr/appr04', component: () => import('./pages/appr/appr_04/appr_04') },
    { displayName: 'appr05', path: '/appr/appr05', component: () => import('./pages/appr/appr_05/appr_05') },
    { displayName: 'appr06', path: '/appr/appr06', component: () => import('./pages/appr/appr_06/appr_06') },
    { displayName: 'appr08', path: '/appr/appr08', component: () => import('./pages/appr/appr_08/appr_08') },
    { displayName: 'appr09', path: '/appr/appr09', component: () => import('./pages/appr/appr_09/appr_09') },
    { displayName: 'appr10', path: '/appr/appr10', component: () => import('./pages/appr/appr_10/appr_10') },
    { displayName: 'appr11', path: '/appr/appr11', component: () => import('./pages/appr/appr_11/appr_11') },
    { displayName: 'appr12', path: '/appr/appr12', component: () => import('./pages/appr/appr_12/appr_12') },
    { displayName: 'appr13', path: '/appr/appr13', component: () => import('./pages/appr/appr_13/appr_13') },
    { displayName: 'appr14', path: '/appr/appr14', component: () => import('./pages/appr/appr_14/appr_14') },
    { displayName: 'appr15', path: '/appr/appr15', component: () => import('./pages/appr/appr_15/appr_15') },
    { displayName: 'appr16', path: '/appr/appr16', component: () => import('./pages/appr/appr_16/appr_16') },
    { displayName: 'appr17', path: '/appr/appr17', component: () => import('./pages/appr/appr_17/appr_17') },
    { displayName: 'appr18', path: '/appr/appr18', component: () => import('./pages/appr/appr_18/appr_18') },
    { displayName: 'appr19', path: '/appr/appr19', component: () => import('./pages/appr/appr_19/appr_19') },
    { displayName: 'appr20', path: '/appr/appr20', component: () => import('./pages/appr/appr_20/appr_20') },
    { displayName: 'appr21', path: '/appr/appr21', component: () => import('./pages/appr/appr_21/appr_21') },
    { displayName: 'appr22', path: '/appr/appr22', component: () => import('./pages/appr/appr_22/appr_22') },
    { displayName: 'appr23', path: '/appr/appr23', component: () => import('./pages/appr/appr_23/appr_23') },
    { displayName: 'appr24', path: '/appr/appr24', component: () => import('./pages/appr/appr_24/appr_24') },
    { displayName: 'appr25', path: '/appr/appr25', component: () => import('./pages/appr/appr_25/appr_25') },
    { displayName: 'appr26', path: '/appr/appr26', component: () => import('./pages/appr/appr_26/appr_26') },
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

    const { refreshToken, userToken } = useTokenContext();

    const [pageData, setPageData] = useState({
        funcData: [],
        sidemenu: [],
    });

    const refresh = async () => {
        let token = await refreshToken();

        if (_.isEmpty(token?.UseID)) {
            return;
        }

        try {
            let { data: funcs } = await apiAuthGetFunctionAll();
            //只要path 有值就是畫面
            let eleList = _.filter(funcs, (p) => {
                return p.Path !== '' && p.Disable !== true;
            });

            setPageData({
                funcData: eleList.map((v) =>
                    //排除主節點
                    _.assign(
                        {
                            pathname: v.FuncName,
                            path: v.Path,
                        },
                        v
                    )
                ),
                sidemenu: _.filter(funcs, (p) => {
                    return p.Disable !== true;
                }),
            });
        } catch (error) {
            handleErrorSw(error);
        }
    };

    useEffect(() => {
        refresh();
    }, [userToken?.UseID]);

    return (
        <Layout data={pageData.sidemenu}>
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

                    <Route
                        path='/NoAuth'
                        element={
                            <div className='flex flex-col items-center justify-center min-h-[60vh] p-8'>
                                <div className='text-6xl mb-6'>🚫</div>
                                <h1 className='text-3xl font-bold text-gray-800 mb-4'>沒有權限</h1>
                                <p className='text-gray-600 text-center mb-8 max-w-md'>
                                    您沒有訪問此頁面的權限，請聯絡管理員或返回首頁。
                                </p>
                                <Button
                                    onClick={() => (window.location.href = '/')}
                                    className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                                >
                                    返回首頁
                                </Button>
                            </div>
                        }
                    />
                    <Route
                        path='*'
                        element={
                            <div className='flex flex-col items-center justify-center min-h-[60vh] p-8'>
                                <div className='text-6xl mb-6'>💭</div>
                                <h1 className='text-3xl font-bold text-gray-800 mb-4'>404 - 找不到頁面</h1>
                                <p className='text-gray-600 text-center mb-8 max-w-md'>
                                    您訪問的頁面不存在，可能已被移動或刪除。
                                </p>
                                <Button
                                    onClick={() => (window.location.href = '/')}
                                    className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                                >
                                    返回首頁
                                </Button>
                            </div>
                        }
                    />
                </Routes>
            </Suspense>
        </Layout>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/login/*' element={<LoginPage />} />
                <Route
                    path='/*'
                    element={
                        <ProvideUserData>
                            <ProvideFlowData>
                                <AppContent />
                            </ProvideFlowData>
                        </ProvideUserData>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
