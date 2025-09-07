import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import _, { isNil } from 'lodash';
import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { apiAppr01, apiFlowStart } from '@/api';
import { apiFile, apiFileGetByFuncId_Pk } from '@/api/apiCommon';
import { FlowSignLog } from '@/components/flow';
import { BtnDelete, BtnDownLoad } from '@/components/button';
import { loadingPanel } from '@/components/K_Common';
import { NotiGroup } from '@/components/K_Notify';
import { SelHalfYear, SelYear } from '@/components/select/';
import { UpFile } from '@/components/upload';
import { Download, handleErrorSw, showConfirm, sleep } from '@/share/common';
import { useTokenContext } from '@/share/context';
import { mapNewInnerRole, mapNodeName, mapUserName, useUserContext } from '@/share/context/userContext';
import { useLoading } from '@/share/hook/loading';
import { getApprItems } from '../setting';
import { ScoreBoard } from './score-board';
import { useFlowStart } from '@/share/hook';
import { FlowNextInfo } from '@/components/flow/flow-next-info';

const CommandCell = (p) => {
    const { id, origin_name } = p.dataItem;

    return (
        <td>
            <ButtonGroup>
                <BtnDownLoad
                    onClick={() => {
                        Download(id, origin_name);
                    }}
                />
                <BtnDelete
                    disabled={p.isLock}
                    onClick={() => {
                        showConfirm('是否要刪除', '', () => {
                            apiFile
                                .post('DeleteFile', { id })
                                .then(() => {
                                    p.refresh();
                                })
                                .catch(handleErrorSw);
                        });
                    }}
                />
                <Button
                    disabled={p.isLock}
                    themeColor={'secondary'}
                    onClick={() => {
                        apiAppr01
                            .post('Calculate', { id, apprId: p.apprId })
                            .then(() => {
                                p.getScore();
                                p.showNoti();
                            })
                            .catch(handleErrorSw);
                    }}
                >
                    匯入成績
                </Button>
            </ButtonGroup>
        </td>
    );
};

const _funcType = 'FLOWAppr';

const TmplatePartial = (props) => {
    const [pageData, setPageData] = useState({
        year: (new Date().getFullYear() - 1911).toString(),
        period: '',
        dept: '',
        rolelv: '',
        appr: '',
        g_data: [],
        condition: {},
        emps: [],
        notiSubmit: false,
        notiCal: false,
        notiUpdate: false,
        scores: [],
        showScore: false,
        itemDic: null,
    });

    let { officialItems } = getApprItems(pageData.year, pageData.period);

    const { funcId = '' } = props;

    const [loading, startLoading, finishLoading] = useLoading();

    const isOktoGO = _.isEmpty(pageData.year) || _.isEmpty(pageData.period);

    const tokenCon = useTokenContext();

    let common = useUserContext();

    let innerUserRole = mapNewInnerRole(common, tokenCon.userToken.UseID);

    const isStartStatus = ![0, -1].includes(pageData.appr?.Flow_Status);

    const [isShowNextFlow, showFlowInfo, finishFlowStarting] = useFlowStart();

    const isUser20 = innerUserRole.map((p) => p.Role_Level).includes(20);

    const childRef = useRef();

    const refresh = async function () {
        let con = { funcId, year: pageData.year, period: pageData.period };

        if (isOktoGO) {
            return;
        }

        startLoading();

        await sleep(500);

        let { data } = await apiFileGetByFuncId_Pk(funcId, null, `${pageData.year}_${pageData.period}`);

        setPageData((pre) => ({
            ...pre,
            g_data: _.filter(data, { func_str_pk: `${pageData.year}_${pageData.period}` }),
        }));

        let { data: fromserv } = await apiAppr01.post('GetApprByYear_Period', con).catch(handleErrorSw);

        setPageData((pre) => ({
            ...pre,
            appr: _.isEmpty(fromserv) ? '' : fromserv,
        }));

        finishLoading();
    };

    const showNotiSubmit = () => {
        setPageData((pre) => ({ ...pre, notiSubmit: true }));
        sleep(2000).then(() => {
            setPageData((pre) => ({ ...pre, notiSubmit: false }));
        });
    };

    const showNotiCal = () => {
        setPageData((pre) => ({ ...pre, notiCal: true }));
        sleep(2000).then(() => {
            setPageData((pre) => ({ ...pre, notiCal: false }));
        });
    };

    const onSubmit = async (p) => {
        if (_.isEmpty(pageData.appr)) {
            return;
        }

        try {
            await apiFlowStart(pageData.appr, _funcType, p);

            await refresh();
            showNotiSubmit();
            childRef.current.dispatchRefresh();
        } catch (e) {
            handleErrorSw(e);
        }
    };

    const getScore = () => {
        apiAppr01
            .post('GetScroe', { id: pageData.appr.Id })
            .then(({ data: sc }) => {
                setPageData((pre) => ({ ...pre, scores: sc }));
            })
            .catch(handleErrorSw);
    };

    const createAppr = async () => {
        if (isOktoGO) {
            alert('請選擇【民國年】、【期間】');
            return;
        }

        let { data: newone } = await apiAppr01.post('CreateAppr', {
            funcId,
            year: pageData.year,
            period: pageData.period,
        });

        setPageData((pre) => ({
            ...pre,
            appr: newone,
        }));
    };

    const viewScore = () => {
        setPageData((pre) => ({ ...pre, showScore: true }));
    };
    useEffect(() => {
        apiAppr01.post('GetItemDic').then(({ data }) => {
            setPageData((pre) => ({ ...pre, itemDic: data }));
        });
    }, []);

    useEffect(() => {
        refresh();
    }, [pageData.year, pageData.period]);

    useEffect(() => {
        getScore();
    }, [pageData.appr.Id]);

    return (
        <div className='k-card-list'>
            <Card>
                <CardHeader>
                    <CardTitle>{`${isNil(pageData.itemDic) ? '' : pageData.itemDic[funcId]}(${funcId})`}</CardTitle>
                </CardHeader>
                <CardBody>
                    <div className='row'>
                        <div className='col3'>
                            <SelYear
                                category={2}
                                label={'民國'}
                                value={pageData.year}
                                onChange={(p) => {
                                    setPageData((pre) => ({ ...pre, year: p.value }));
                                }}
                            />
                        </div>
                        <div className='col3'>
                            <SelHalfYear
                                style={{ width: 200 }}
                                label={'期間'}
                                value={pageData.period}
                                onChange={(p) => setPageData((pre) => ({ ...pre, period: p.value }))}
                                data={
                                    ['Appr08'].includes(funcId)
                                        ? [{ id: '04', text: '下半年' }]
                                        : officialItems.includes(funcId)
                                        ? [
                                              { id: '02', text: '上半年' },
                                              { id: '04', text: '下半年' },
                                          ]
                                        : [
                                              { id: '01', text: '上半年度試算' },
                                              { id: '02', text: '上半年' },
                                              { id: '03', text: '下半年度試算' },
                                              { id: '04', text: '下半年' },
                                          ]
                                }
                            ></SelHalfYear>
                        </div>
                        <div className='col3'></div>
                        <div className='col3'></div>
                    </div>
                </CardBody>
            </Card>
            {/* 2022/10/20  去財會開會，因為各評分單位經辦皆可以由其他地方取得成績考評數據
                            所以雙方主管皆認為不用開放此區域
                            {'系統資料來源(如果沒有資料請找資訊處#309劉嘉仁)'} */}
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-3'>
                            <label>流程狀態 : {mapNodeName(common, _funcType, pageData.appr?.Flow_Status)}</label>
                        </div>
                        <div className='col-md-9'>
                            <Button
                                themeColor={'dark'}
                                onClick={() => {
                                    Download('b19b52e7-1434-4e59-b329-503fbeb3490b', 'score.xlsx');
                                }}
                            >
                                📁 下載含有分數頁籤的範本
                            </Button>
                        </div>
                    </div>{' '}
                    <div className='row'>
                        <div className='col1'>
                            <Label style={{ fontSize: 40 }}>0</Label>
                        </div>
                        <div className='col11'>
                            <Button disabled={pageData.appr?.Id} onClick={createAppr} themeColor={'primary'}>
                                建立主檔
                            </Button>
                            {pageData.appr?.Id ? `${_funcType}_${pageData.appr?.Id}` : '未建立'}
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col1'>
                            <Label style={{ fontSize: 40 }}>1</Label>
                        </div>
                        <div className='col11'>
                            <UpFile
                                funcId={funcId}
                                fileDir={funcId + '\\' + pageData.period}
                                funcStrPk={pageData.year + '_' + pageData.period}
                                disabled={!isUser20 || isOktoGO || isStartStatus}
                                callback={refresh}
                                restrictions={{
                                    allowedExtensions: ['.xlsx'],
                                }}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col1'>
                            <Label style={{ fontSize: 40 }}>2</Label>
                        </div>
                        <div className='col11'>
                            {loading && loadingPanel}
                            <Grid data={pageData.g_data} style={{ height: 200 }}>
                                <Column title='檔名' field='origin_name' />
                                <Column
                                    title='上傳時間'
                                    field='create_time'
                                    width={200}
                                    cells={{
                                        data: (p) => {
                                            const { create_time } = p.dataItem;
                                            return (
                                                <td>{dayjs(create_time).format('YYYY-MM-DD HH:mm:ss').toString()}</td>
                                            );
                                        },
                                    }}
                                />
                                <Column
                                    title='上傳人員'
                                    field='create_uid'
                                    cells={{
                                        data: (p) => (
                                            <td>
                                                {`${p.dataItem.create_uid}/` +
                                                    mapUserName(common, p.dataItem.create_uid)}
                                            </td>
                                        ),
                                    }}
                                />
                                {/* <Column title='鎖定' width={50} field='islock' /> */}
                                <Column
                                    title='動作'
                                    width={250}
                                    cells={{
                                        data: (p) =>
                                            CommandCell({
                                                ...p,
                                                refresh,
                                                showNoti: showNotiCal,
                                                getScore,
                                                isLock: isStartStatus || !isUser20,
                                                apprId: pageData.appr?.Id,
                                            }),
                                    }}
                                />
                            </Grid>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col1'>
                            <Label style={{ fontSize: 40 }}>3</Label>
                        </div>
                        <div className='col5 d-flex align-items-start'>
                            <ButtonGroup>
                                <Button themeColor={'info'} onClick={viewScore}>
                                    檢視計算成績 : {pageData.scores.length}
                                </Button>
                                <Button
                                    themeColor={'primary'}
                                    disabled={
                                        !isUser20 ||
                                        !_.includes([0, -1], pageData.appr?.Flow_Status) ||
                                        pageData.scores?.length === 0
                                    }
                                    onClick={() => {
                                        showFlowInfo();
                                    }}
                                >
                                    送審
                                </Button>
                            </ButtonGroup>
                        </div>
                        <div className='col-md-6'></div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col12'>
                            <FlowSignLog
                                ref={childRef}
                                selNode={{
                                    Func_type: _funcType,
                                    Func_PK: pageData?.appr.Id || null,
                                    Func_str_PK: null,
                                }}
                            ></FlowSignLog>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <NotiGroup
                notis={[
                    {
                        isShow: pageData.notiUpdate,
                        style: 'success',
                        onClose: () => {
                            setPageData({ ...pageData, notiUpdate: false });
                        },
                        text: '增修成功',
                    },
                    {
                        isShow: pageData.notiCal,
                        style: 'success',
                        onClose: () => {
                            setPageData({ ...pageData, notiCal: false });
                        },
                        text: '匯入成功',
                    },
                    {
                        isShow: pageData.notiSubmit,
                        style: 'success',
                        onClose: () => {
                            setPageData({ ...pageData, notiSubmit: false });
                        },
                        text: '送審成功',
                    },
                ]}
            ></NotiGroup>
            {pageData.showScore && (
                <ScoreBoard
                    data={pageData.scores}
                    onClose={() => setPageData((pre) => ({ ...pre, showScore: false }))}
                />
            )}

            {isShowNextFlow && (
                <FlowNextInfo
                    data={pageData.appr}
                    funcType={_funcType}
                    onClose={finishFlowStarting}
                    onSubmit={onSubmit}
                    onFinishSubmit={refresh}
                ></FlowNextInfo>
            )}
        </div>
    );
};

export { TmplatePartial };
