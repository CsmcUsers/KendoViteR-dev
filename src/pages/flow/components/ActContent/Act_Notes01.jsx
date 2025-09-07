import { apiNotes_UpdateTerEnterApply } from '@/api';
import { DTPicker } from '@/components/date-input';
import { handleErrorSw } from '@/share/common';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Label } from '@progress/kendo-react-labels';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useState } from 'react';

export const ACNotes01 = ({ onClose, data, setIsOkToSubmit, mainData, showNoti, refreshMainData, ...otherprops }) => {
    let timename = '';
    let loginTime = null;

    switch (mainData.Flow_Status) {
        case 3:
            timename = '進入時間';
            loginTime = mainData.EnterTime;
            break;
        case 4:
            timename = '出來時間';
            loginTime = mainData.LeaveTime;
            break;
    }

    const [dialogData, setDialogData] = useState({
        loginTime: isEmpty(loginTime)
            ? dayjs().format('YYYY-MM-DD HH:mm:ss')
            : dayjs(loginTime).format('YYYY-MM-DD HH:mm:ss'),
    });

    const onSave = async () => {
        if (mainData.Flow_Status === 3) {
            mainData.EnterTime = dialogData.loginTime;
        } else {
            mainData.LeaveTime = dialogData.loginTime;
        }

        await apiNotes_UpdateTerEnterApply(mainData).catch(handleErrorSw);
        setIsOkToSubmit(true);
        await refreshMainData();
        showNoti();
        onClose();
    };

    return (
        <Dialog width={'40%'} height={'40%'} title=' ' onClose={onClose}>
            <div className='row'>
                <div className='col-md-12'>
                    <Label>{timename}</Label>
                    <DTPicker
                        value={dialogData.loginTime}
                        size={'small'}
                        onChange={(p) => setDialogData({ loginTime: p })}
                    />
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
