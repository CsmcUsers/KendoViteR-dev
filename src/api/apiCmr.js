import axios from 'axios';
import { urlCmr01, urlCmr03 } from '@/share/setting';
import _ from 'lodash';
axios.defaults.withCredentials = true;

export const apiCmr01 = axios.create({ baseURL: urlCmr01 });

export const apiCmr03 = axios.create({ baseURL: urlCmr03 });

/**
 * 取得所有的廠商
 * @returns
 */
export const apiCmrGetAllContractor = () => {
    return apiCmr03.post('GetAllContractor');
};

export const GetCommon = async () => {
    try {
        //合約主類別
        let { data: mainTypes } = await apiCmr01.post('GetMainTypeAll');
        //合約次類別
        let { data: secTypes } = await apiCmr01.post('GetSecTypeAll');
        //廠商
        let { data: contractors } = await apiCmrGetAllContractor();

        return {
            MainTypes: mainTypes.map((p) => _.assign({ id: p.Id, text: p.TypeName }, p)),
            SecTypes: secTypes.map((p) => _.assign({ id: p.Id, text: p.TypeName }, p)),
            contractors: contractors.map((p) => _.assign({ Id: p.Id, text: p.TaxId + ' / ' + p.CompanyName }, p)),
        };
    } catch (error) {
        handleErrorSw(error);
    }
};
