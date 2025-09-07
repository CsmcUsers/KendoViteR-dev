import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { TextArea } from '@progress/kendo-react-inputs';
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import _, { chain } from 'lodash';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { apiFlowGetFlowLogtoSign, apiFlowReject, apiFlowTrans } from '@/api';
import { loadingPanel } from '@/components/K_Common';
import { NotiGroup } from '@/components/K_Notify';
import { Btn_Reload, BtnClear, BtnReject } from '@/components/button';
import { FlowSignList, FlowSignLogV2 } from '@/components/flow';
import { FlowNextInfo } from '@/components/flow/flow-next-info';
import { handleErrorSw, showAndVanish, sleep } from '@/share/common';
import { useFlowContext, useUserContext } from '@/share/context';
import { colalignstart } from '@/share/css';
import { useLoading } from '@/share/hook';
import { _common_ignore_notify } from '@/data/result';
import { ActionArea } from '../components/ActContent';
import * as FilterContent from '../components/FilterContent';
import { ContentDisplay } from '../components/SignContent';
import { getMainData } from '../service/flowservice';

const initCon = {
    timePeriod: {
        start: null,
        end: null,
    },
    funcType: null,
    status: null,
};

const Flow01 = (props) => {
    const [loading, startLoading, finishLoading] = useLoading();

    const [isOkToSubmit, setIsOkToSubmit] = useState(false);

    const { refreshFlowData } = useFlowContext();

    const { flowtypes } = useUserContext();

    const [pd, setPd] = useState({
        signList: [], //待簽核清單
        condition: initCon,
        selectNode: null, //就是TB_Flow_log 可以看作流程節點
        mainData: null,
        memo: '',
        isOpenSignDialog: false,
        isShowConfirm: false,
        noti: false,
        notiReject: false,
        notiSubmitOk: false,
        isShowNextFlow: false,
        isNextFlowTargetOK: false,
    });

    const [funcTypeCon, setFuncTypeCon] = useState({});

    const preSubmit = () => {
        if (!isOkToSubmit) {
            Swal.fire('請完成必要的動作才能執行');
            return;
        }
        if (_.isEmpty(pd.selectNode)) {
            Swal.fire('請先點選一筆資料');
            return;
        }

        setPd({
            ...pd,
            isShowNextFlow: true,
        });
    };

    /**
     * 送出
     * @returns
     */
    const onSubmit = async (p) => {
        try {
            await apiFlowTrans(pd.mainData, pd.selectNode, pd.memo, p);

            await getFlowLogtoSign();

            closeSignDialog();

            showAndVanish(setPd, 'notiSubmitOk', 1e3);

            setPd((prestate) => ({ ...prestate, selectNode: null, mainData: null, memo: '' }));
        } catch (e) {
            handleErrorSw(e);
        }
    };

    /**
     * 點選該筆簽核資料
     * @param {*} selectNode
     */
    const onSignListSelect = async (selectNode) => {
        try {
            let mainData = await getMainData(selectNode);
            setPd((prestate) => ({ ...prestate, selectNode: selectNode, mainData }));
            openSignDialog();
        } catch (e) {
            console.log(e.toString());
            Swal.fire('取主檔失敗請聯絡系統管理員', selectNode.Func_type, 'error');
            closeSignDialog();
        }
    };

    /**
     * 退件
     * @returns
     */
    const handleReject = async () => {
        if (_.isEmpty(pd.selectNode)) {
            Swal.fire('請先點選一筆資料');
            return;
        }

        try {
            setPd((prestate) => ({
                ...prestate,
                selectNode: null,
                mainData: null,
                memo: '',
                isShowConfirm: false,
                isOpenSignDialog: false,
            }));

            await apiFlowReject({
                maindata: pd.mainData,
                node: pd.selectNode,
                memo: pd.memo,
            });

            await getFlowLogtoSign();

            showAndVanish(setPd, 'notiReject', 1e3);
        } catch (e) {
            handleErrorSw(e);
        }
    };

    /**
     * 取所有待簽核資料
     */
    const getFlowLogtoSign = async () => {
        startLoading();
        await sleep(400);

        let { data } = await apiFlowGetFlowLogtoSign({
            ...pd.condition,
            funcTypeCon,
        });

        let tosignlist = chain(data)
            .filter((p) => p.Next_flow_status !== -1)
            .filter((p) => !_common_ignore_notify.includes(p.Func_type))
            .value();

        finishLoading();

        await refreshFlowData();

        setPd((pre) => ({ ...pre, signList: _.orderBy(tosignlist, ['Create_datetime'], ['desc']) }));
    };

    /**
     * 開啟主簽核單
     */
    const openSignDialog = () => {
        setPd((pre) => ({ ...pre, isOpenSignDialog: true }));
    };

    /**
     * 關閉主簽核單
     */
    const closeSignDialog = () => {
        setPd((pre) => ({ ...pre, isOpenSignDialog: false }));
    };

    const refresh = async () => {
        try {
            await getFlowLogtoSign();
        } catch (e) {
            handleErrorSw(e);
        }
    };

    useEffect(() => {
        refresh();
    }, [pd.condition, funcTypeCon]);

    return (
        <div className='k-card-list'>
            <Card>
                <CardHeader>
                    <CardTitle>{props.displayName}</CardTitle>
                </CardHeader>
                <CardBody>
                    <FilterContent.CommonFilter
                        value={pd.condition}
                        clearData={(e) => {
                            setPd({
                                ...pd,
                                condition: { ...pd.condition, [e.target.name]: null },
                            });
                        }}
                        onChange={(e) => {
                            console.log(e);
                            setPd({
                                ...pd,
                                condition: { ...pd.condition, [e.target.props.name]: e.value },
                            });
                        }}
                    />
                    <div className='row'>
                        <div className='col3' style={{ textAlign: 'start' }}></div>
                        <div className='col3' style={{ textAlign: 'start' }}></div>
                        <div className='col3' style={{ textAlign: 'start' }}></div>
                        <div className='col3' style={{ textAlign: 'start' }}>
                            <ButtonGroup>
                                <Btn_Reload style={{ width: 150 }} onClick={refresh} onRefresh={refresh} />
                                <BtnClear
                                    style={{ width: 150 }}
                                    noicon={false}
                                    onClick={() => {
                                        setPd({ ...pd, condition: initCon });
                                    }}
                                ></BtnClear>
                            </ButtonGroup>
                        </div>
                    </div>
                </CardBody>
            </Card>
            {/* -------------------------------------------待簽核清單------------------------------------------ */}
            <Card>
                <CardHeader>
                    <CardTitle>待簽核清單</CardTitle>
                </CardHeader>
                <CardBody>
                    <div className='row'>
                        <div className='col12'>
                            {loading && loadingPanel}
                            <FlowSignList
                                data={pd.signList}
                                onClick={onSignListSelect}
                                flowtypes={flowtypes}
                            ></FlowSignList>
                        </div>
                    </div>
                </CardBody>
            </Card>
            {/* -------------------------------------------待簽核清單------------------------------------------ */}

            <NotiGroup
                notis={[
                    {
                        isShow: pd.notiSubmitOk,
                        style: 'success',
                        onClose: () => {
                            setPd({ ...pd, notiSubmitOk: false });
                        },
                        text: '同意',
                    },
                    {
                        isShow: pd.notiReject,
                        style: 'success',
                        onClose: () => {
                            setPd({ ...pd, notiReject: false });
                        },
                        text: '退件成功',
                    },
                ]}
            />
            {pd.isOpenSignDialog && (
                <Dialog title={'簽核作業'} width={'98%'} height={'95%'} onClose={closeSignDialog}>
                    <div className='k-card-list'>
                        {/* -------------------------------------------表單內容------------------------------------------ */}
                        <Card>
                            <CardHeader>
                                <CardTitle>{` 表單內容 【${flowtypes[pd.selectNode?.Func_type]}】 編號: ${
                                    pd.selectNode?.Func_type
                                }_${pd.selectNode.Func_PK || pd.selectNode.Func_str_PK}`}</CardTitle>
                            </CardHeader>
                            <CardBody>
                                {/* 取得mainData資料 */}
                                <ContentDisplay
                                    loading={loading}
                                    selNode={pd.selectNode}
                                    mainData={pd.mainData}
                                    onClose={closeSignDialog}
                                ></ContentDisplay>
                            </CardBody>
                        </Card>
                        {/* -------------------------------------------表單內容------------------------------------------ */}
                        <div className='k-card-deck'>
                            {/* -------------------------------------------操作區------------------------------------------ */}
                            <Card style={{ width: '50%' }}>
                                <CardHeader>
                                    <CardTitle>操作區</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <ActionArea
                                                data={pd.selectNode}
                                                mainData={pd.mainData}
                                                isOkToSubmit={isOkToSubmit && !_.isEmpty(pd.mainData)}
                                                setIsOkToSubmit={setIsOkToSubmit}
                                                refreshMainData={() => {
                                                    getMainData(pd.selectNode).then((p) => {
                                                        setPd((pre) => ({ ...pre, mainData: p }));
                                                    });
                                                }}
                                                showNoti={() => showAndVanish(setPd, 'noti', 2e3)}
                                            ></ActionArea>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'></div>
                                        <div className='col-md-6'></div>
                                    </div>
                                </CardBody>
                            </Card>
                            {/* -------------------------------------------操作區------------------------------------------ */}
                            <Card style={{ width: '50%' }}>
                                <CardHeader>
                                    <CardTitle>簽核意見</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className='row'>
                                        <div className='col-md-12'>
                                            <TextArea
                                                defaultValue={''}
                                                rows={5}
                                                style={{ width: '100%' }}
                                                onChange={(p) => setPd({ ...pd, memo: p.value })}
                                                value={pd.memo}
                                            ></TextArea>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className={'col-md-6 ' + colalignstart}></div>
                                        <div className='col-md-6'></div>
                                    </div>
                                </CardBody>
                            </Card>
                        </div>

                        {/* -------------------------------------------簽核紀錄------------------------------------------ */}
                        <Card>
                            <CardHeader>
                                <CardTitle>簽核紀錄</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <FlowSignLogV2 selNode={pd.selectNode}></FlowSignLogV2>
                            </CardBody>
                        </Card>
                        {/* -------------------------------------------簽核紀錄------------------------------------------ */}
                    </div>
                    <DialogActionsBar>
                        <Button
                            className='text-lg font-bold'
                            themeColor={'primary'}
                            disabled={!isOkToSubmit}
                            onClick={preSubmit}
                        >
                            同意
                        </Button>

                        <BtnReject
                            className='text-lg font-bold'
                            onClick={() => setPd((pre) => ({ ...pre, isShowConfirm: true }))}
                        ></BtnReject>
                        <Button className='text-lg font-bold' onClick={closeSignDialog}>
                            關閉
                        </Button>
                    </DialogActionsBar>
                    {pd.isShowNextFlow && (
                        <FlowNextInfo
                            data={pd.mainData}
                            selNode={pd.selectNode}
                            funcType={pd.selectNode.Func_type}
                            onSubmit={onSubmit}
                            onFinishSubmit={refresh}
                            onClose={() => setPd((pre) => ({ ...pre, isShowNextFlow: false }))}
                        />
                    )}
                    {/* -------------------------------------------退件確認視窗------------------------------------------ */}
                    {pd.isShowConfirm && (
                        <Dialog
                            title={'是否要退件'}
                            width={'20%'}
                            height={'20%'}
                            onClose={() => setPd((pre) => ({ ...pre, isShowConfirm: false }))}
                        >
                            <div className='row'>
                                <div className='col-md-6'></div>
                                <div className='col-md-6'></div>
                            </div>
                            <DialogActionsBar>
                                <Button themeColor={'primary'} onClick={handleReject}>
                                    確認
                                </Button>
                                <Button onClick={() => setPd((pre) => ({ ...pre, isShowConfirm: false }))}>取消</Button>
                            </DialogActionsBar>
                        </Dialog>
                    )}
                    <NotiGroup
                        notis={[
                            {
                                isShow: pd.noti,
                                style: 'success',
                                onClose: () => {
                                    setPd({ ...pd, noti: false });
                                },
                                text: '儲存成功',
                            },
                        ]}
                    />
                    {/* -------------------------------------------退件確認視窗------------------------------------------ */}
                </Dialog>
            )}
        </div>
    );
};

export default Flow01;
