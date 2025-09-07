import axios from 'axios';
import { urlEmp_V, urlAUTHROLE_V, urlDEPT, urlInnerEmp, urlFunction_M } from '@/share/setting';
// import $ from 'jquery';

axios.defaults.withCredentials = true;

export const apiEmp_V = axios.create({ baseURL: urlEmp_V });
export const apiAUTHROLE_V = axios.create({ baseURL: urlAUTHROLE_V });
export const apiDEPT = axios.create({ baseURL: urlDEPT });

export const apiNewInnerEmp = axios.create({ baseURL: urlInnerEmp });
export const apiFunction_M = axios.create({ baseURL: urlFunction_M });

async function ajaxGenericPost(url, objectData, callback) {
    let $ = null;

    const loadJQuery = async () => {
        const module = await import('https://esm.sh/jquery@3.7.1');
        $ = module.default || module;
    };

    await loadJQuery();

    console.log($.fn.jquery);

    $.ajax({
        url: url,
        data: objectData,
        type: 'POST',
        traditional: true,
        success: function (data) {
            console.log(data);
            if (data.length !== 0) {
                try {
                    var obj = JSON.parse(data);
                    if (typeof obj.error === 'string' || obj.error !== null) {
                        alert(obj.error);
                        // location.reload();
                    }
                    if (obj.success != null && obj.success.localeCompare('success') === 0) {
                        if (callback && typeof callback === 'function') {
                            callback(obj.returnData);
                        }
                    }
                } catch (e) {
                    console.log('catch');
                }
            }
        },
    });
}

/**
 * 取得要轉的網址
 * 'D01_0008'  是營業單位考核系統
 * @param {*} param0
 * @returns
 */
export const apiNewInnerPostPermissionSetting2 = ({ DepID, EmpID, FunctionID = 'D01_0008' }) => {
    ajaxGenericPost(
        import.meta.env.VITE_APP_NEWINNERAPIPATH + '/api/EmployeeAPI/PostPermissionSetting',
        { DepID, EmpID, FunctionID },
        (f) => {
            console.log(f);
            window.open(f);
        }
    );
};

export const apiFunctionM_GetFunctionList = () => apiFunction_M.post('GetByCondition', {});
