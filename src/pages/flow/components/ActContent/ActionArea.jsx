import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Label } from '@progress/kendo-react-labels';
import _, { isEmpty, isNil } from 'lodash';
import React, { useEffect, useState } from 'react';
import * as AC from '.';
import { apiFlowGetHit } from '@/api';

const styleprops = { fontSize: 16, width: '270px' };

export const ActionArea = ({
    data: selectNode,
    isOkToSubmit,
    setIsOkToSubmit,
    mainData,
    showNoti,
    refreshMainData,
}) => {
    const funcType = selectNode?.Func_type;

    const [hitmsg, setHitMsg] = useState('');
    const [isShowAct, setIsShowAct] = useState(false);
    const [isBtnDisable, setIsBtnDisable] = useState(false);

    let isEmptyMaster = isEmpty(selectNode);

    const closeDialog = () => {
        setIsShowAct(false);
    };

    let actionarea = (
        <Dialog title={'預設操作區'} height={'65%'} width={'60%'} onClose={closeDialog}>
            <div className='row'>
                <div className='col-md-6'>
                    <Label>請實作操作區元件</Label>
                </div>
                <div className='col-md-6'>
                    <Label>ActionArea.js</Label>
                </div>
            </div>
            <DialogActionsBar>
                <Button onClick={closeDialog}>關閉</Button>
            </DialogActionsBar>
        </Dialog>
    );

    const renderActionarea = () => {
        if (isEmptyMaster) {
            return;
        }

        const flow_status = mainData.Flow_Status;

        if (funcType === 'Notes01') {
            switch (flow_status) {
                case 2:
                    break;
                case 3:
                case 4:
                    actionarea = (
                        <AC.ACNotes01
                            onClose={closeDialog}
                            data={selectNode}
                            setIsOkToSubmit={setIsOkToSubmit}
                            mainData={mainData}
                            showNoti={showNoti}
                            refreshMainData={refreshMainData}
                        />
                    );
                    break;
            }
        }

        if (funcType === 'Notes02') {
            switch (flow_status) {
                case 6:
                    actionarea = (
                        <AC.ACNotes02_6
                            onClose={closeDialog}
                            data={selectNode}
                            setIsOkToSubmit={setIsOkToSubmit}
                            mainData={mainData}
                            showNoti={showNoti}
                            refreshMainData={refreshMainData}
                        />
                    );
                    break;
                default:
                    actionarea = (
                        <AC.ACNotes02
                            onClose={closeDialog}
                            data={selectNode}
                            setIsOkToSubmit={setIsOkToSubmit}
                            mainData={mainData}
                            showNoti={showNoti}
                            refreshMainData={refreshMainData}
                        />
                    );
            }
        }

        if (funcType === 'Notes05') {
            switch (flow_status) {
                default:
            }
        }

        if (funcType === 'Ep01') {
            switch (flow_status) {
                case 10: // 授管處經辦
                    actionarea = (
                        <AC.ACEp0101
                            onClose={closeDialog}
                            data={selectNode}
                            setIsOkToSubmit={setIsOkToSubmit}
                            mainData={mainData}
                            showNoti={showNoti}
                            refreshMainData={refreshMainData}
                        />
                    );
                    break;
                case 22: // 申請者
                    actionarea = (
                        <AC.ACEp0102
                            onClose={closeDialog}
                            data={selectNode}
                            setIsOkToSubmit={setIsOkToSubmit}
                            mainData={mainData}
                            showNoti={showNoti}
                            refreshMainData={refreshMainData}
                        />
                    );
                    break;
            }
        }

        if (funcType === 'Ep02') {
            switch (flow_status) {
                case 10: // 授管處經辦
                    actionarea = (
                        <AC.ACEp0201
                            onClose={closeDialog}
                            data={selectNode}
                            setIsOkToSubmit={setIsOkToSubmit}
                            mainData={mainData}
                            showNoti={showNoti}
                            refreshMainData={refreshMainData}
                        />
                    );
                    break;
            }
        }
    };

    const actControl = () => {
        if (isEmptyMaster) {
            return;
        }

        const nextflow_status = selectNode.Next_flow_status;

        //不需要有任何動作的functype
        if (['FLOWAppr', 'CM01', 'Notes03', 'Notes05', 'Esg02', 'Esg04', 'Esg05', 'Debt01'].includes(funcType)) {
            setIsBtnDisable(true);
            setIsOkToSubmit(true);
        }

        if (funcType === 'Notes01') {
            switch (nextflow_status) {
                case 1:
                    setIsBtnDisable(true);
                    setIsOkToSubmit(true);
                    break;
                case 2:
                    setIsBtnDisable(true);
                    setIsOkToSubmit(true);
                    break;
                case 21:
                    setIsBtnDisable(true);
                    setIsOkToSubmit(true);
                    break;
                case 3:
                    setIsOkToSubmit(!isNil(mainData?.EnterTime));
                    break;
                case 4:
                    setIsOkToSubmit(!isNil(mainData?.LeaveTime));
                    break;
            }
        }

        if (funcType === 'Notes02') {
            switch (nextflow_status) {
                case 1:
                    setIsBtnDisable(true);
                    setIsOkToSubmit(true);
                    break;
                case 3:
                    if (isNil(mainData?.DCLoginTime)) {
                        setIsOkToSubmit(false);
                    } else {
                        setIsOkToSubmit(true);
                    }
                    break;
                case 4:
                    if (isNil(mainData?.DCAdminLoginTime)) {
                        setIsOkToSubmit(false);
                    } else {
                        setIsOkToSubmit(true);
                    }
                    break;
                case 6:
                    if (isEmpty(mainData?.wl)) {
                        setIsOkToSubmit(false);
                    } else {
                        setIsOkToSubmit(true);
                    }
                    break;
                case 8:
                    setIsBtnDisable(true);
                    setIsOkToSubmit(true);
                    break;
                default:
                    setIsBtnDisable(true);
                    setIsOkToSubmit(true);
            }
        }

        if (funcType === 'Ep01') {
            switch (nextflow_status) {
                // 授管處經辦 需填寫"審議日期"
                case 10:
                    setIsOkToSubmit(!isNil(mainData?.ReviewDate));
                    break;
                // 回到申請者 需填寫"核號"
                case 22:
                    setIsOkToSubmit(!!mainData?.ApproveNo?.trim());
                    break;
                default:
                    setIsBtnDisable(true);
                    setIsOkToSubmit(true);
            }
        }

        if (funcType === 'Ep02') {
            switch (nextflow_status) {
                // 授管處經辦 需填寫"審議日期"
                case 10:
                    setIsOkToSubmit(!isNil(mainData?.ReviewDate));
                    break;
                default:
                    setIsBtnDisable(true);
                    setIsOkToSubmit(true);
            }
        }
    };

    useEffect(() => {
        if (isNil(mainData)) {
            setHitMsg('Flow01.js => getMainData not implement');
            return;
        }

        actControl();
        apiFlowGetHit(mainData, selectNode)
            .then(({ data }) => {
                setHitMsg(data);
            })
            .catch((e) => setHitMsg(e.toString()));
    }, [mainData, selectNode?.Func_type]);

    renderActionarea();

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col4 text-end'>
                    <label>提示:</label>
                </div>
                <div className='col8'>
                    <label>{hitmsg}</label>
                </div>
            </div>
            <div className='row' style={{ paddingTop: '15px' }}>
                <div className='col4 text-end'>
                    <label>操作按鈕:</label>
                </div>
                <div className='col6'>
                    <Button
                        style={styleprops}
                        type='button'
                        className='btn btn-warning btn-sm'
                        disabled={isEmptyMaster || isBtnDisable}
                        onClick={() => {
                            setIsShowAct(true);
                        }}
                    >
                        流程動作(蓋章、簽名、修改資料)
                    </Button>
                </div>
                <div className='col2' />
            </div>
            <div className='row' style={{ paddingTop: '15px' }}>
                <div className='col4 text-end'>
                    <label>是否可以呈核:</label>
                </div>
                <div className='col6'>
                    {isOkToSubmit ? (
                        <span style={styleprops} className='badge badge-info badge-lg'>
                            是
                        </span>
                    ) : (
                        <span style={styleprops} className='badge badge-warning badge-lg'>
                            否(請點選上面按鈕)
                        </span>
                    )}
                </div>
                <div className='col4' />
            </div>
            {!isEmptyMaster && isShowAct && actionarea}
        </div>
    );
};
