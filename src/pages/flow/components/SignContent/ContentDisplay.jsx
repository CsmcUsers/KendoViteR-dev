import { isEmpty, isNil } from 'lodash';
import React, { Suspense, lazy } from 'react';

// 元件映射表
const componentMap = {
    FLOWAppr: lazy(() => import('./').then(module => ({ default: module.SCApprFlow }))),
    CM01: lazy(() => import('./').then(module => ({ default: module.SCF_CM01 }))),
    Notes01: lazy(() => import('./').then(module => ({ default: module.SCF_Notes01 }))),
    Notes02: lazy(() => import('./').then(module => ({ default: module.SCF_Notes02 }))),
    Notes03: lazy(() => import('./').then(module => ({ default: module.SCF_Notes03 }))),
    Notes05: lazy(() => import('./').then(module => ({ default: module.SCF_Notes05 }))),
    Ep01: lazy(() => import('./').then(module => ({ default: module.SCF_Ep01 }))),
    Ep02: lazy(() => import('./').then(module => ({ default: module.SCF_Ep02 }))),
    Esg02: lazy(() => import('./').then(module => ({ default: module.SCF_Esg02 }))),
    Esg04: lazy(() => import('./').then(module => ({ default: module.SCF_Esg04 }))),
    Esg05: lazy(() => import('./').then(module => ({ default: module.SCF_Esg05 }))),
    Debt01: lazy(() => import('./').then(module => ({ default: module.SCF_Debt01 }))),
};

export const ContentDisplay = ({ mainData, selNode, ...props }) => {
    const funcType = selNode?.Func_type;

    if (isNil(mainData) || isEmpty(mainData)) {
        return <span style={{ color: 'red', fontSize: 16, fontWeight: 800 }}>Not Found主檔是空的</span>;
    }

    const Component = componentMap[funcType];
    
    if (!Component) {
        return <>沒有資料</>;
    }

    return (
        <Suspense fallback={<div>載入中...</div>}>
            <Component {...{ mainData, selNode, ...props }} />
        </Suspense>
    );
};
