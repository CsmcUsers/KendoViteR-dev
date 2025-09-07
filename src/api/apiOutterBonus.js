import axios from 'axios';
import { urlOutter } from '../share/setting';

axios.defaults.withCredentials = true;

const apiOutter = axios.create({ baseURL: urlOutter });

/**
 * 登入bonus子系統
 * @returns
 */
export const apiOutter_AuthBonusLogin = () => apiOutter.post('AuthBonusLogin');

/**
 * 檢查是否有連線
 * 超過3秒就出錯誤
 * @returns
 */
export const apiOutter_AuthIsAlive = () => axios.create({ baseURL: urlOutter, timeout: 3000 }).post('AuthBonusIsAlive');
