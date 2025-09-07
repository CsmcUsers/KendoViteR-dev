import { apiNotesGetWorkList, apiNotesUpdateEnterApply } from '@/api';
import { DTPicker } from '@/components/date-input';
import { InlineCommandCell } from '@/components/grid-cell/inline-command-cell';
import { generateId, handleErrorSw } from '@/share/common';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { GridColumn as Column, Grid, GridToolbar } from '@progress/kendo-react-grid';
import { Label } from '@progress/kendo-react-labels';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

export const ACNotes02 = ({ onClose, data, setIsOkToSubmit, mainData, showNoti, refreshMainData, ...otherprops }) => {
    let loginTime =
        mainData.Flow_Status === 3
            ? mainData.DCLoginTime
            : mainData.Flow_Status === 4
            ? mainData.DCAdminLoginTime
            : null;

    const [dialogData, setDialogData] = useState({
        loginTime: isEmpty(loginTime)
            ? dayjs().format('YYYY-MM-DD HH:mm:ss')
            : dayjs(loginTime).format('YYYY-MM-DD HH:mm:ss'),
    });

    const onSave = async () => {
        if (mainData.Flow_Status === 3) {
            mainData.DCLoginTime = dialogData.loginTime;
        } else {
            mainData.DCAdminLoginTime = dialogData.loginTime;
        }
        await apiNotesUpdateEnterApply(mainData).catch(handleErrorSw);
        setIsOkToSubmit(true);
        await refreshMainData();
        showNoti();
        onClose();
    };

    return (
        <Dialog width={'40%'} height={'50%'} title=' ' onClose={onClose}>
            <div className='row'>
                <div className='col-md-12'>
                    <Label>登入時間</Label>
                    <DTPicker value={dialogData.loginTime} onChange={(p) => setDialogData({ loginTime: p })} />
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

export const ACNotes02_6 = ({
    onClose,
    data: selNode,
    setIsOkToSubmit,
    mainData,
    showNoti,
    refreshMainData,
    ...otherprops
}) => {
    const [dialogData, setDialogData] = useState({
        loginTime: null,
        worklist: [],
        editTmp: null,
    });

    const discard = () => {
        const newData = [...dialogData.worklist];
        newData.splice(0, 1);
        setDialogData((pre) => ({ ...pre, worklist: newData }));
    };

    const cancel = (dataItem) => {
        const originalItem = dialogData.worklist.find((p) => p.Id === dataItem.Id);
        const newData = dialogData.worklist.map((item) => (item.Id === originalItem.Id ? dialogData.editTmp : item));
        setDialogData((pre) => ({ ...pre, worklist: newData }));
    };

    const enterEdit = (dataItem) => {
        let edititem = find(dialogData.worklist, (p) => p.Id === dataItem.Id);
        setDialogData((pre) => ({
            ...pre,
            worklist: dialogData.worklist.map((item) =>
                item.Id === dataItem.Id
                    ? {
                          ...item,
                          inEdit: true,
                      }
                    : item
            ),
            editTmp: edititem,
        }));
    };

    const itemChange = (event) => {
        const newData = dialogData.worklist.map((item) =>
            item.Id === event.dataItem.Id
                ? {
                      ...item,
                      [event.field || '']: event.value,
                  }
                : item
        );
        setDialogData((pre) => ({
            ...pre,
            worklist: newData,
        }));
    };

    const addNew = () => {
        const newDataItem = {
            inEdit: true,
        };
        setDialogData((pre) => ({
            ...pre,
            worklist: [newDataItem, ...dialogData.worklist],
        }));
    };

    const add = (dataItem) => {
        dataItem.inEdit = true;
        const newData = insertItem(dataItem);
        setDialogData((pre) => ({
            ...pre,
            worklist: newData,
        }));
    };

    const insertItem = (item) => {
        let id = generateId(dialogData.worklist);
        item.Id = id;
        item.inEdit = false;
        return dialogData.worklist;
    };
    const updateItem = (item) => {
        let index = dialogData.worklist.findIndex((record) => record.Id === item.Id);
        dialogData.worklist[index] = item;
        return dialogData.worklist;
    };

    const update = (dataItem) => {
        dataItem.inEdit = false;
        const newData = updateItem(dataItem);
        setDialogData((pre) => ({
            ...pre,
            worklist: newData,
        }));
    };

    const deleteItem = (item) => {
        let index = dialogData.worklist.findIndex((record) => record.Id === item.Id);
        dialogData.worklist.splice(index, 1);
        return dialogData.worklist;
    };

    const remove = (dataItem) => {
        const newData = [...deleteItem(dataItem)];
        setDialogData((pre) => ({
            ...pre,
            worklist: newData,
        }));
    };

    const refreshWorkList = async () => {
        try {
            let { data: worklist } = await apiNotesGetWorkList({ Id: selNode?.Func_PK });

            setDialogData((pre) => ({ ...pre, worklist }));
        } catch (e) {
            handleErrorSw(e);
        }
    };

    const onSave = async () => {
        await apiNotesUpdateEnterApply({ ...mainData, worklist: dialogData.worklist }).catch(handleErrorSw);
        setIsOkToSubmit(true);
        await refreshMainData();
        await refreshWorkList();
        showNoti();
        onClose();
    };

    useEffect(() => {
        refreshWorkList();
    }, []);

    const CommandCell = (props) => (
        <InlineCommandCell
            {...props}
            edit={enterEdit}
            remove={remove}
            add={add}
            discard={discard}
            update={update}
            cancel={cancel}
            editField={'inEdit'}
            idname='Id'
            confirm={(p) => confirm('是否刪除 作業名稱 :' + p.WorkName)}
        />
    );

    return (
        <Dialog width={'60%'} height={'50%'} title=' ' onClose={onClose}>
            <div className='row'>
                <div className='col-md-12'>
                    <Grid data={dialogData.worklist} onItemChange={itemChange} editField={'inEdit'}>
                        <GridToolbar>
                            <Button size={'small'} themeColor={'primary'} onClick={addNew}>
                                新增
                            </Button>
                        </GridToolbar>
                        <Column title='作業名稱' field='WorkName' />
                        <Column title='作業內容及注意事項' field='WorkDetail' />
                        <Column title='作業時間' field='WorkTime' editor='text' />
                        <Column cells={{ CommandCell }} />
                    </Grid>
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
