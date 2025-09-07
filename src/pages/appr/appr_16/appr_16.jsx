import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { apiAppr01, apiAuth } from '@/api';
import { BtnClear } from '@/components/button';
import { loadingPanel } from '@/components/K_Common';
import { SelHalfYear, SelYear } from '@/components/select';
import { handleErrorSw, sleep } from '@/share/common';
import { useUserContext, mapNodeName } from '@/share/context/userContext';
import { useLoading } from '@/share/hook/loading';
import { ScoreBoard } from '../components';
import { CommandCell } from './components';

const initData = {
    year: (new Date().getFullYear() - 1911).toString(),
    period: null,
    scores: [],
    scDetail: [],
    showScore: false,
    apprs: null, //已經有的
    appr: null, //被選擇的
    scDetailLoading: false,
};

const Appr16 = (props) => {
    const [pageData, setPageData] = useState(initData);

    const common = useUserContext();

    const [isLoading, startLoading, finishLoading] = useLoading();

    const showDialog = () => setPageData((pre) => ({ ...pre, showScore: true }));
    const closeDialog = () => setPageData((pre) => ({ ...pre, showScore: false }));

    const getScore = async () => {
        setPageData((pre) => ({ ...pre, scDetailLoading: true }));

        await sleep(500);

        apiAppr01
            .post('GetScroe', { id: pageData.appr.Id })
            .then(({ data: sc }) => {
                setPageData((pre) => ({ ...pre, scDetail: sc, scDetailLoading: false }));
            })
            .catch(handleErrorSw);
    };

    const refresh = async () => {
        startLoading();
        await sleep(500);

        let { data: items } = await apiAuth.post('GetAllItem').catch(handleErrorSw);

        let { data: apprs } = await apiAppr01
            .post('GetApprAllByYear_Period', {
                year: pageData.year,
                period: pageData.period,
            })
            .catch(handleErrorSw);

        items = items.map((v) =>
            _.assign(
                _.find(apprs, (p) => p.Type_Id === v.FuncId),
                v
            )
        );

        items = _.orderBy(items, (p) => p.SortBy);

        finishLoading();

        setPageData((pre) => ({
            ...pre,
            scores: items,
            apprs,
        }));
    };

    useEffect(() => {
        if (!pageData.period) {
            return;
        }
        refresh();
    }, [pageData.year, pageData.period]);

    useEffect(() => {
        setPageData((pre) => ({ ...pre, scDetail: [] }));

        if (_.isNil(pageData.appr?.Id)) {
            return;
        }

        getScore();
    }, [pageData.appr?.Id]);

    return (
        <div className='k-card-list'>
            <Card>
                <CardHeader>
                    <CardTitle>{`成績進度查詢`}</CardTitle>
                </CardHeader>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-3'>
                            <SelYear
                                category={2}
                                label={'民國'}
                                value={pageData.year}
                                onChange={(p) => {
                                    setPageData((pre) => ({ ...pre, year: p.value }));
                                }}
                            />
                        </div>
                        <div className='col-md-3'>
                            <SelHalfYear
                                style={{ width: 200 }}
                                label={'期間'}
                                value={pageData.period}
                                onChange={(p) => setPageData((pre) => ({ ...pre, period: p.value }))}
                            ></SelHalfYear>
                        </div>
                        <div className='col-md-3'></div>
                        <div className='col-md-3'></div>
                    </div>
                    <div className='row'>
                        <div className='col-md-3'></div>
                        <div className='col-md-3'></div>
                        <div className='col-md-3'></div>
                        <div className='col-md-3'>
                            <BtnClear
                                onClick={() => {
                                    setPageData(initData);
                                }}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-12'>
                            {isLoading && loadingPanel}
                            <Grid data={pageData.scores}>
                                <Column title='業務' field='ItemName' />
                                <Column title='部門' field='Dept_Name' />
                                <Column
                                    title='流程狀態'
                                    cells={{
                                        data: (p) => (
                                            <td>
                                                {_.isNil(p.dataItem.Flow_Status)
                                                    ? ''
                                                    : mapNodeName(common, 'FLOWAppr', p.dataItem.Flow_Status)}
                                            </td>
                                        ),
                                    }}
                                />
                                <Column
                                    cells={{
                                        data: (p) =>
                                            CommandCell({
                                                ...p,
                                                showDialog,
                                                selectappr: (p) => {
                                                    setPageData((pre) => ({ ...pre, appr: p }));
                                                },
                                            }),
                                    }}
                                />
                            </Grid>
                        </div>
                    </div>
                </CardBody>
            </Card>
            {pageData.showScore && (
                <ScoreBoard loading={pageData.scDetailLoading} onClose={closeDialog} data={pageData.scDetail} />
            )}
        </div>
    );
};

export default Appr16;
