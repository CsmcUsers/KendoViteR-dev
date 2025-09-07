import React from 'react';
import { GridColumn as Column } from '@progress/kendo-react-grid';
import _ from 'lodash';

let w = 150;

const NumberCell = (props) => {
    return <td style={{ textAlign: 'right' }}>{props.dataItem[props.field]}</td>;
};

//--------------------------------如果是試算不顯示--------------------------------//

export const ColBranch = <Column width={120} title='營業單位' field='branchName' cells={{ data: NumberCell }}></Column>;

//依據年份顯示不同的column
export const colCal = (allItems, showItem, top_score, title) => {
    let rval = <></>;
    let ismulti = showItem.length > 1;

    let firstitem = showItem[0];
    let fitem = allItems.find((p) => firstitem === p.FuncId);
    let ftsdetail = top_score?.find((p) => firstitem === p.Type_Id);

    rval = ismulti ? (
        <Column title={title}>
            {showItem.map((v, i) => {
                let item = allItems.find((p) => v === p.FuncId);
                let tsdetail = top_score?.find((p) => v === p.Type_Id);
                return (
                    <Column
                        width={w}
                        key={i}
                        field={v}
                        title={item?.ItemName}
                        cells={{ data: NumberCell }}
                        headerCell={(p) => (
                            <span className='k-link'>
                                <p>{item?.ItemName}</p>
                                <p>{`(${tsdetail?.Top_Score || ''})`}</p>
                            </span>
                        )}
                    ></Column>
                );
            })}
        </Column>
    ) : (
        <Column title={title}>
            <Column
                width={w}
                key={1}
                field={firstitem}
                title={fitem?.ItemName}
                cells={{ data: NumberCell }}
                headerCell={() => (
                    <span className='k-link'>
                        <p>{fitem?.ItemName}</p>
                        <p>{`(${ftsdetail?.Top_Score || ''})`}</p>
                    </span>
                )}
            ></Column>
        </Column>
    );

    return rval;
};

export const colRender = ({ items, top_score, year, period, performanceItem: sec1, sec2, manageItem: sec3, sec4 }) => {
    const top = _.sumBy(top_score, (o) => o.Top_Score);
    const isOfficial = period === '02' || period === '04';

    let periodname =
        period === '01'
            ? '01 月 01 日 至 04 月 30 日'
            : period === '02'
            ? '01 月 01 日 至 06 月 30 日'
            : period === '03'
            ? '07 月 01 日 至 10 月 31 日'
            : '07 月 01 日 至 12 月 31 日';

    let outputjsx = <></>;

    switch (year) {
        case '111':
        case '112':
            outputjsx = isOfficial ? (
                <Column title={`考核期間 民國 ${year} 年 ${periodname}`}>
                    {ColBranch}
                    {colCal(items, sec1, top_score, '經營績效')}
                    {colCal(items, sec3, top_score, '管理績效')}
                    <Column title={`考核成績總分(${top})`} width={180} field='sum'></Column>
                    <Column width={120} title='排名' field='no'></Column>
                </Column>
            ) : (
                <Column title={`考核期間  ${periodname}`}>
                    {ColBranch}
                    {colCal(items, sec1, top_score, '經營績效')}
                    <Column title={`考核成績總分(${top})`} width={180} field='sum'></Column>
                    <Column width={120} title='排名' field='no'></Column>
                </Column>
            );
            break;
        case '113':
            if (isOfficial) {
                outputjsx = (
                    <Column title={`考核期間 民國 ${year} 年 ${periodname}`}>
                        {ColBranch}
                        {colCal(items, sec1, top_score, '量')}
                        {colCal(items, sec2, top_score, '利')}
                        {colCal(items, sec3, top_score, '質')}
                        {colCal(items, sec4, top_score, '')}
                        <Column title={`考核成績總分(${top})`} width={180} field='sum'></Column>
                        <Column width={120} title='排名' field='no'></Column>
                    </Column>
                );
            } else {
                outputjsx = (
                    <Column title={`考核期間  ${periodname}`}>
                        {ColBranch}
                        {colCal(items, sec1, top_score, '量')}
                        {colCal(items, sec2, top_score, '利')}
                        {colCal(items, sec3, top_score, '質')}
                        <Column title={`考核成績總分(${top})`} width={180} field='sum'></Column>
                        <Column width={120} title='排名' field='no'></Column>
                    </Column>
                );
            }
            break;
        default:
            if (isOfficial) {
                outputjsx = (
                    <Column title={`考核期間 民國 ${year} 年 ${periodname}`}>
                        {ColBranch}
                        {colCal(items, sec1, top_score, '量')}
                        {colCal(items, sec2, top_score, '利')}
                        {colCal(items, sec3, top_score, '質')}
                        {colCal(items, sec4, top_score, '')}
                        <Column title={`考核成績總分(${top})`} width={180} field='sum'></Column>
                        <Column width={120} title='排名' field='no'></Column>
                    </Column>
                );
            } else {
                outputjsx = (
                    <Column title={`考核期間  ${periodname}`}>
                        {ColBranch}
                        {colCal(items, sec1, top_score, '量')}
                        {colCal(items, sec2, top_score, '利')}
                        {colCal(items, sec3, top_score, '質')}
                        <Column title={`考核成績總分(${top})`} width={180} field='sum'></Column>
                        <Column width={120} title='排名' field='no'></Column>
                    </Column>
                );
            }
            break;
    }

    return outputjsx;
};
