import { apiEP_UpdateEPMainAfter } from '@/api';
import { DPicker } from '@/components/date-input';
import { getTimeString, handleErrorSw } from '@/share/common';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Label } from '@progress/kendo-react-labels';
import { useState } from 'react';

export const ACEp0201 = ({ onClose, data, setIsOkToSubmit, mainData, showNoti, refreshMainData, ...otherprops }) => {
    const [dlgData, setDlgData] = useState({
        rvTime: !!mainData.ReviewDate
            ? getTimeString(mainData.ReviewDate, 'YYYY-MM-DD')
            : getTimeString(new Date(), 'YYYY-MM-DD'),
    });

    const onSave = async () => {
        mainData.ReviewDate = dlgData.rvTime;

        await apiEP_UpdateEPMainAfter(mainData).catch(handleErrorSw);
        setIsOkToSubmit(true);
        await refreshMainData();
        showNoti();
        onClose();
    };

    return (
        <Dialog width={'40%'} height={'50%'} title=' ' onClose={onClose}>
            <div className='row'>
                <div className='col-md-12'>
                    <Label>審議日期</Label>
                    <DPicker value={dlgData.rvTime} onChange={(p) => setDlgData({ rvTime: p.value })} />
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
