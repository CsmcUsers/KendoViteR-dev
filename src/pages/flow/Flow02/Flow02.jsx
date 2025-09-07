import { apiFlowTakeBack } from '@/api';
import { Btn_Reload } from '@/components/button';
import { BtnClear } from '@/components/button/K_Button';
import { FlowSignList, FlowSignLogV2 } from '@/components/flow';
import { loadingPanel } from '@/components/K_Common';
import { NotiGroup } from '@/components/K_Notify';
import { _common_ignore_notify } from '@/data/result';
import { serv_flow_GetSignedList } from '@/service';
import { handleErrorSw, showAndVanish, sleep } from '@/share/common';
import { useFlowContext, useTokenContext, useUserContext } from '@/share/context';
import { useLoading } from '@/share/hook';
import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import dayjs from 'dayjs';
import _, { filter, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as FilterContent from '../components/FilterContent';
import { ContentDisplay } from '../components/SignContent';
import { getMainData } from '../service/flowservice';

const initCon = {
    timePeriod: {
        start: dayjs().add(-7, 'days').format('YYYY-MM-DD'),
        end: dayjs().format('YYYY-MM-DD'),
    },
    funcType: null,
    status: null,
};

const Flow02 = (props) => {
    const [loading, startLoading, finishLoading] = useLoading();

    const { flowtypes } = useUserContext();

    const {
        userToken: { UseID, IsSupper },
        SetAuth,
        getSupper,
    } = useTokenContext();

    const [pd, setPd] = useState({
        signList: [],
        condition: initCon,
        submitOkNoti: false,
        rejectOkNoti: false,
        selectNode: null,
        mainData: null,
        isOpenSignDialog: false,
        isShowConfirm: false,
        logs: [],
    });

    const [noti, setNoti] = useState({ showTakeBack: false });

    const [funcTypeCon, setFuncTypeCon] = useState({});

    const { refreshFlowData } = useFlowContext();

    let params = useParams();

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

    /**
     * 點選該筆簽核資料
     * @param {*} selectNode
     */
    const onSignListSelect = async (selectNode) => {
        let samesheetlog = filter(pd.signList, {
            Func_PK: selectNode.Func_PK,
            Func_str_PK: selectNode.Func_str_PK,
        });

        try {
            let mainData = await getMainData(samesheetlog[0]);
            setPd((prestate) => ({ ...prestate, selectNode: samesheetlog[0], mainData }));
            openSignDialog();
        } catch (e) {
            console.log(e.toString());
            Swal.fire('取主檔失敗請聯絡系統管理員', selectNode.Func_type, 'error');
            closeSignDialog();
        }
    };

    const preTakeBack = () => {
        setPd((pre) => ({ ...pre, isShowConfirm: true }));
    };

    const handleTakeBack = async () => {
        try {
            await apiFlowTakeBack({
                maindata: pd.mainData,
                node: pd.selectNode,
            });

            showAndVanish(setNoti, 'showTakeBack');
        } catch (e) {
            handleErrorSw(e);
        } finally {
            setPd((pre) => ({ ...pre, isOpenSignDialog: false, isShowConfirm: false }));
            refresh();
        }
    };

    const refresh = async () => {
        startLoading();

        await sleep(400);

        let logs = await serv_flow_GetSignedList(pd.condition, funcTypeCon);

        setPd((pre) => ({
            ...pre,
            signList: _.filter(logs, (p) => !_common_ignore_notify.includes(p.Func_type)),
        }));

        await refreshFlowData();

        finishLoading();

        if (params.hasOwnProperty('id')) {
            setPd({ ...pd, selectNode: { FuncStrPK: params.id, FuncType: params.funcType } });
        }
    };

    useEffect(() => {
        refresh();
    }, [pd.condition, funcTypeCon]);

    let isLastSend = isEmpty(pd.logs) ? false : pd.logs[pd.logs.length - 1].Assign_Uid === UseID;

    //草稿和結案不可取回
    let isOkTakeBack = [0, 99].includes(pd?.mainData?.Flow_Status) || !isLastSend;

    return (
        <div className='k-card-list'>
            <Card>
                <CardHeader>
                    <CardTitle>{props.displayName}</CardTitle>
                </CardHeader>
                <CardBody>
                    <FilterContent.CommonFilter
                        showType={true}
                        value={pd.condition}
                        clearData={(e) => {
                            setPd({
                                ...pd,
                                condition: { ...pd.condition, [e.target.name]: null },
                            });
                        }}
                        onChange={(e) => {
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
                                    noicon={false}
                                    style={{ width: 150 }}
                                    onClick={() => {
                                        setPd({ ...pd, condition: initCon });
                                    }}
                                ></BtnClear>
                            </ButtonGroup>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle style={{ display: 'inline' }}>
                        <span onClick={() => getSupper()}>{`清`}</span>
                        <span>單</span>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <div className='row'>
                        <div className='col12'>
                            {loading && loadingPanel}
                            <FlowSignList
                                showType={true}
                                selectName='觀看'
                                data={pd.signList}
                                onClick={onSignListSelect}
                            ></FlowSignList>
                        </div>
                    </div>
                </CardBody>
            </Card>

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

                        {/* -------------------------------------------簽核紀錄------------------------------------------ */}
                        <Card>
                            <CardHeader>
                                <CardTitle>簽核紀錄</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <FlowSignLogV2
                                    getLogs={(p) => setPd((pre) => ({ ...pre, logs: p }))}
                                    selNode={pd.selectNode}
                                ></FlowSignLogV2>
                            </CardBody>
                        </Card>
                        {/* -------------------------------------------簽核紀錄------------------------------------------ */}
                    </div>
                    <DialogActionsBar>
                        <Button
                            className={{ fontSize: 18, fontWeight: 'bold' }}
                            themeColor={'primary'}
                            disabled={isOkTakeBack}
                            onClick={preTakeBack}
                        >
                            取回
                        </Button>

                        <Button className={{ fontSize: 18, fontWeight: 'bold' }} onClick={closeSignDialog}>
                            關閉
                        </Button>
                    </DialogActionsBar>

                    {/* -------------------------------------------取回確認視窗------------------------------------------ */}
                    {pd.isShowConfirm && (
                        <Dialog
                            title={'是否要取回'}
                            width={'40%'}
                            height={'40%'}
                            onClose={() => setPd((pre) => ({ ...pre, isShowConfirm: false }))}
                        >
                            <div className='row'>
                                <div className='col-md-12'>
                                    <ul>
                                        <li>
                                            <Label style={{ color: 'red', fontSize: '18px' }}>
                                                PS:取回後請去【待簽核頁面】或 【起單功能頁】
                                            </Label>
                                        </li>
                                        <li>
                                            <Label style={{ color: 'red', fontSize: '18px' }}>
                                                下一節點如果已簽核，則無法取回
                                            </Label>
                                        </li>
                                        <li>
                                            <Label style={{ color: 'red', fontSize: '18px' }}>
                                                如果有【並簽】或【會簽】有人簽核過則無法取回
                                            </Label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <DialogActionsBar>
                                <Button themeColor={'primary'} disabled={isOkTakeBack} onClick={handleTakeBack}>
                                    確認
                                </Button>
                                <Button onClick={() => setPd((pre) => ({ ...pre, isShowConfirm: false }))}>取消</Button>
                            </DialogActionsBar>
                        </Dialog>
                    )}
                </Dialog>
            )}

            <NotiGroup
                notis={[
                    {
                        isShow: noti.showTakeBack,
                        style: 'success',
                        onClose: () => {
                            setPd({ ...pd, showTakeBack: false });
                        },
                        text: '取回成功',
                    },
                ]}
            />
        </div>
    );
};

export default Flow02;
