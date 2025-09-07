import {
    apiAppr01,
    apiCmr01,
    apiESGComp_GetESGCompMain,
    apiFileGetByFuncId_Pk,
    apiNotesGetApplyById,
    apiNotesGetMediaById,
    apiNotesGetPassWDSheetById,
    apiNotesGetWorkList,
    apiNotesTerGetApplyById,
    apiESG_GetESGRiskLevel,
    apiOutter_DebtGetGLById,
    apiOutter_AuthLogin,
    apiESG_GetESGExtEvent,
    apiEP_GetEPMain,
    apiEP_GetEPMainAfter,
} from '@/api';

/**
 * 取主檔資料
 * @param {*} selNode
 * @returns
 */
export const getMainData = async (selNode) => {
    let mainData = null;

    switch (selNode.Func_type) {
        case 'Notes01':
            mainData = await apiNotesTerGetApplyById({ Id: selNode.Func_PK });
            let { data: files } = await apiFileGetByFuncId_Pk(selNode.Func_type, selNode.Func_PK, null);
            return { ...mainData.data, files };
        case 'Notes02':
            mainData = await apiNotesGetApplyById({ Id: selNode.Func_PK });
            let { data: wl } = await apiNotesGetWorkList({ Id: selNode?.Func_PK });
            return { ...mainData.data, wl };

        case 'Notes03':
            mainData = await apiNotesGetMediaById({ Id: selNode.Func_PK });
            return mainData.data;

        case 'Notes05':
            mainData = await apiNotesGetPassWDSheetById({ Id: selNode.Func_PK });
            return mainData.data;

        case 'CM01':
            mainData = await apiCmr01.post('GetById', { Id: selNode.Func_str_PK });

            return mainData.data;
        case 'FLOWAppr':
            mainData = await apiAppr01.post('GetById', { Id: selNode.Func_PK });
            return mainData.data;

        case 'Ep01':
            mainData = await apiEP_GetEPMain({ CaseID: selNode.Func_str_PK });
            return mainData.data.length > 0 ? mainData.data[0] : null;

        case 'Ep02':
            mainData = await apiEP_GetEPMainAfter({ CaseID_2: selNode.Func_str_PK });
            return mainData.data.length > 0 ? mainData.data[0] : null;

        case 'Esg02':
            mainData = await apiESGComp_GetESGCompMain({ CaseID: selNode.Func_str_PK });
            return mainData.data.length > 0 ? mainData.data[0] : null;

        case 'Esg04':
            mainData = await apiESG_GetESGRiskLevel({ ID: selNode.Func_PK });
            return mainData.data.length > 0 ? mainData.data[0] : null;

        case 'Esg05':
            mainData = await apiESG_GetESGExtEvent({ ID: selNode.Func_PK });
            return mainData.data.length > 0 ? mainData.data[0] : null;

        case 'Debt01':
            await apiOutter_AuthLogin();
            mainData = await apiOutter_DebtGetGLById({ id: selNode.Func_PK });
            return mainData.data;
    }
};
