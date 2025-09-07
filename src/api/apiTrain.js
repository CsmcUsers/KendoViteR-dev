import axios from 'axios';
import { urlTrain01, urlTrain02, urlTrain03 } from '@/share/setting';
axios.defaults.withCredentials = true;

export const apiTrain01 = axios.create({ baseURL: urlTrain01 });

export const apiTrain02 = axios.create({ baseURL: urlTrain02 });

export const apiTrain03 = axios.create({ baseURL: urlTrain03 });

export const apiTrain01_GetFuncBySystemId = ({ id }) => apiTrain01.post('GetFuncBySystemId', { id });

export const apiTrain01_GetAllSystem = () => apiTrain01.post('GetAllSystem');

export const apiTrain01_GetByFuncId = ({ fid }) => apiTrain01.post('GetByFuncId', { fid });

export const apiTrain01_GetFuncDescByFuncId = ({ fid }) => apiTrain01.post('GetFuncDescByFuncId', { fid });

export const apiTrain01_GetManualByFuncId = ({ fid }) => apiTrain01.post('GetManualByFuncId', { fid });

export const apiTrain01_GetStepsByManualId = ({ mid }) => apiTrain01.post('GetStepsByManualId', { mid });

export const apiTrain01_GetManualByKeyword = ({ sid, keyword }) =>
    apiTrain01.post('GetManualByKeyword', { sid, keyword });

export const apiTrain01_AddView = ({ mid }) => apiTrain01.post('AddView', { mid });

export const apiTrain01_DeleteManual = ({ ID }) => apiTrain02.post('DeleteFunc', { ID });

export const apiTrain02_SyncFuncSteps = ({ steps }) => apiTrain02.post('SyncFuncSteps', { steps });

export const apiTrain02_UpdateManual = ({ func, front_env = import.meta.env.VITE_APP_TEST }) =>
    apiTrain02.post('UpdateManual', { func, front_env });

export const apiTrain02_InsertManual = ({ func }) => apiTrain02.post('InsertManual', { func });

export const apiTrain03_InsertFuncType = (p) => apiTrain03.post('InsertFuncType', p);

export const apiTrain03_UpdateFuncType = (p) => apiTrain03.post('UpdateFuncType', p);

export const apiTrain03_DeleteFuncType = (p) => apiTrain03.post('DeleteFuncType', p);

export const apiTrain03_InsertFuncDesc = (p) => apiTrain03.post('InsertFuncDesc', p);

export const apiTrain03_UpdateFuncDesc = (p) => apiTrain03.post('UpdateFuncDesc', p);

export const apiTrain03_DeleteFuncDesc = (p) => apiTrain03.post('DeleteFuncDesc', p);
