import { apiFlowGetNextInfo } from '@/api';
import { handleErrorSw, sleep } from '@/share/common';
import { mapNodeName, mapUserName, useFlowContext, useUserContext } from '@/share/context';
import { withValueField } from '@/share/hoc/select';
import { useLoading } from '@/share/hook';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Loader } from '@progress/kendo-react-indicators';
import { Label } from '@progress/kendo-react-labels';
import { assign, isEmpty, isNil } from 'lodash';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import customstyle from './flow-next-info.module.css';

const D_V = withValueField(DropDownList);

/**
 *
 * 目前只支援多選一，還不支援多選多
 * @param {*} onClose
 * @param {*} data 主要資料，不是LOG
 * @param {*} funcType 流程代碼
 * @callback requestCallback  onFinishSubmit
 * @returns
 */
export const FlowNextInfo = ({
    onClose,
    data, //主要資料，不是LOG
    funcType,
    selNode,
    isRefreshFlowData = true,
    onSubmit = (f) => f,
    onFinishSubmit = (f) => f,
}) => {
    const [dialogData, setDialogData] = useState({
        nextUids: null, //list
        nextUid: null,
        defaultUid: null,
        nextStatus: 0,
        sign_Type: null,
        selectToSign: null,
        signTime: dayjs().toDate(),
    });

    const [loading, startLoading, finishLoading] = useLoading();

    const common = useUserContext();

    const { refreshFlowData } = useFlowContext();

    const goNext = async () => {
        if (dialogData.sign_Type === 'select' && isEmpty(dialogData.selectToSign)) {
            alert('請選擇【簽核人員】');
            return;
        }

        try {
            startLoading();

            await sleep(600);

            await onSubmit({
                nextUid: dialogData.selectToSign,
                ischangeSignTime: dialogData.ischangeSignTime,
                signTime: dayjs(dialogData.signTime).toJSON(),
            });

            finishLoading();
        } catch (e) {
            handleErrorSw(e);
        } finally {
            onClose();
            await onFinishSubmit();
            isRefreshFlowData && refreshFlowData();
        }
    };

    const flowGetNextInfo = async () => {
        try {
            let {
                data: { nextUids, nextStatus, nextUid, sign_Type, defaultUid },
            } = await apiFlowGetNextInfo(data, funcType, selNode);

            setDialogData((pre) => ({
                ...pre,
                nextUid,
                nextUids,
                nextStatus,
                sign_Type,
                defaultUid,
                selectToSign: defaultUid,
            }));
        } catch (e) {
            onClose();
            handleErrorSw(e);
        } finally {
        }
    };

    useEffect(() => {
        flowGetNextInfo();
    }, []);

    let nextstepname = isNil(dialogData?.nextUids) ? '' : mapNodeName(common, funcType, dialogData.nextStatus);

    let nextApprove = isNil(dialogData?.nextUids)
        ? ''
        : dialogData?.nextUids.map((p) => `${p}/${mapUserName(common, p)}，`);

    let signRender = <></>;
    let hit = '';

    switch (dialogData.sign_Type) {
        case 'mutiToSingle':
            signRender = <Label>並簽 {nextApprove}</Label>;
            break;
        case 'mutiToEvery':
            signRender = <Label>會簽 {nextApprove}</Label>;
            break;
        case 'single':
            signRender = <Label>{` ${dialogData?.nextUid || ''}/${mapUserName(common, dialogData?.nextUid)}`}</Label>;
            break;
        case 'select':
            hit = '請選擇【簽核人員】';
            signRender = (
                <D_V
                    data={
                        dialogData?.nextUids?.map((p) =>
                            assign({ ...p }, { id: p, text: `${p}/${mapUserName(common, p)}` })
                        ) || []
                    }
                    value={dialogData.selectToSign}
                    itemRender={(li, itemProps) => {
                        const index = itemProps.index;
                        const itemChildren = (
                            <span
                                style={{
                                    color: '#00F',
                                }}
                            >
                                {li.props.children}
                            </span>
                        );
                        return React.cloneElement(li, li.props, itemChildren);
                    }}
                    valueField='id'
                    textField='text'
                    onChange={(p) => setDialogData((pre) => ({ ...pre, selectToSign: p.value }))}
                />
            );
            break;
    }

    return (
        <div>
            <Dialog
                title={'下一站資訊'}
                height={'55%'}
                width={'40%'}
                className={customstyle.myddclass}
                onClose={loading ? (f) => f : onClose}
            >
                <div className='row'>
                    <div className='col-md-6'>
                        <Label className={customstyle.lll}>下一個站點</Label>
                        <Label style={{ color: 'white' }}>{dialogData.sign_Type}</Label>
                    </div>
                    <div className='col-md-6'>
                        <Label className={customstyle.lll}>{nextstepname}</Label>
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-md-6'>
                        <Label className={customstyle.lll}>簽核人員</Label>
                    </div>
                    <div className='col-md-6'>
                        {/*最後一關不用顯示下一個簽核人員*/}
                        {dialogData.nextStatus === 99 ? '' : signRender}
                    </div>
                </div>
                <hr />
                <div className='row'>
                    <div className='col-md-6'>
                        <Label className={customstyle.lll}>提示</Label>
                    </div>
                    <div className='col-md-6'>
                        <Label className={customstyle.lll}>{hit}</Label>
                    </div>
                </div>
                <DialogActionsBar>
                    <Button themeColor={'primary'} disabled={loading} onClick={goNext}>
                        下一步
                        {loading && <Loader size='small' type={'infinite-spinner'} />}
                    </Button>
                    <Button onClick={onClose} disabled={loading}>
                        關閉
                    </Button>
                </DialogActionsBar>
            </Dialog>
        </div>
    );
};
