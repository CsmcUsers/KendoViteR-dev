import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input, TextArea } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import React from 'react';
import { colalignend, colalignstart } from '@/share/css/col';

export const DialogEdit = ({ selectItem, onSave, closeDialog, updateItem }) => {
    return (
        <Dialog title={' '} height={'65%'} width={'60%'} onClose={closeDialog}>
            <div className='row'>
                <div className='col-md-6'>
                    <Label>業務項目代號 {selectItem.FuncId}</Label>
                </div>
                <div className='col-md-6'>
                    <Input
                        type={'text'}
                        name={'ItemName'}
                        value={selectItem?.ItemName}
                        label={'業務名稱'}
                        onChange={(p) => updateItem(p)}
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-6'>
                    <Input
                        type={'number'}
                        name={'Top_Score'}
                        value={selectItem?.Top_Score}
                        label={'最高分數'}
                        onChange={(p) => updateItem(p)}
                    />
                </div>
                <div className={'col-md-2 ' + colalignend}>
                    <Label>{'備註'}</Label>
                </div>
                <div className={'col-md-4 ' + colalignstart}>
                    <TextArea name='Memo' value={selectItem?.Memo || ''} onChange={(p) => updateItem(p)} />
                </div>
            </div>
            <DialogActionsBar>
                <Button onClick={onSave}>存檔</Button>
                <Button onClick={closeDialog}>取消</Button>
            </DialogActionsBar>
        </Dialog>
    );
};
