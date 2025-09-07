import axios from 'axios';

import { urlBonus01, urlBonus02, urlBonus03, urlBonus06, urlBonusCommon } from '@/share/setting';

axios.defaults.withCredentials = true;

export const apiBonusCommon = axios.create({ baseURL: urlBonusCommon });
export const apiBonus01 = axios.create({ baseURL: urlBonus01 });
export const apiBonus02 = axios.create({ baseURL: urlBonus02 });
export const apiBonus03 = axios.create({ baseURL: urlBonus03 });
export const apiBonus06 = axios.create({ baseURL: urlBonus06 });

export const apiBonusCommon_GetAllType = () => apiBonusCommon.post('GetAllType');
export const apiBonusCommon_GetAllStatus = () => apiBonusCommon.post('GetAllStatus');

export const apiBonus01_ParseFile = (id, type) => apiBonus01.post('ParseFile', { id: id, type: type });

export const apiBonus01_OutputData = (p) => {
    let front_env = import.meta.env.VITE_APP_TEST;
    return apiBonus01.post('OutputData', { front_env, emps: p });
};

export const apiBonus01_ParseAndInsert = ({ mid, id, type }) => apiBonus01.post('ParseAndInsert', { mid, id, type });

export const apiBonus01_GetBonusMaintByYearType = ({ yyy, type }) =>
    apiBonus01.post('GetBonusMaintByYearType', { yyy, type });

export const apiBonus01_LoadRandFromEval = ({ mid }) => apiBonus01.post('LoadRandFromEval', { mid });

export const apiBonus01_InsertBonus_Main = (p) => apiBonus01.post('InsertBonus_Main', p);

export const apiBonus01_DeleteBonusMainByMid = (p) => apiBonus01.post('DeleteBonusMainByMid', { bonus_Main: p });

export const apiBonus01_UpdateBonus_Main = (p) => apiBonus01.post('UpdateBonusMain', { bonus_Main: p });

//GetBonusMainByStatus
export const apiBonus01_GetBonusMainByStatus = (p) => apiBonus01.post('GetBonusMainByStatus', { status: p });

export const apiBonus02_GetDistByYearType = ({ yyy, type }) => apiBonus02.post('GetDistByYearType', { yyy, type });

export const apiBonus02_GetDistByMid = ({ mid }) => apiBonus02.post('GetDistByMid', { mid });

export const apiBonus02_GetCashByDept = () => apiBonus02.post('GetByDept');

export const apiBonus02_GetByMidUidDept = ({ mid, uid, deptId }) =>
    apiBonus02.post('GetByMidUidDept', { mid, uid, deptId });

export const apiBonus02_DeleteByMid = ({ mid }) => apiBonus02.post('DeleteByMid', { mid });

export const apiBonus02_UpdateCash = (p) => apiBonus02.post('UpdateCash', p);

export const apiBonus02_ParseAndInsertDist = ({ mid, fileId }) =>
    apiBonus02.post('ParseAndInsertDist', { mid, id: fileId });

export const apiBonus02_ReCalculateDeptDist = ({ mid }) => apiBonus02.post('ReCalculateDeptDist', { mid });

export const apiBonus03_GenerateDeptLvDistData = ({ mid }) => apiBonus03.post('GenerateDeptLvDistData', { mid });

export const apiBonus03_GetLvDistByMid = ({ mid }) => apiBonus03.post('GetLvDistByMid', { mid });

export const apiBonus03_SyncDeptEmpLv = ({ input }) => apiBonus03.post('SyncDeptEmpLv', { input });

export const apiBonus06_UpdateMutiCash = ({ cashs, logs }) => apiBonus06.post('UpdateMutiCash', { cashs, logs });

/**
 * 從考核系統取出的所有主管
 * @returns
 */
export const apiBonus06_GetAllLeaders = () => apiBonus06.post('GetAllLeaders');

export const apiBonus06_SubmitBonus = ({ deptId, mid }) => apiBonus06.post('SubmitDeptDist', { deptId, mid });
