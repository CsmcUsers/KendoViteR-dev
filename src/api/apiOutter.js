import axios from 'axios';
import { urlOutter } from '../share/setting';

axios.defaults.withCredentials = true;

const apiOutter = axios.create({ baseURL: urlOutter });

export const apiOutterGetWorkByNo = ({ sid }) => apiOutter.post('GetWorkOfficeByNo', { sid });

export const apiOutterGetWorkByUid = ({ userid }) => apiOutter.post('GetWorkOfficeByUid', { userid });

export const apiOutterGetOWA = ({ sid }) => apiOutter.post('GetOWA', { sid });

export const apiOutterShowRemoteSysStatus = ({ sysName }) => apiOutter.post('ShowRemoteSysStatus', { sysName });

export const apiOutterShowRemoteInfo = () => apiOutter.post('ShowRemoteInfo');
