import axios from 'axios';

import {
    urlBak01,
    urlBak02,
    urlBak03,
    urlBak04,
    urlBak05,
    urlBak10,
    urlBak11,
    urlBak14,
    urlBak15,
    urlBak16,
    urlBak17,
} from '@/share/setting';

axios.defaults.withCredentials = true;

export const apiBak01 = axios.create({ baseURL: urlBak01 });

export const apiBak02 = axios.create({ baseURL: urlBak02 });

export const apiBak02_SysFuncs = (changeList, RolID) => apiBak02.post('SyncFuncs', { ...changeList, RolID });

export const apiBak02_UpdateRole = (role) => apiBak02.post('UpdateRole', { role });

export const apiBak02_GetByRolID = (roleId) => apiBak02.post('GetByRolID', { roleId });

export const apiBak02_GetAllRoles = () => apiBak02.post('GetAllRoles');

export const apiBak02_SyncRoles = ({ roles }) => apiBak02.post('SyncRoles', { roles });

export const apiBak03 = axios.create({ baseURL: urlBak03 });

export const apiBak03_GetRoleTitle = ({ roleId }) => apiBak03.post('GetRoleTitle', { roleId });

export const apiBak03_GetRoleUser = ({ roleId }) => apiBak03.post('GetRoleUser', { roleId });

export const apiBak03_GetRoleDept = ({ roleId }) => apiBak03.post('GetRoleDept', { roleId });

export const apiBak03_GetRoleDeptTitle = ({ roleId }) => apiBak03.post('GetRoleDeptTitle', { roleId });

export const apiBak03_SyncRoleTitle = ({ roletitles }) => apiBak03.post('SyncRoleTitle', { roletitles });

export const apiBak03_SyncRoleUser = ({ roleusers }) => apiBak03.post('SyncRoleUser', { roleusers });

export const apiBak03_SyncRoleDept = ({ roledepts }) => apiBak03.post('SyncRoleDept', { roledepts });

export const apiBak03_SyncRoleDeptTitle = ({ role_dept_titles }) =>
    apiBak03.post('SyncRoleDeptTitle', { role_dept_titles });

export const apiBak04 = axios.create({ baseURL: urlBak04 });

export const apiBakGetActByFuncId = ({ fid }) => apiBak04.post('GetActByFuncId', { fid });

export const apiBakSyncFuncAct = ({ acts }) => apiBak04.post('SyncFuncAct', { acts });

export const apiBak05 = axios.create({ baseURL: urlBak05 });

export const apiFlowUndo = (p) => apiBak05.post('Undo', p);

export const apiBakUpdateFlowLog = (log) => apiBak05.post('UpdateFlowLog', log);

export const apiBak05_DeleteAll = (sheet) => apiBak05.post('DeleteAll', sheet);

export const apiBak10 = axios.create({ baseURL: urlBak10 });

export const apiBak11 = axios.create({ baseURL: urlBak11 });

export const apiBakDeleteLog = (p) => apiBak05.post('DeleteLog', p);

export const apiBakAddOne = (p) => apiBak10.post('AddOne', { pendings: p });

export const apiBakReduceOne = (p) => apiBak10.post('ReduceOne', { pendings: p });

export const apiBak14 = axios.create({ baseURL: urlBak14 });

export const apiBak14_GetAllNodeDef = () => apiBak14.get('GetNodeDefAll');

export const apiBak14_UpdateNodeDef = (node) => apiBak14.post('UpdateNodeDef', node);

export const apiBak14_InsertNodeDef = (node) => apiBak14.post('InsertNodeDef', node);

export const apiBak14_DeleteNodeDef = (node) => apiBak14.post('DeleteNodeDef', node);

export const apiBak15 = axios.create({ baseURL: urlBak15 });

export const apiBak15_QueryData = ({ sql, dbName }) => apiBak15.post('QueryData', { sql, dbName }, { timeout: 1e4 });

export const apiBak15_ExcuteSql = ({ sql, dbName }) => apiBak15.post('ExcuteSql', { sql, dbName }, { timeout: 1e4 });

export const apiBak16 = axios.create({ baseURL: urlBak16 });

export const apiBak16_QueryData = (p) => apiBak16.post('QueryData', p);

export const apiBak16_DeleteAndLoadData = ({ funcType, sheets, logs }) =>
    apiBak16.post('DeleteAndLoadData', { funcType, sheets, logs });

export const apiBak17 = axios.create({ baseURL: urlBak17 });

export const apiBak17_Hi = ({ subSystem }) => apiBak17.post('Test_HI', { subSystem });

export const apiBak17_GetAllSubSys = () => apiBak17.post('GetAllSubSys');

export const apiBak17_ShowRemoteInfo = ({ subSystem }) => apiBak17.post('ShowRemoteInfo', { subSystem });
