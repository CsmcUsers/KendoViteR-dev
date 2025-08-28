import axios from 'axios';
import {
    urlAuth,
    urlFile,
    urlDBCompare,
    urlTTT,
    urlLog,
    urlMISPerson,
    urlFuncAuth,
    urlReferTitle,
    urlVideoStream,
    urlAnnounce,
    urlESGApi,
} from '../share/setting';

axios.defaults.withCredentials = true;

export const apiFile = axios.create({ baseURL: urlFile });

export const apiMISPerson = axios.create({ baseURL: urlMISPerson });

export const apiReferTitle = axios.create({ baseURL: urlReferTitle });

export const apiReferTitle_GetAll = () => apiReferTitle.post('GetAll');

export const apiMISPersonGetByGourpId = (gid) => apiMISPerson.post('GetByGourpId', { gid });

export const apiFileGetByIDList = (idList) => apiFile.post('GetByIDList', { idList });

/**
 * 沒有綁上傳者可以看到
 * GetByFuncId_Pk
 */
export const apiFileGetByFuncId_Pk = (funcId, pk = null, strpk = null) =>
    apiFile.post('GetByFuncId_Pk', {
        funcId,
        pk,
        strpk,
    });

/**
 * 只有上傳者可以看到
 * @param {*} funcId
 * @param {*} pk
 * @param {*} strpk
 * @returns
 */
export const apiFileGetByFuncId_PkAuth = (funcId, pk = null, strpk = null) =>
    apiFile.post('GetByFuncId_PkAuth', {
        funcId,
        pk,
        strpk,
    });

export const apiFileDeleteFile = (id) => apiFile.post('DeleteFile', { id: id });

export const apiFileDeleteFileByFuncId_PK = (funcId, pk = null, strPk = null) =>
    apiFile.post('DeleteFileByFuncId_PK', { funcId, pk, strPk });

export const apiFile_ExploreFiles = ({ filetype, selectDir }) => {
    let front_env = process.env.REACT_APP_TEST;
    return apiFile.post('ExploreBigFiles', { filetype, front_env, selectDir });
};

export const apiAuth = axios.create({ baseURL: urlAuth });

export const apiAuthGetAllValidItem = () => apiAuth.post('GetAllValidItem');

/**
 * 取得 appr item 所有評分項目
 * @returns
 */
export const apiAuthGetAllItem = () => apiAuth.post('GetAllItem');

export const apiAuthLogin = (p) => {
    return apiAuth.post('Login', p);
};

export const apiAuthLoginByLDAPTest = ({ server, username, passwd }) =>
    apiAuth.post('LoginByLDAPTest', { server, username, passwd });

export const apiAuthLoginByLDAP = ({ username, passwd }) => apiAuth.post('LoginByLDAP', { username, passwd });

export const apiAuthInnerLogin = ({ uid: p, portalpk: pk }) => {
    return apiAuth.post('InnerLogin', { uid: p, portalpk: pk });
};

export const apiAuthGetFunctionAll = () => apiAuth.post('GetFunctionAll');

export const apiAuthGetActByRoleIds = () => apiAuth.post('GetActByRoleIds');

export const apiAuth_GetRolesByAllCon = ({ uid, titledesc, dept, titleId }) =>
    apiAuth.post('GetRolesByAllCon', { uid, titledesc, dept, titleId });

export const apiAuth_GetToken = () => apiAuth.get('GetToken', { withCredentials: true });

export const apiAuth_GetAuthByToken = () => apiAuth.get('GetAuthsByToken', { withCredentials: true });

export const apiDBCompare = axios.create({ baseURL: urlDBCompare });

export const apiTTT = axios.create({ baseURL: urlTTT });

export const apiTTT_GetBakEnv = () => apiTTT.post('GetBakEnv');

export const apiLog = axios.create({ baseURL: urlLog });

export const apiFuncAuth = axios.create({ baseURL: urlFuncAuth });

export const apiVideoStream = axios.create({ baseURL: urlVideoStream });

export const apiVideoStream_GetSourceURL = ({ filePk, front_env = process.env.REACT_APP_TEST }) =>
    `${urlVideoStream}/GetVideoStream/${filePk}?front_env=${front_env}`;

export const apiVideoStream_GetVideoStream = ({ filePk, front_env = process.env.REACT_APP_TEST }) =>
    apiVideoStream.get(`GetVideoStream/${filePk}?front_env=${front_env}`);

export const apiAnnounce = axios.create({ baseURL: urlAnnounce });

export const apiAnnounce_GetAnnounce = () => apiAnnounce.post('GetAnnounce');

export const apiESGApi = axios.create({ baseURL: urlESGApi });
