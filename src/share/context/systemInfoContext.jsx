import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { apiOutterShowRemoteSysStatus } from '@/api';
import { useMountedRef } from '@/share/common.js';

const remoteSysContext = createContext();

export const useRemoteSysContext = () => useContext(remoteSysContext);

const initCommonData = {
    //所有的newinner的名單
    cmrapi: null,
    //所有流程節點
    debtapi: null,

    lastUpdateTime: null,
};

function useProviderRemoteSysData() {
    const [common, setCommon] = useState(initCommonData);

    let mount = useMountedRef();

    const refreshCMR = async () => {
        let { data: cmrstatus } = await apiOutterShowRemoteSysStatus({ sysName: 'CMRAPI' });

        return cmrstatus;
    };

    const refreshDEBT = async () => {
        let { data: debtstatus } = await apiOutterShowRemoteSysStatus({ sysName: 'DEBTAPI' });
        return debtstatus;
    };

    const refreshRemote = () => {
        axios.all([refreshCMR(), refreshDEBT()]).then(
            axios.spread((d1, d2) => {
                if (mount.current) {
                    setCommon({
                        cmrapi: d1,
                        debtapi: d2,
                        lastUpdateTime: new Date(),
                    });
                }
            })
        );
    };

    useEffect(() => {
        refreshRemote();
    }, []);

    return { cmrapi: common.cmrapi, debtapi: common.debtapi, lastUpdateTime: common.lastUpdateTime, refreshRemote };
}

export function ProvideRemoteSysData({ children }) {
    const common = useProviderRemoteSysData();
    return <remoteSysContext.Provider value={common}>{children}</remoteSysContext.Provider>;
}
