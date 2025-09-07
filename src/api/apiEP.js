import axios from 'axios';

import { urlEP } from '@/share/setting';

axios.defaults.withCredentials = true;

export const apiEP = axios.create({ baseURL: urlEP });

// ----- TB_EP_Main -----
export const apiEP_GetEPMain = ({ CaseID, CompID, Flow_Status, CreateDeptID, ...others }) =>
    apiEP.post('GetEPMain', { CaseID, CompID, Flow_Status, CreateDeptID, ...others });

// 取指定單位下 所有尚未結案 & 近兩周內結案 的資料
export const apiEP_GetEPMain02 = ({ DeptID }) => apiEP.post('GetEPMain02', { DeptID });

// 取指定統編下 已結案 且 符合赤道原則 的資料
export const apiEP_GetEPMain03 = ({ CompID }) => apiEP.post('GetEPMain03', { CompID });

// for 查詢
export const apiEP_GetEPMain99 = (p) => apiEP.post('GetEPMain99', p);

export const apiEP_InsertEPMain = (data) => apiEP.post('InsertEPMain', data);

export const apiEP_UpdateEPMain = (data) => apiEP.post('UpdateEPMain', data);

// 清除第一頁下方欄位值
export const apiEP_ClearEPMain_P1 = ({ CaseID, IsSpCase01 }) => apiEP.post('ClearEPMain_P1', { CaseID, IsSpCase01 });

// 清空第二頁欄位值
export const apiEP_ClearEPMain_P2 = ({ CaseID }) => apiEP.post('ClearEPMain_P2', { CaseID });

// 清空第三頁欄位值
export const apiEP_ClearEPMain_P3 = ({ CaseID }) => apiEP.post('ClearEPMain_P3', { CaseID });

export const apiEP_CancelEPMain = (data) => apiEP.post('CancelEPMain', data);

export const apiEP_DelEPMainByCaseID = (data) => apiEP.post('DelEPMainByCaseID', data);
// ----------------------------

// ----- TB_EP_RiskInfo_A -----
export const apiEP_GetEPRiskInfo = ({ CaseID }) => apiEP.post('GetEPRiskInfo', { CaseID });

export const apiEP_InsertEPRiskInfo = (data) => apiEP.post('InsertEPRiskInfo', data);

export const apiEP_DelEPRiskInfoByCaseID = (data) => apiEP.post('DelEPRiskInfoByCaseID', data);
// ----------------------------

// ----- TB_EP_Main_After -----
export const apiEP_GetEPMainAfter = ({ CaseID, CaseID_2, Flow_Status, CreateDeptID, ...others }) =>
    apiEP.post('GetEPMainAfter', { CaseID, CaseID_2, Flow_Status, CreateDeptID, ...others });

export const apiEP_GetEPMainAfterOrderByDate = ({ CaseID, CaseID_2, Flow_Status, CreateDeptID, ...others }) =>
    apiEP.post('GetEPMainAfterOrderByDate', { CaseID, CaseID_2, Flow_Status, CreateDeptID, ...others });

// 取指定單位下 所有尚未結案 & 近兩周內結案 的資料
export const apiEP_GetEPMainAfter02 = ({ DeptID }) => apiEP.post('GetEPMainAfter02', { DeptID });

export const apiEP_InsertEPMainAfter = (data) => apiEP.post('InsertEPMainAfter', data);

export const apiEP_UpdateEPMainAfter = (data) => apiEP.post('UpdateEPMainAfter', data);

export const apiEP_CancelEPMainAfter = (data) => apiEP.post('CancelEPMainAfter', data);

export const apiEP_DelEPMainAfterByCaseID2 = (data) => apiEP.post('DelEPMainAfterByCaseID2', data);
// ----------------------------

// ----- TB_EP_Main_After_Items -----
export const apiEP_GetEPMainAfterItems = ({ SNo, CaseID_2, ItemType, ...others }) =>
    apiEP.post('GetEPMainAfterItems', { SNo, CaseID_2, ItemType, ...others });

export const apiEP_InsertEPMainAfterItems = (data) => apiEP.post('InsertEPMainAfterItems', data);

export const apiEP_UpdateEPMainAfterItems = (data) => apiEP.post('UpdateEPMainAfterItems', data);

export const apiEP_DelEPMainAfterItems = ({ SNo }) => apiEP.post('DelEPMainAfterItems', { SNo });

export const apiEP_DelEPMainAfterItemsByCaseID2 = (data) => apiEP.post('DelEPMainAfterItemsByCaseID2', data);

export const apiEP_UpdateEPMainAfterItems_Key = ({ OldCaseID2, NewCaseID2, CreateUid }) =>
    apiEP.post('UpdateEPMainAfterItems_Key', { OldCaseID2, NewCaseID2, CreateUid });
// ----------------------------

// ----- 其他 -----
export const apiEP_GetPersonByCond = ({ DeptID }) => apiEP.post('GetPersonByCond', { DeptID });
// ---------------
