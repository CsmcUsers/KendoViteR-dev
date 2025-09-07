import axios from 'axios';
import { urlFlow, urlPublicFlow } from '@/share/setting';

axios.defaults.withCredentials = true;

export const apiFlow = axios.create({ baseURL: urlFlow });

export const apiPublicFlow = axios.create({ baseURL: urlPublicFlow });

export const apiFlowGet_FlowLogByID = ({ node }) => apiFlow.post('Get_FlowLogByID', { node });
export const apiFlowGet_FlowLogByIDV2 = ({ node }) => apiFlow.post('Get_FlowLogByIDV2', { node });

export const apiPublicFlowGet_FlowLogByID = ({ node }) => apiPublicFlow.post('Get_FlowLogByID', { node });

export const apiFlowGetNodeDef = ({ funcType }) => apiFlow.post('GetNodeDef', { funcType });

export const apiFlowGetNodeDefAll = () => apiFlow.post('GetNodeDefAll');

export const apiFlowGetNextInfo = (maindata, funcType, node = null) =>
    apiFlow.post('GetNextFlowInfo', { maindata, Func_type: funcType, node });

export const apiFlowStart = (maindata, funcType, nextInfo) =>
    apiFlow.post('FlowStart', { maindata, node: { Func_type: funcType }, nextInfo });

export const apiFlowGetLogBySheetId = (sheetId) => apiFlow.post('GetBySheetId', { sheetId });

export const apiFlowGetFlowLogtoSign = ({ funcType, timePeriod, status, funcTypeCon }) =>
    apiFlow.post('GetFlowLogtoSign', { funcType, timePeriod, status, funcTypeCon });

export const apiFlowGetAllFlowToSign = (p) => apiFlow.post('GetAlltoSign', p);

export const apiFlowTrans = (maindata, node, memo, nextInfo = null) =>
    apiFlow.post('Trans', { maindata, node, memo, nextInfo });

export const apiFlowReject = ({ maindata, node, memo }) =>
    apiFlow.post('Reject', {
        maindata,
        node,
        memo,
    });

export const apiFlowTakeBack = ({ maindata, node }) => apiFlow.post('TakeBack', { maindata, node });

export const apiFlowGetHit = (maindata, node) => apiFlow.post('GetHit', { maindata, node });

export const apiFlowGetFlowSheet = ({ timePeriod: { start, end }, funcType, status }) =>
    apiFlow.post('GetFlowSheet', { timePeriod: { start, end }, funcType, status });

/**
 * 取所有待簽核資料
 *{FLOWAppr, "考核成績" },
 *{CM01, "合約建立" },
 *{Notes01, "中心端末主機登記" },
 *{Notes02, "電腦作業工作申請" },
 *{Notes03, "媒體出入庫使用情形" },
 *{Notes05, "密碼單月審核" }
 */
export const apiFlowGetFlowDoc = () => apiFlow.post('GetFlowdoc');

export const apiFlowGetStartTrans = ({ funcType, timePeriod, status }) =>
    apiFlow.post('GetStartTrans', { funcType, timePeriod, status });

export const apiFlowSignType = () => apiFlow.post('GetFlowSignType');

export const apiFlowGetFlowLogLastest = ({ funcType, timePeriod, status }) =>
    apiFlow.post('GetFlowLogLatest', { funcType, timePeriod, status });

export const apiFlowEditLogTime = ({ lid, assign, approve }) => apiFlow.post('EditLogTime', { lid, assign, approve });

export const apiFlowGetFlowSheetByUid = (p) => {
    return apiFlow.post('GetFlowSheetByUid', p);
};
