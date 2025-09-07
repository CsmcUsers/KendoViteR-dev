import _, { findIndex, isEmpty, isNaN, isNil } from 'lodash';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import numeral from 'numeral';
import qs from 'qs';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { urlFile } from './setting';
import { process } from '@progress/kendo-data-query';
import { useTokenContext } from './context';

export const _FormStatus = {
    Insert: 'Insert',
    Update: 'Update',
    Query: 'Query',
    Delete: 'Delete',
};

export const _authToken = 'authToken';

/**
 * 轉換array的物件或是某個物件的欄位如果是null顯示空字串
 * @param {array, obj} obj
 * @param  {...string} cols
 */
export const setEmptyIfNull = (obj, ...cols) => {
    if (_.isNull(obj) || _.isUndefined(obj)) {
        console.error('錯誤，物件為空');
        return false;
    }

    if (_.isArray(obj)) {
        _.forEach(obj, (item) => {
            _.forEach(cols, function (key, val) {
                if (item[key] === undefined) throw new Error(`column error ${key} not exists`);

                if (_.isNull(item[key])) {
                    item[key] = '';
                }
            });
        });
    } else {
        _.forEach(cols, function (key, val) {
            if (obj[key] === undefined) throw new Error(`column error ${key} not exists`);

            if (_.isNull(obj[key])) {
                obj[key] = '';
            }
        });
    }
};

/**
 * 格式可以去以下網址參考
 * https://momentjs.com/docs/#/displaying/
 *
 * @param {*} obj
 * @param {*} format
 * @param  {...any} cols
 * @returns
 */
export const formatPropsDate = (obj, format, ...cols) => {
    if (_.isNull(obj) || _.isUndefined(obj)) {
        console.log('formatPropsDate() 物件為空不 format');
        return false;
    }

    if (_.isArray(obj)) {
        _.forEach(obj, (item) => {
            _.forEach(cols, function (key, val) {
                if (item[key] === undefined) {
                    throw new Error(`column error ${key} not exists`);
                }

                if (_.isEmpty(item[key])) {
                    item[key] = '';
                } else {
                    item[key] = dayjs(item[key]).format(format);
                }
            });
        });
    } else {
        _.forEach(cols, function (key, val) {
            if (obj[key] === undefined) {
                throw new Error(`column error ${key} not exists`);
            }

            if (_.isEmpty(obj[key])) {
                obj[key] = '';
            } else {
                obj[key] = dayjs(obj[key]).format(format);
            }
        });
    }

    return obj;
};

export const pageClose = function () {
    var ismsie = /msie/.test(navigator.userAgent.toLowerCase());
    var isopera = /opera/.test(navigator.userAgent.toLowerCase());
    var ismozilla = /mozilla/.test(navigator.userAgent.toLowerCase());
    if (ismsie || isopera) {
        window.top.opener = null;
        window.top.close();
    } else if (ismozilla) {
        window.open('about:blank', '_self').close();
        window.open('about:blank', '_top').close();
    }
};

export const setCookie = (cname, cvalue, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
};

export const deleteCookie = (cname) => {
    document.cookie = cname + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export const getCookie = (cname) => {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
};

export const handleErrorSw = (err, cb = null) => {
    console.log('err', err);

    if (isNil(err?.response)) {
        Swal.fire({
            title: '前端錯誤訊息: 邏輯檢核錯誤',
            icon: 'error',
            text: err,
            width: 1000,
        });
        return;
    }

    const { status, data } = err.response;

    let timerInterval;
    switch (status) {
        case 400:
            Swal.fire({
                title: `內部錯誤訊息: 程式出現異常，請聯絡系統負責人 Code:${status}`,
                icon: 'error',
                text: '輸入資料錯誤',
                width: 1000,
            });

            break;
        case 401:
            Swal.fire({
                title: `內部錯誤訊息: 程式出現異常，請聯絡系統負責人 Code:${status}`,
                icon: 'error',
                text: '使用者無法登入',
                width: 1000,
            });

            break;
        case 404:
            if (data instanceof Blob) {
                Swal.fire({
                    title: `內部錯誤訊息: 程式出現異常，請聯絡系統負責人 Code:${status}`,
                    icon: 'error',
                    text: '系統無該檔案',
                    width: 1000,
                });
            } else {
                Swal.fire({
                    title: `內部錯誤訊息: 程式出現異常，請聯絡系統負責人 Code:${status}`,
                    icon: 'error',
                    text: '找不到該路徑',
                    width: 1000,
                });
            }
            break;
        case 415:
            Swal.fire({
                title: `內部錯誤訊息: 程式出現異常，請聯絡系統負責人 Code:${status}`,
                icon: 'error',
                text: '傳入資料格式錯誤',
                width: 1000,
            });
            break;
        case 500:
            Swal.fire({
                title: `內部錯誤訊息: 程式出現異常，請聯絡系統負責人 Code:${status}`,
                icon: 'error',
                text: err.response.data.title,
                width: 1000,
            });
            break;

        case 667:
            Swal.fire({
                title: `內部錯誤訊息: Code:${status}`,
                icon: 'error',
                text: err.response.data.title,
                width: 1000,
            });
            break;

        case 666:
            Swal.fire({
                title: '驗證錯誤、或有時間超過效登入時間過期!',
                html: '將自動導頁在 <b></b> 毫秒後.',
                timer: 3000,
                timerProgressBar: true,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                    const b = Swal.getHtmlContainer().querySelector('b');
                    timerInterval = setInterval(() => {
                        b.textContent = Swal.getTimerLeft();
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                },
            }).then((result) => {
                /* Read more about handling dismissals below */
                if (result.dismiss === Swal.DismissReason.timer) {
                    if (isDev() || isLocal()) {
                        Swal.fire('666錯誤導頁', `將導頁到登入頁 ${import.meta.env.VITE_APP_TEST} `, 'error');
                    } else {
                        window.location.href = import.meta.env.VITE_APP_LOGOUTPAGE;
                    }
                }
            });
            break;
    }

    //一定要再回傳response 的錯誤
    return err;
};

/**
 * 取得現在網址的參數
 * @param {*} name 參數名稱
 */
export const getUrlParameter = (name) => {
    name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(window.location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const sleep = (delay = 1e3) => {
    //數字太小，不會觸發???
    if (delay < 500) {
        delay = 500;
    }

    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
};

export const getMuiColData = (muiParam) => {
    const api = muiParam.api;
    const fields = api
        .getAllColumns()
        .map((c) => c.field)
        .filter((c) => c !== '__check__' && !!c);
    const thisRow = {};

    fields.forEach((f) => {
        thisRow[f] = muiParam.getValue(f);
    });

    return thisRow;
};

export const newUrlParam = (p) => {
    return new URLSearchParams(p).toString();
};

export const qsstringfy = (p) => qs.stringify(p);

export const showConfirm = (title = '是否確定要刪除?', text = '', callback = (f) => f) => {
    return Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3f51b5',
        cancelButtonColor: '#d33',
        confirmButtonText: '是的!',
        cancelButtonText: '取消',
    }).then((result) => {
        if (result.isConfirmed) {
            callback();
        }
    });
};

/**
 * 設定 local storage
 * @param {*} key
 * @param {*} value
 * @param {*} ttl
 */
export const setWithExpiry = (key, value, ttl) => {
    const now = new Date();

    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
        value: value,
        expiry: now.getTime() + ttl,
    };
    localStorage.setItem(key, JSON.stringify(item));
};

/**
 * 取得
 * @param {*} key
 * @returns
 */
export const getWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
        // If the item is expired, delete the item from storage
        // and return null
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
};

/**
 * http://numeraljs.com/  參考格式
 *
 * @param {*} value
 * @param {*} format
 * @returns
 */
export const numformat = (value, format) => {
    return numeral(value).format(format);
};

export const DC_Desc = { D: '借(D)', C: '貸(C)' };

/**
 *
 * console.log(getRandomInt(3));
 * expected output: 0, 1 or 2
 *
 * @param {*} max
 * @returns
 */
export const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
        atob(base64)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
    );

    return JSON.parse(jsonPayload);
}

export const getBackEndTimeString = (p) => (p ? dayjs(p, 'Z').format('YYYY-MM-DD HH:mm:ss') : null);

export const getTimeString = (p, formatstr = 'YYYY-MM-DD HH:mm:ss') => (p ? dayjs(p).format(formatstr) : null);

export const calculateTimeLeft = (param = '2022-09-28 15:00:00') => {
    let difference = +new Date(param) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    } else {
        timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        };
    }

    return timeLeft;
};

export const newUrlParameter = (p) => {
    return new URLSearchParams(p).toString();
};

export const getTreeNodes = (tree, textField = 'text', childField = 'items') => {
    let IDs = [];

    if (tree.length === 0) return [];

    tree.forEach((p) => {
        if (!p.hasOwnProperty(textField)) {
            throw new Error('textField is not a property of tree data !!');
        }

        if (p.hasOwnProperty(childField)) {
            //加入母節點
            IDs.push(p[textField]);
            //加入子節點
            IDs = IDs.concat(getTreeNodes(p[childField], textField, childField));
        }
    });

    return IDs;
};

/**
 * 初始化建立階層的方法
 * @param {*} parentId 父屬性Key 名稱
 * @param {*} Id
 * @param {*} childId 要產生盛裝子陣列資料的屬性名稱
 * @returns
 */
export const createtoHierarchyFunc = (parentId, Id, childId, isExpanded = false) => {
    /**
     * 建立階層的資料
     * @param {*} alldata 該array
     * @param {*} parentKeyval 父屬性的初始值 ex: ''、null、0
     * @returns 階層的資料
     */
    const tmpHiefun = (alldata, parentKeyval) => {
        let children = alldata.filter((p) => p[parentId] === parentKeyval);

        if (children.count === 0) {
            return [];
        }

        return children.map((v) => ({ ...v, expanded: isExpanded, [childId]: tmpHiefun(alldata, v[Id]) }));
    };

    return tmpHiefun;
};

/**
 * 判斷副檔名
 * @param {*} fileName
 * @param {*} ext
 * @returns
 */
export const is = (fileName, ext) => new RegExp(`.${ext}\$`).test(fileName);

/**
 * 取得相對的狀態名稱
 * @param {*} p
 * @returns
 */
export const getFlowStatus = (p) => {
    switch (p) {
        case 1:
            return '草稿';
        case 99:
            return '流程中';
    }
    return '未知';
};

export const getFileStatus = (p) => {
    switch (p) {
        case 99:
            return '草稿';
        case 3:
            return '審核流程中';
        case 6:
            return '審核完成';
    }
    return '未知';
};

/**
 * 判斷元件是否存在
 * @returns
 */
export const useMountedRef = () => {
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        return () => (mounted.current = false);
    });

    return mounted;
};

export const Download = (guid, exfile, callback = (f) => f) => {
    axDownload(urlFile + 'DownLoadFileById?Id=' + guid, exfile, callback);
};

/**
 * 有權限控管的下載
 * supper only
 */
export const DownloadByRealPath = (path) => {
    const fileName = path.split('\\');
    console.log(fileName);
    axDownload(urlFile + 'DownLoadFileByRealPath?path=' + path, fileName[fileName.length - 1]);
};

/**
 * 觸發點選網址下載的動作
 * @param {*} url 來源網址
 * @param {*} exfile 附檔名
 */
export const axDownload = (url, exfile, cb = (f) => f) => {
    axios({
        url,
        method: 'GET',
        responseType: 'blob', // Important
    })
        .then((response) => {
            // const url = window.URL.createObjectURL(new Blob([response.data]));
            // const link = document.createElement('a');
            // link.href = url;
            // link.setAttribute('download', exfile); //or any other extension
            // link.click();
            if (response.status === 200) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', exfile); // or any other extension
                document.body.appendChild(link); // Append to body
                link.click();
                document.body.removeChild(link); // Remove from body
            } else {
                throw new Error(`Unexpected response status: ${response.status}`);
            }
        })
        .catch((err) => {
            handleErrorSw(err);
        })
        .finally(cb);
};

export const _editMode = { edit: 0, create: 1, query: 2 };

Array.prototype.diff = function (arr2) {
    var ret = [];
    for (var i in this) {
        if (arr2.indexOf(this[i]) > -1) {
            ret.push(this[i]);
        }
    }
    return ret;
};

export const hasSamVal = (arr1, arr2) => {
    return arr1.diff(arr2).length > 0;
};

/**
 * 可以取得文件庫的檔案的URL
 * const score_downloadUrl =
 * getInnerCookieAndRequestURL(user.UseID, '/DMS※1411c884deca.aspx');
 * window.open(score_downloadUrl);
 */
export const getInnerCookieAndRequestURL = (uid, spcode) =>
    `${import.meta.env.VITE_APP_NEWINNERAPIPATH}/api/EmployeeAPI/UOFLogin?appName=Portal` +
    `&employeeID=${uid}&linkData=${spcode}`;

/**
 *
 * https://stackoverflow.com/questions/62268544/using-an-array-of-indices-to-access-and-modify-arbitrarily-deep-nested-arrays-in
 * @param {*} array
 * @param {*} indices
 * @param {*} deleteCount
 * @param  {...any} toBeInserted
 * @returns
 */
export const deepSplice = (array, indices, deleteCount, ...toBeInserted) => {
    const last = indices.pop();
    const finalItems = indices.reduce((acc, i) => acc[i].items, array);

    console.log(finalItems);
    finalItems.splice(last, deleteCount, ...toBeInserted);
    return array;
};

/**
 *
 * https://stackoverflow.com/questions/9133500/how-to-find-a-node-in-a-tree-with-javascript
 * @param {*} element
 * @param {*} matchingVal
 * @returns
 */
export const searchTree = (element, matchingVal, compareId = 'title', childId = 'children') => {
    console.log(element, element[childId]);
    console.log('element', childId);
    if (element[compareId] === matchingVal) {
        return element;
    } else if (!isNil(element[childId])) {
        let i;
        let result = null;
        for (i = 0; result == null && i < element[childId].length; i++) {
            result = searchTree(element[childId][i], matchingVal, compareId, childId);
        }
        return result;
    }
    return null;
};

/**
 *
 * https://stackoverflow.com/questions/32187352/recursively-find-arbitrary-node-path-in-tree
 * @param {*} struct
 * @param {*} cmp
 * @returns
 */
export const getTreePath = (struct, cmp) => {
    if (struct.Id === cmp) {
        // `cmp` is found at current `struct`.
        return [];
    } else if (struct.items) {
        for (let i = 0; i < struct.items.length; i++) {
            let path = getTreePath(struct.items[i], cmp);
            if (path !== null) {
                // `cmp` is found at `path` in `struct.children[i]`,
                // so prefix `i` to `path` to get the path in `struct`.
                path.unshift(i);
                return path;
            }
        }
    }
    // `cmp` not found in this branch of the tree.
    return null;
};

/**
 * Returns a function that takes a tree structure and a node to search for,
 * and returns the path to that node in the tree.
 * 如果找不到index路徑回傳null
 * @param {string} [key='Id'] - The key to use for comparing nodes.
 * @param {string} [childKey='items'] - The key to use for accessing child nodes.
 * @returns {function} [0,3,1] or null.
 */
export const createGetTreePath = (key = 'Id', childKey = 'items') => {
    const tmpGetTreePath = (struct, cmp) => {
        if (struct[key] === cmp[key]) {
            // `cmp` is found at current `struct`.
            return [];
        } else if (struct[childKey]) {
            for (let i = 0; i < struct[childKey].length; i++) {
                let path = tmpGetTreePath(struct[childKey][i], cmp);
                if (path !== null) {
                    // `cmp` is found at `path` in `struct.children[i]`,
                    // so prefix `i` to `path` to get the path in `struct`.
                    path.unshift(i);
                    return path;
                }
            }
        }
        // `cmp` not found in this branch of the tree.
        return null;
    };

    return tmpGetTreePath;
};

/**
 * 產生新的Id
 * @param {*} data
 * @param {*} idname
 * @returns
 */
export const generateId = (data, idname = 'Id') =>
    data.reduce((acc, current) => Math.max(acc, current[idname] || 1), 0) + 1;

/**
 * 顯示又消失
 * @param {fn} fn
 * @param {string} notiname
 * @param {number} [timeout=1e3]
 */
export const showAndVanish = (fn, notiname, timeout = 1e3) => {
    fn((pre) => ({ ...pre, [notiname]: true }));

    setTimeout(() => {
        fn((pre) => ({ ...pre, [notiname]: false }));
    }, timeout);
};

export const isValidDate = (yyy, mm, dd) => {
    if (isNaN(yyy)) {
        throw new Error(` yyy 不是 數字  ${yyy} `);
    }

    if (isNaN(mm)) {
        throw new Error(` mm 不是 數字 ${mm}`);
    }

    if (isNaN(dd)) {
        throw new Error(` dd 不是 數字  ${dd}`);
    }

    if (mm > 12 || mm < 1) {
        throw new Error('月份不正常');
    }

    return dayjs([yyy, mm - 1, dd]).isValid();
};

export const createDataState = (dataState, data) => {
    return {
        result: process(data?.slice(0) || [], dataState),
        dataState: dataState,
    };
};

export const hasAuthByAct = (acts) => (actname) => {
    const { userToken } = useTokenContext();

    if (userToken.IsSupper) {
        return false;
    }

    if (isEmpty(acts)) {
        return true;
    }

    return findIndex(acts, { Act: actname }) === -1;
};

export const isDev = () => {
    const nowEvn = import.meta.env.VITE_APP_TEST;

    const isdev = ['dev'].includes(nowEvn);

    return isdev;
};

export const isLocal = () => {
    const nowEvn = import.meta.env.VITE_APP_TEST;

    const isdev = ['local'].includes(nowEvn);

    return isdev;
};

/**
 * 取一組 GUID
 * @returns GUID
 */
export const newGUID = () => {
    return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
        (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
    );
};

/**
 * 是否符合需求單單號格式(7個連續的數字)
 * @param {string} 字串
 *
 * @returns {Array} 符合的字串
 */
export const isMatchDemandOrder = (input) => {
    let regex = /(\d{7})(?=\D|$)/g;
    if (!regex.test(input)) {
        return [];
    } else {
        return input.match(regex);
    }
};

export const getObjKeyByValue = (obj, value, getFirstOnly = true) => {
    const keys = Object.keys(obj).filter((key) => value === obj[key]);
    if (getFirstOnly) {
        return keys.length > 0 ? keys[0] : null;
    } else {
        return keys;
    }
};

export const extractPatterns = (str, pattern = /資訊處-第\d{7}號/g) => {
    const regex = pattern;
    const matches = str.match(regex);

    return matches || [];
};
