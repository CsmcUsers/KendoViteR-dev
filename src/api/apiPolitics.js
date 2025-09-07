import axios from 'axios';
import { urlPolitics01 } from '@/share/setting';
axios.defaults.withCredentials = true;

export const apiPolitics01 = axios.create({ baseURL: urlPolitics01 });

export const apiPoliticsGetById = ({ Id }) => apiPolitics01.post('GetById', { Id });

export const apiPoliticsGetApplyByCon = (p) => apiPolitics01.post('GetApplyByCon', p);

export const apiPoliticsCreatePoli = ({ poli, files }) => apiPolitics01.post('CreatePoli', { poli, files });

export const apiPoliticsCreatePoliAndOpen = ({ poli, files }) =>
    apiPolitics01.post('CreatePoliAndOpen', { poli, files });

export const apiPoliticsDeletePoli = ({ poli, files }) => apiPolitics01.post('DeletePoli', { poli, files });

//UpdatePoli
export const apiPoliticsUpdatePoli = ({ poli }) => apiPolitics01.post('UpdatePoli', { poli });

export const apiPoliticsSyncPoliLog = ({ polilogs }) => apiPolitics01.post('SyncPoliLog', { polilogs });
