import React, { createContext, useContext, useState } from 'react';
import { handleErrorSw } from '@/share/common';
import { apiFlowGetFlowLogtoSign, apiFlowGetFlowSheetByUid } from '@/api';
import moment from 'dayjs';
import { chain, uniqWith } from 'lodash';
import { serv_flow_GetSignedList } from '@/service';
import { _common_ignore_notify } from '@/data/result';

const flowContext = createContext();

/**
 *
 * @returns {
 *      flowData: {signlist,signedlist },
 *      refreshFlowData,
 * }
 */
export const useFlowContext = () => useContext(flowContext);

let initData = {
    //待簽核清單
    signlist: [],
    //已簽核清單
    signedlist: [],
    //被退回的申請
    returnlist: [],
};

//新的被退件統計方式
const newStartReturnDate = '2024-02-17';

function useProviderTokenData() {
    const [common, setCommon] = useState(initData);

    const refreshFlowData = async () => {
        try {
            let { data: signlist } = await apiFlowGetFlowLogtoSign({
                timePeriod: {
                    start: null,
                    end: null,
                },
                funcType: null,
                status: null,
            });

            let tosignlist = chain(signlist)
                .filter((p) => p.Next_flow_status !== -1)
                .filter((p) => !_common_ignore_notify.includes(p.Func_type))
                .value();

            let signedlist = await serv_flow_GetSignedList(
                {
                    timePeriod: {
                        start: moment().format('YYYY-MM-DD'),
                        end: moment().format('YYYY-MM-DD'),
                    },
                    funcType: null,
                    status: null,
                },
                {}
            );
            signedlist = uniqWith(signedlist, (a, b) => a.Func_PK === b.Func_PK && a.Func_str_PK === b.Func_str_PK);

            let { data: returnlist } = await apiFlowGetFlowSheetByUid({
                timePeriod: { start: newStartReturnDate, end: null },
                status: -1,
            });

            returnlist = uniqWith(returnlist, (a, b) => a.Func_PK === b.Func_PK && a.Func_str_PK === b.Func_str_PK);

            setCommon((pre) => ({ ...pre, signlist: tosignlist, signedlist, returnlist }));
        } catch (e) {
            handleErrorSw(e);
        }
    };

    return {
        flowData: common,
        refreshFlowData,
    };
}

export function ProvideFlowData({ children }) {
    const providerData = useProviderTokenData();
    return <flowContext.Provider value={providerData}>{children}</flowContext.Provider>;
}
