import { apiFlowGetFlowLogLastest, apiFlowGetStartTrans } from '@/api';
import { assign, groupBy, orderBy, map, maxBy } from 'lodash';

/**
 * 查詢已送審或是以簽核的單子
 * @param {{timePeriod:{ start: date end: date},
 *          funcType: string,
 *          status: number}} condition 搜尋待簽條件
 * @param {any} funcTypeCon  沒有用到
 */
export const serv_flow_GetSignedList = async (condition, funcTypeCon) => {
    let signedList = await getSignedList(condition, funcTypeCon);
    let startList = await getStartList(condition, funcTypeCon);
    let list = signedList.concat(startList);

    return orderBy(list, ['Assign_datetime'], ['desc']);
};

/**
 * 取得已經簽核的單子
 * @param {*} condition
 */
const getSignedList = async (condition, funcTypeCon) => {
    let { data: signedlist } = await apiFlowGetFlowLogLastest({
        ...condition,
        funcTypeCon,
    });

    signedlist = signedlist.map((v) => assign({ tip: '已簽核' }, v));

    let grouped = groupBy(signedlist, (v) => v.Func_type + v.Func_PK + v.Func_str_PK);
    let maxIds = map(grouped, (group) => maxBy(group, 'Id'));

    return maxIds;
};

/**
 * 已經送審的單子
 * @param {*} condition
 * @param {*} funcTypeCon
 * @returns
 */
const getStartList = async (condition, funcTypeCon) => {
    let { data: translist } = await apiFlowGetStartTrans({ ...condition, funcTypeCon });

    translist = translist.map((v) => assign({ tip: '已送審' }, v));

    return translist;
};
