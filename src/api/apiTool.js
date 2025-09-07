import axios from 'axios';
import { urlTool01 } from '@/share/setting';
axios.defaults.withCredentials = true;

export const apiTool01 = axios.create({ baseURL: urlTool01 });

export const apiTool01_GetEmpVByCon = ({ dept, empInfo, jobtitle, memo }) =>
    apiTool01.post('GetEmpVByCon', { dept, empInfo, jobtitle, memo });

export const apiTool01_Ex = (p) => apiTool01.post('Ex', { nodeAppName: p });

export const apiTool01_Ex2 = (p) => apiTool01.post('Ex2', { nodeAppName: p });
