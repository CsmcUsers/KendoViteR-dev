import axios from 'axios';
import { urlOutter } from '@/share/setting';

axios.defaults.withCredentials = true;

const apiOutter = axios.create({ baseURL: urlOutter });

/**
 * 登入debt子系統
 * @returns
 */
export const apiOutter_AuthLogin = () => apiOutter.post('AuthLogin');

export const apiOutter_DebtHI = () => apiOutter.post('DebtHI');

export const apiOutter_DebtGetGLById = ({ id }) => apiOutter.post('GetGLById', { id });

export const apiOutter_DebtGetAllLGOffices = () => apiOutter.post('GetAllLodgmentOffices');

/**
 * apiOutter_GetGuaranteedLodgmentsByConditions
 *
 * @param {
 *   branch,
 *   account,
 *   lodgmentOffice,
 *   lodgedItem,
 *   lodgedDateAfter,
 *   lodgedDateBefore,
 *   actualClaimDateAfter,
 *   actualClaimDateBefore} param0
 * @returns
 */
export const apiOutter_GetGLByCon = (p) => apiOutter.post('GetGuaranteedLodgmentsByConditions', p);

export const apiOutter_AddGL = (p) => apiOutter.post('AddGuaranteedLodgment', p);

export const apiOutter_UpdateGL = (p) => apiOutter.post('UpdateGuaranteedLodgment', p);

export const apiOutter_DeleteGL = (p) => apiOutter.post('DeleteGuaranteedLodgment', p);

export const apiOutter_DebtShowRemoteInfo = () => apiOutter.post('ShowRemoteInfo');

export const apiOutter_DebtGetBondsAll = () => apiOutter.post('GetBondsAll');

export const apiOutter_DebtGetAllNewBonds = () => apiOutter.post('GetAllNewBonds');
