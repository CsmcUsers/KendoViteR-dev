import axios from 'axios';
import { urlCard01 } from '@/share/setting';

axios.defaults.withCredentials = true;

export const apiCard01 = axios.create({ baseURL: urlCard01 });
