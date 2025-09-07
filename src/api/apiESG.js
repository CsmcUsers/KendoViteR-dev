import axios from 'axios';

import { urlESGComp, urlESGExtEvent, urlESGRiskLevel, urlEsg03 } from '@/share/setting';

axios.defaults.withCredentials = true;

export const apiESGComp = axios.create({ baseURL: urlESGComp });
export const apiEsg03 = axios.create({ baseURL: urlEsg03 });
export const apiESGRiskLv = axios.create({ baseURL: urlESGRiskLevel });
export const apiESGExtEvent = axios.create({ baseURL: urlESGExtEvent });

// ----- TB_ESG_Comp_Main -----
// 取指定compID最近一次已結案的資料
export const apiESGComp_GetESGCompMainByCompID = ({ CompID }) => apiESGComp.post('GetESGCompMainByCompID', { CompID });

// 取指定compID目前仍在簽核中的資料
export const apiESGComp_GetESGCompMainByCompIDUndone = ({ CompID, ExCaseID }) =>
    apiESGComp.post('GetESGCompMainByCompIDUndone', { CompID, ExCaseID });

// 取指定單位下所有尚未結案的資料
export const apiESGComp_GetESGCompMainByDeptID = ({ CreateDeptID }) =>
    apiESGComp.post('GetESGCompMainByDeptID', { CreateDeptID });

// 取指定單位下 所有尚未結案 & 近兩周內結案 的資料
export const apiESG_GetESGList02 = ({ DeptID }) => apiESGComp.post('GetESGList02', { DeptID });

export const apiESGComp_GetESGCompMain = ({ CaseID, CompID, Flow_Status, CreateDeptID, ...others }) =>
    apiESGComp.post('GetESGCompMain', { CaseID, CompID, Flow_Status, CreateDeptID, ...others });

export const apiESGComp_InsertESGCompMain = (data) => apiESGComp.post('InsertESGCompMain', data);

export const apiESGComp_UpdateESGCompMain = (data) => apiESGComp.post('UpdateESGCompMain', data);

// 作廢
export const apiESGComp_CancelESGCompMain = (data) => apiESGComp.post('CancelESGCompMain', data);

export const apiESGComp_DeleteESGCompMainByCaseID = (data) => apiESGComp.post('DeleteESGCompMainByCaseID', data);

export const apiEsg03_GetByCond = (p) => apiEsg03.post('GetESGByCond', p);

export const apiEsg03_GetRiskLvl = (p) => apiEsg03.post('GetESGRiskLevelByCond', p);

export const apiEsg03_GetExtEvt = (p) => apiEsg03.post('GetESGExtEventByCond', p);
// --------------------------------------

// ----- TB_ESG_Comp_PenaltyCase -----
export const apiESGComp_GetESGCompPntCase = ({ CaseID }) => apiESGComp.post('GetESGCompPntCase', { CaseID });

export const apiESGComp_InsertESGCompPntCase = (data) => apiESGComp.post('InsertESGCompPntCase', data);

export const apiESGComp_UpdateESGCompPntCase = (data) => apiESGComp.post('UpdateESGCompPntCase', data);

export const apiESGComp_DeleteESGCompPntCase = ({ SNo }) => apiESGComp.post('DeleteESGCompPntCase', { SNo });

export const apiESGComp_DeleteESGCompPntCaseByCaseID = (data) => apiESGComp.post('DeleteESGCompPntCaseByCaseID', data);

export const apiESGComp_CopyESGCompPntCase = ({ oldCaseID, newCaseID }) =>
    apiESGComp.post('CopyESGCompPntCase', { oldCaseID, newCaseID });
// --------------------------------------

// ----- TB_ESG_Comp_LocationAnalyze -----
export const apiESGComp_GetESGCompLocAna = ({ CaseID }) => apiESGComp.post('GetESGCompLocAna', { CaseID });

export const apiESGComp_InsertESGCompLocAna = (data) => apiESGComp.post('InsertESGCompLocAna', data);

export const apiESGComp_UpdateESGCompLocAna = (data) => apiESGComp.post('UpdateESGCompLocAna', data);

export const apiESGComp_DeleteESGCompLocAna = ({ SNo }) => apiESGComp.post('DeleteESGCompLocAna', { SNo });

export const apiESGComp_DeleteESGCompLocAnaByCaseID = (data) => apiESGComp.post('DeleteESGCompLocAnaByCaseID', data);

export const apiESGComp_CopyESGCompLocAna = ({ oldCaseID, newCaseID }) =>
    apiESGComp.post('CopyESGCompLocAna', { oldCaseID, newCaseID });
// --------------------------------------

// ----- TB_ESG_Comp_ClimateImpact -----
export const apiESGComp_GetESGCompCliImp = ({ CaseID }) => apiESGComp.post('GetESGCompCliImp', { CaseID });

export const apiESGComp_InsertESGCompCliImp = (data) => apiESGComp.post('InsertESGCompCliImp', data);

export const apiESGComp_UpdateESGCompCliImp = (data) => apiESGComp.post('UpdateESGCompCliImp', data);

export const apiESGComp_DeleteESGCompCliImp = ({ SNo }) => apiESGComp.post('DeleteESGCompCliImp', { SNo });

export const apiESGComp_DeleteESGCompCliImpByCaseID = (data) => apiESGComp.post('DeleteESGCompCliImpByCaseID', data);

export const apiESGComp_CopyESGCompCliImp = ({ oldCaseID, newCaseID }) =>
    apiESGComp.post('CopyESGCompCliImp', { oldCaseID, newCaseID });
// --------------------------------------

// ----- TB_ESG_Comp_EconActivity -----
export const apiESGComp_GetESGCompEconAct = ({ CaseID }) => apiESGComp.post('GetESGCompEconAct', { CaseID });

export const apiESGComp_InsertESGCompEconAct = (data) => apiESGComp.post('InsertESGCompEconAct', data);

export const apiESGComp_UpdateESGCompEconAct = (data) => apiESGComp.post('UpdateESGCompEconAct', data);

export const apiESGComp_DeleteESGCompEconAct = ({ SNo }) => apiESGComp.post('DeleteESGCompEconAct', { SNo });

export const apiESGComp_DeleteESGCompEconActByCaseID = (data) => apiESGComp.post('DeleteESGCompEconActByCaseID', data);

export const apiESGComp_CopyESGCompEconAct = ({ oldCaseID, newCaseID }) =>
    apiESGComp.post('CopyESGCompEconAct', { oldCaseID, newCaseID });
// --------------------------------------

// ----- TB_ESG_RiskLevel -----
// 取指定單位下 所有尚未結案 & 近兩周內結案 的資料
export const apiESG_GetESGList04 = ({ DeptID }) => apiESGRiskLv.post('GetESGList04', { DeptID });

export const apiESG_GetESGRiskLevel = ({ ID, CompID, Flow_Status, CreateDeptID, ...others }) =>
    apiESGRiskLv.post('GetESGRiskLevel', { ID, CompID, Flow_Status, CreateDeptID, ...others });

export const apiESG_InsertESGRiskLevel = (data) => apiESGRiskLv.post('InsertESGRiskLevel', data);

export const apiESG_UpdateESGRiskLevel = (data) => apiESGRiskLv.post('UpdateESGRiskLevel', data);

export const apiESG_CancelESGRiskLevel = (data) => apiESGRiskLv.post('CancelESGRiskLevel', data);

export const apiESG_DeleteESGRiskLevelByID = ({ ID }) => apiESGRiskLv.post('DeleteESGRiskLevelByID', { ID });
// --------------------------------------

// ----- TB_ESG_ExtEvent -----
// 取指定單位下 所有尚未結案 & 近兩周內結案 的資料
export const apiESG_GetESGList05 = ({ DeptID }) => apiESGExtEvent.post('GetESGList05', { DeptID });

export const apiESG_GetESGExtEvent = ({ ID, CompID, Flow_Status, CreateDeptID, ...others }) =>
    apiESGExtEvent.post('GetESGExtEvent', { ID, CompID, Flow_Status, CreateDeptID, ...others });

export const apiESG_InsertESGExtEvent = (data) => apiESGExtEvent.post('InsertESGExtEvent', data);

export const apiESG_UpdateESGExtEvent = (data) => apiESGExtEvent.post('UpdateESGExtEvent', data);

export const apiESG_CancelESGExtEvent = (data) => apiESGExtEvent.post('CancelESGExtEvent', data);

export const apiESG_DeleteESGExtEventByID = ({ ID }) => apiESGExtEvent.post('DeleteESGExtEventByID', { ID });
// --------------------------------------
