import { apiAuthInnerLogin, apiAuthLogin, apiAuth_GetToken } from '@/api';
import { handleErrorSw } from '@/share/common.js';
import { createContext, useContext, useState } from 'react';

const tokenContext = createContext();

export const useTokenContext = () => useContext(tokenContext);

const initData = {
    UseName: '未登入',
    UseID: '',
    UseEnable: false,
    Dept: '',
    DEPT_NAME: '',
    IsSupper: false,
    EMP_ID: '',
    EMP_NAME: '',
    EMP_STATUS: null,
    STATUS: '',
    DUTY_STATUS: '',
    DEPT_ID: '',
    KIND_ID: '',
    KIND_TYPE: '',
    TITLE_ID: '',
    TITLE_NAME: '',
    IS_BOSS: '',
};

function useProviderTokenData() {
    const [common, setCommon] = useState(initData);

    const refreshToken = async (p = false) => {
        try {
            let { data: token } = await apiAuth_GetToken();
            setCommon({ ...token, IsSupper: token.IsSupper && p });
            return token;
        } catch (e) {
            handleErrorSw(e);
        }
    };

    const getSupper = async () => {
        await refreshToken(true);
    };

    //使用url 登入
    const login = async (p) => {
        let { data } = await apiAuthLogin(p);

        setCommon(data);
    };

    //使用uid轉換使用者，限制已經登入某個使用的狀態下
    const innerlogin = async (p) => {
        try {
            let { data } = await apiAuthInnerLogin(p);

            setCommon(data);
        } catch (e) {
            handleErrorSw(e);
        }
    };

    const isLoggedIn = () => {
        return common.UseEnable && common.UseID;
    };

    return {
        userToken: common,
        refreshToken,
        login,
        innerlogin,
        getSupper,
        isLoggedIn,
    };
}

export function ProvideTokenData({ children }) {
    const providerData = useProviderTokenData();
    return <tokenContext.Provider value={providerData}>{children}</tokenContext.Provider>;
}
