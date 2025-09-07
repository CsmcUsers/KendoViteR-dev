import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import { chain } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { apiAuthGetFunctionAll } from '@/api';
import { loadingPanel } from '@/components/K_Common';
import { NotiGroup } from '@/components/K_Notify';
import { Btn_Reload } from '@/components/button';
import { FlowReturnList, FlowSignLogV2 } from '@/components/flow';
import { sleep } from '@/share/common';
import { useFlowContext, useUserContext } from '@/share/context';
import { useLoading } from '@/share/hook';
import { ContentDisplay } from '../components/SignContent';
import { getMainData } from '../service/flowservice';

const Flow04 = (props) => {
    const [loading, startLoading, finishLoading] = useLoading();

    const [pd, setPd] = useState({
        selectNode: null,
        mainData: null,
        isOpenDialog: false,
        logs: [],
        funcs: [],
    });

    const { flowtypes } = useUserContext();

    const { flowData, refreshFlowData } = useFlowContext();

    const navigate = useNavigate();

    /**
     * 開啟主簽核單
     */
    const openSignDialog = () => {
        setPd((pre) => ({ ...pre, isOpenDialog: true }));
    };

    /**
     * 關閉主簽核單
     */
    const closeSignDialog = () => {
        setPd((pre) => ({ ...pre, isOpenDialog: false }));
    };

    /**
     * 點選該筆簽核資料
     * @param {*} selectNode
     */
    const onSignListSelect = async (selectNode) => {
        try {
            let mainData = await getMainData(selectNode);
            setPd((pre) => ({ ...pre, selectNode: selectNode, mainData }));
            openSignDialog();
        } catch (e) {
            console.log(e.toString());
            Swal.fire('取主檔失敗請聯絡系統管理員', selectNode.Func_type, 'error');
            closeSignDialog();
        }
    };

    const navigateToEdit = () => {
        if (_.isEmpty(pd.selectNode)) {
            Swal.fire('請先點選一筆資料');
            return;
        }
        let findFuncItem = (d) => chain(pd.funcs).find(d).value();
        let funcItem = null;

        if (pd.selectNode.Func_type === 'CM01') {
            navigate('/cmr/cmr01');
        } else if (pd.selectNode.Func_type === 'FLOWAppr') {
            funcItem = findFuncItem((p) => p.FuncId === pd.mainData.Type_Id);

            navigate(funcItem.Path);
        } else {
            funcItem = findFuncItem((p) => p.FuncId === pd.selectNode.Func_type);

            navigate(funcItem.Path);
        }
    };

    /**
     * 取所有待簽核資料
     */
    const refresh = async () => {
        startLoading();
        await sleep(400);

        await refreshFlowData();
        let returnList = flowData.returnlist;

        finishLoading();

        setPd((pre) => ({ ...pre, returnlist: _.orderBy(returnList, ['Create_datetime'], ['desc']) }));
    };

    const getAllFunc = async () => {
        let { data: funcs } = await apiAuthGetFunctionAll();
        setPd((pre) => ({ ...pre, funcs }));
    };

    useEffect(() => {
        getAllFunc();
    }, []);

    return (
        <div className='k-card-list'>
            <Card>
                <CardHeader>
                    <CardTitle>{props.displayName}</CardTitle>
                </CardHeader>

                <CardBody>
                    <div className='row'>
                        <div className='col3'></div>
                        <div className='col3' style={{ textAlign: 'start' }}></div>
                        <div className='col3'></div>
                        <div className='col3' style={{ textAlign: 'start' }}>
                            <ButtonGroup>
                                <Btn_Reload style={{ width: 150 }} onClick={refresh} onRefresh={refresh} />
                            </ButtonGroup>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>{`清單`}</CardTitle>
                </CardHeader>
                <CardBody>
                    <div className='row'>
                        <div className='col12'>
                            {loading && loadingPanel}
                            <FlowReturnList
                                selectName='觀看'
                                data={flowData.returnlist}
                                onClick={onSignListSelect}
                            ></FlowReturnList>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {pd.isOpenDialog && (
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
                                <FlowSignLogV2 selNode={pd.selectNode}></FlowSignLogV2>
                            </CardBody>
                        </Card>
                        {/* -------------------------------------------簽核紀錄------------------------------------------ */}
                    </div>

                    <DialogActionsBar>
                        <Button
                            style={{ fontSize: 18, fontWeight: 'bold' }}
                            themeColor={'primary'}
                            onClick={navigateToEdit}
                        >
                            去修改
                        </Button>

                        <Button className='text-lg font-bold' onClick={closeSignDialog}>
                            關閉
                        </Button>
                    </DialogActionsBar>

                    {/* -------------------------------------------退件確認視窗------------------------------------------ */}

                    <NotiGroup
                        notis={[
                            {
                                isShow: pd.noti,
                                style: 'success',
                                onClose: () => {
                                    setPd({ ...pd, noti: false });
                                },
                                text: '取回成功',
                            },
                        ]}
                    />
                    {/* -------------------------------------------退件確認視窗------------------------------------------ */}
                </Dialog>
            )}
        </div>
    );
};

export default Flow04;
