import axios from 'axios';

import { urlAppr01 } from '@/share/setting';

axios.defaults.withCredentials = true;

export const apiAppr01 = axios.create({ baseURL: urlAppr01 });
