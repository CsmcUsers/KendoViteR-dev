import axios from 'axios';
import { assign, chain, filter, find } from 'lodash';
import { createContext, useContext, useEffect, useState } from 'react';
import {
    apiAUTHROLE_V,
    apiAuth_GetAuthByToken,
    apiDEPT,
    apiReferTitle_GetAll,
    apiFlowGetNodeDefAll,
    apiFlowGetFlowDoc,
} from '../../api';
import { getWithExpiry, handleErrorSw, setWithExpiry, useMountedRef } from '@/share/common.js';
import { urlEmp_V } from '@/share/setting.js';

const userContext = createContext();

export const useUserContext = () => useContext(userContext);

const localUserKeyCMR = 'localUserKeyCMR';

const initCommonData = {
    //所有的newinner的名單
    users: [],
    //所有流程節點
    nodeDefs: [],
    //所有newinner的auth_v
    authv: [],
    //所有單位編號
    depts: [],
    //所有流程類型
    flowtypes: [],
    //Leave System人資的職稱
    titles: [],
    //act 權限
    actAuths: [],
};

function useProviderUserData() {
    const [common, setCommon] = useState(initCommonData);

    let mount = useMountedRef();

    const refreshDEPT = async () => {
        let { data: depts } = await apiDEPT.post('GetAll').catch(handleErrorSw);

        return depts;
    };

    const getValidEmp = async () => {
        return await fetch(urlEmp_V + '/GetValidEmp', { credentials: 'include', method: 'POST' });
    };

    const getNotValidEmp = async () => {
        return await fetch(urlEmp_V + '/GetNotValidEmp', { credentials: 'include', method: 'POST' });
    };

    const refreshUsers = async () => {
        //https://github.com/axios/axios/issues/2590
        //apiEmp_V有設定header 上述文章最後有說明為什麼，建議之後使用gaxios
        //let { data: empv } = await apiEmp_V.post('GetALL').catch(handleErrorSw);

        let localUsers = getWithExpiry(localUserKeyCMR);

        if (localUsers === null) {
            console.log('getValidEmp');
            try {
                let spread = await axios.all([getValidEmp(), getNotValidEmp()]);
                let empv = spread[0];
                let empnv = spread[1];

                let empv_val = await empv.json();
                let empnv_val = await empnv.json();

                let emp_all = empv_val.concat(empnv_val);

                setWithExpiry(localUserKeyCMR, emp_all, 3600 * 1000 * 8);

                localUsers = emp_all;
            } catch (e) {
                handleErrorSw(e);
            }
        }

        return localUsers;
    };

    const refreshNodeDefs = async () => {
        try {
            let { data: nodedefs } = await apiFlowGetNodeDefAll();

            return nodedefs;
        } catch (e) {
            handleErrorSw(e);
        }
    };

    const refreshFlowTypes = async () => {
        let { data: flowtypes } = await apiFlowGetFlowDoc();
        return flowtypes;
    };

    const refreshAuth_V = async () => {
        let { data: authv } = await apiAUTHROLE_V.post('GetByFuncid', { funcId: 'D01_0008' }).catch(handleErrorSw);

        authv = chain(authv)
            .sortBy((v) => v.Dept_ID)
            .value();
        return authv;
    };

    const refreshTitle = async () => {
        let res = await apiReferTitle_GetAll();

        return res.data.map((p) => assign({ text: `${p.TitleID}/ ${p.TitleName}` }, p));
    };

    const refreshAuth = async () => {
        let { data: rauths } = await apiAuth_GetAuthByToken();
        return rauths;
    };

    useEffect(() => {
        axios
            .all([
                refreshUsers(),
                refreshNodeDefs(),
                refreshAuth_V(),
                refreshDEPT(),
                refreshFlowTypes(),
                refreshTitle(),
                refreshAuth(),
            ])
            .then(
                axios.spread((d1, d2, d3, d4, d5, d6, d7) => {
                    if (mount.current) {
                        setCommon((pre) => ({
                            ...pre,
                            authv: d3,
                            users: d1,
                            nodeDefs: d2,
                            depts: d4,
                            flowtypes: d5,
                            titles: d6,
                            actAuths: d7,
                        }));
                    }
                })
            );
    }, []);

    return {
        users: common.users,
        nodeDefs: common.nodeDefs,
        authv: common.authv,
        depts: common.depts,
        flowtypes: common.flowtypes,
        titles: common.titles,
        actAuths: common.actAuths,
        refreshUsers,
        refreshNodeDefs,
        refreshAuth_V,
        refreshDEPT,
        refreshFlowTypes,
        refreshTitle,
        refreshAuth,
    };
}

export function ProvideUserData({ children }) {
    const common = useProviderUserData();
    return <userContext.Provider value={common}>{children}</userContext.Provider>;
}

export const mapUserName = (context, uid, substr = '無此人') => {
    return find(context.users, { EMP_ID: uid })?.EMP_NAME || substr;
};

export const mapUserDept = (context, uid, substr = '無此部門') => {
    return find(context.users, { EMP_ID: uid })?.DEPT_NAME || substr;
};

export const mapNodeName = (context, func_type, nodeNum, substr = '無此站點') => {
    return find(context.nodeDefs, { Func_Type: func_type, Node_Status: nodeNum })?.Node_Name || substr;
};

export const mapNewInnerRole = (context, uid) => {
    return filter(context.authv, { Emp_ID: uid });
};

export const mapDeptName = (context, deptNo, substr = '沒有此部門或分行') => {
    return find(context.depts, { DEPT_ID: deptNo })?.DEPT_NAME || substr;
};

export const mapTitleName = (context, id, substr = '無此職稱') => {
    return find(context.titles, { TitleID: id })?.TitleName || substr;
};
