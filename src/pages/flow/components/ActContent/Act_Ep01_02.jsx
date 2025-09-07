import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { useState } from 'react';
import { apiEP_UpdateEPMain } from '@/api';
import { handleErrorSw } from '@/share/common';
import { Button } from '@progress/kendo-react-buttons';

export const ACEp0102 = ({ onClose, data, setIsOkToSubmit, mainData, showNoti, refreshMainData, ...otherprops }) => {
    const [dlgData, setDlgData] = useState({
        apprNo: mainData?.ApproveNo,
    });

    const onSave = async () => {
        mainData.ApproveNo = dlgData.apprNo;

        await apiEP_UpdateEPMain(mainData).catch(handleErrorSw);
        setIsOkToSubmit(true);
        await refreshMainData();
        showNoti();
        onClose();
    };

    return (
        <Dialog width={'40%'} height={'50%'} title=' ' onClose={onClose}>
            <div className='row'>
                <div className='col-md-12'>
                    <Label>核號</Label>
                    <Input
                        name='ApproveNo'
                        value={dlgData.apprNo}
                        onChange={(p) => {
                            setDlgData({ apprNo: p.value });
                        }}
                    ></Input>
                </div>
                <div className='col-md-12'>
                    <Label>
                        <span style={{ color: 'red' }}>*</span> 若承作，請輸入
                        <span style={{ color: 'blue' }}>核號</span>，否則請輸入「
                        <span style={{ color: 'red' }}>不予承作</span>」
                    </Label>
                </div>
            </div>
            <DialogActionsBar>
                <Button themeColor={'primary'} onClick={onSave}>
                    儲存
                </Button>
                <Button onClick={onClose}>關閉</Button>
            </DialogActionsBar>
        </Dialog>
    );
};
