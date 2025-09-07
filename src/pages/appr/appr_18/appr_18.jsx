import { ExcelExport } from '@progress/kendo-react-excel-export';
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import _ from 'lodash';
import React, { useEffect, useState, useRef } from 'react';
import { apiAppr01, apiAuthGetAllItem } from '@/api';
import { BtnClear } from '@/components/button';
import * as col from './components/columns';
import { loadingPanel } from '@/components/K_Common';
import { SelHalfYear, SelYear } from '@/components/select';
import { handleErrorSw, sleep } from '@/share/common';
import { useUserContext, mapDeptName } from '@/share/context/userContext';
import { useLoading } from '@/share/hook/loading';
import { brachGrade } from './data';
import { withValueField } from '@/share/hoc/select';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { getApprItems } from '../setting';
import { ButtonGroup, Button } from '@progress/kendo-react-buttons';
import numeral from 'numeral';

const DLvalue = withValueField(DropDownList);

const initData = {
    year: (new Date().getFullYear() - 1911).toString(),
    period: null,
    showType: '1',
    apprs: null, //已經有的
    apprscroes: [],
    items: [],
    top_score: [],
};

const Appr18 = () => {
    const [pd, setPd] = useState(initData);

    const common = useUserContext();

    const [isLoading, startLoading, finishLoading] = useLoading();

    const _export = useRef(null);

    const excelExport = () => {
        if (_export.current !== null) {
            _export.current.save();
        }
    };

    const { performanceItem, sec2, manageItem, sec4 } = getApprItems(pd.year, pd.period);

    //依照試算或是正式算成績要包含哪些項目
    const calItems = (o) => {
        return [...performanceItem, ...sec2, ...manageItem, ...sec4].includes(o.Type_Id);
    };

    const getItems = async () => {
        let { data: items } = await apiAuthGetAllItem().catch(handleErrorSw);

        setPd((pre) => ({ ...pre, items }));
    };

    //給予平均分數
    const addavg = (inputList, calItem) => {
        let count = inputList.length;

        if (count === 0) {
            return inputList;
        }

        //判斷是否有物件所有評分的項目全部是0
        let allzeroitem = _.filter(inputList, (p) => {
            return _.every(calItem, (v) => {
                return _.isNil(p[v]) || numeral(p[v]).value() === 0;
            });
        });

        console.log('allzeroitem', allzeroitem);

        count = count - allzeroitem.length;

        let sumlist = calItem.reduce((p, v) => {
            let apprsum = _.sumBy(inputList, v) / count;
            return { ...p, [v]: _.isNaN(apprsum) ? '' : numeral(apprsum).format('0.00') };
        }, {});

        inputList = inputList.concat({
            branchName: '平均得分',
            ...sumlist,
            sum: numeral(
                _.sumBy(inputList, (p) => {
                    return numeral(p.sum).value();
                }) / count
            ).format('0.00'),
        });

        return inputList;
    };

    //排序並給予名次
    const sortFunc = (inputList) => {
        let rval = null;

        let lastscore = 0;
        let nonum = 0;

        if (pd.showType === '1') {
            inputList = _.orderBy(inputList, ['sumnum'], ['desc']);

            inputList = inputList.map((v, i) => {
                if (v.sum === lastscore) {
                    nonum = nonum;
                } else {
                    nonum = i + 1;
                }

                lastscore = v.sum;
                return _.assign(v, { no: nonum });
            });

            inputList = addavg(inputList, [...performanceItem, ...sec2, ...manageItem]);

            rval = inputList;
        } else if (pd.showType === '2') {
            inputList = _.orderBy(inputList, ['Grade', 'sumnum'], ['asc', 'desc']);

            //依照分行等級區分出多個array
            let grouplist = Object.values(_.groupBy(inputList, 'Grade'));

            grouplist.map((v) => {
                nonum = 0;
                return v.map((vv, i) => {
                    if (vv.sum === lastscore) {
                        nonum = nonum;
                    } else {
                        nonum = i + 1;
                    }

                    lastscore = vv.sum;
                    return _.assign(vv, { no: nonum });
                });
            });

            rval = grouplist.reduce((p, c) => {
                return p.concat(addavg(c, [...performanceItem, ...sec2, ...manageItem]));
            }, []);
        } else {
            inputList = _.orderBy(inputList, ['sumnum'], ['desc']);
            inputList = inputList.map((v, i) => {
                if (v.sum === lastscore) {
                    nonum = nonum;
                } else {
                    nonum = i + 1;
                }

                lastscore = v.sum;
                return _.assign(v, { no: nonum });
            });
            inputList = _.orderBy(inputList, ['Branch'], ['asc']);

            inputList = addavg(inputList, [...performanceItem, ...sec2, ...manageItem, ...sec4]);
            rval = inputList;
        }

        return rval;
    };

    const refresh = async () => {
        setPd((pre) => ({ ...pre, apprscroes: [] }));
        startLoading();
        await sleep(500);

        let { data: scores } = await apiAppr01
            .post('GetScoreBoard', { year: pd.year, period: pd.period })
            .catch(handleErrorSw);

        let { data: top_score } = await apiAppr01
            .post('GetTopScoreByYear_Period', { year: pd.year, period: pd.period })
            .catch(handleErrorSw);

        top_score = _.filter(top_score, calItems);

        let allBranch = Object.keys(
            _.keyBy(scores, (o) => {
                return o.Branch;
            })
        );

        let final = _.map(allBranch, (brno) => {
            //找出該分行所有的成績
            let bname = mapDeptName(common, brno);

            let vscroes = _.filter(scores, { Branch: brno });

            //取得有計算的分數
            vscroes = _.filter(vscroes, calItems);

            let Grade = brachGrade[pd.year].find((p) => p.DEPT_ID === brno)?.Grade;

            let rval = { Branch: brno, branchName: bname, Grade };

            let sum = numeral(0);

            vscroes.forEach((vs) => {
                sum.add(numeral(vs.Score_Val).value());
                rval = _.assign(rval, { [vs.Type_Id]: vs.Score_Val });
            });

            rval.sum = sum.format('0.00');
            rval.sumnum = sum.value();

            return rval;
        });

        final = sortFunc(final);

        setPd((pre) => ({ ...pre, apprscroes: final, top_score }));
        finishLoading();
    };

    useEffect(() => {
        getItems();
        if (!pd.period) {
            return;
        }
        refresh();
    }, [pd.year, pd.period, pd.showType]);

    const constCol = col.colRender({
        year: pd.year,
        period: pd.period,
        items: pd.items,
        top_score: pd.top_score,
        performanceItem,
        sec2,
        manageItem,
        sec4,
    });

    const btnEx = (
        <button
            title='Export Excel'
            className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary'
            onClick={excelExport}
        >
            下載報表
        </button>
    );

    const gridStyle = { width: '100%', height: 900 };

    return (
        <div className='k-card-list'>
            <Card>
                <CardHeader>
                    <CardTitle>{`成績表`}</CardTitle>
                </CardHeader>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-3'>
                            <SelYear
                                category={2}
                                label={'民國'}
                                value={pd.year}
                                onChange={(p) => {
                                    setPd((pre) => ({ ...pre, year: p.value }));
                                }}
                            />
                        </div>
                        <div className='col-md-3'>
                            <SelHalfYear
                                style={{ width: 200 }}
                                label={'期間'}
                                value={pd.period}
                                onChange={(p) => setPd((pre) => ({ ...pre, period: p.value }))}
                            ></SelHalfYear>
                        </div>
                        <div className='col-md-3'>
                            <DLvalue
                                style={{ width: 200 }}
                                label='顯示方式'
                                valueField='id'
                                textField='text'
                                value={pd.showType}
                                data={[
                                    { id: '1', text: '依得分別' },
                                    { id: '2', text: '依分等' },
                                    { id: '3', text: '依單位別' },
                                ]}
                                onChange={(p) => setPd((pre) => ({ ...pre, showType: p.value }))}
                            />
                        </div>
                        <div className='col-md-3'></div>
                    </div>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-3'></div>
                        <div className='col-md-3'></div>
                        <div className='col-md-3'>
                            <ButtonGroup>
                                <Button
                                    themeColor={'primary'}
                                    onClick={() => {
                                        refresh();
                                    }}
                                >
                                    刷新
                                </Button>
                                <BtnClear
                                    onClick={() => {
                                        setPd(initData);
                                    }}
                                />
                            </ButtonGroup>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-12'>
                            {isLoading && loadingPanel}
                            <ExcelExport data={pd.apprscroes} ref={_export} fileName={`成績表`}>
                                {pd.showType === '1' ? (
                                    <Grid style={gridStyle} data={pd.apprscroes}>
                                        <GridToolbar>{btnEx}</GridToolbar>
                                        <Column title='高雄銀行營業單位考核成績表（依得分別）'>{constCol}</Column>
                                    </Grid>
                                ) : pd.showType === '2' ? (
                                    <Grid style={gridStyle} data={pd.apprscroes}>
                                        <GridToolbar>{btnEx}</GridToolbar>
                                        <Column title='高雄銀行營業單位考核成績表（依分等）'>
                                            <Column title='分等' width={100} field='Grade'></Column>
                                            {constCol}
                                        </Column>
                                    </Grid>
                                ) : (
                                    <Grid style={gridStyle} data={pd.apprscroes}>
                                        <GridToolbar>{btnEx}</GridToolbar>
                                        <Column title='高雄銀行營業單位考核成績表（依單位別）'>{constCol}</Column>
                                    </Grid>
                                )}
                            </ExcelExport>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default Appr18;
