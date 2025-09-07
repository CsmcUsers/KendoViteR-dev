import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import { TextArea } from '@progress/kendo-react-inputs';
import { Tooltip } from '@progress/kendo-react-tooltip';
import _, { isNil } from 'lodash';
import dayjs from 'dayjs';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { apiFlowEditLogTime, apiFlowGet_FlowLogByID } from '../../api/apiFlow';
import { handleErrorSw } from '../../share/common';
import { mapNodeName, mapUserName, useUserContext } from '../../share/context/userContext';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Button } from '@progress/kendo-react-buttons';
import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import { Label } from '@progress/kendo-react-labels';

const colorList = ['Black', 'Tomato', 'Orange', 'DodgerBlue', 'MediumSeaGreen', 'Gray', 'SlateBlue', 'Violet'];

const SpecialTimeChange = ({ editData, onEditClose, map_u_name, setEditData, onSaveData }) => (
    <Dialog title={'神秘の時間修改'} onClose={onEditClose} height={'50%'} width={'80%'}>
        <div className='row'>
            <div className='col-md-1'>
                <Label>節點 {editData.selLog.Next_flow_status}</Label>
            </div>
            <div className='col-md-3'>
                <Label>
                    陳核人員 {editData.selLog.Assign_Uid}/{map_u_name(editData.selLog.Assign_Uid)}
                </Label>
            </div>
            <div className='col-md-1'>
                <Label>陳核時間</Label>
            </div>
            <div className='col-md-5'>
                <DateTimePicker
                    width={'50%'}
                    value={dayjs(editData.selLog.Assign_datetime).toDate()}
                    format={'yy-MM-dd HH:mm:ss'}
                    onChange={(p) => {
                        setEditData((pre) => ({
                            ...pre,
                            selLog: { ...pre.selLog, Assign_datetime: dayjs(p.value).toJSON() },
                        }));
                    }}
                />
            </div>
        </div>
        <div className='row'>
            <div className='col-md-1'></div>
            <div className='col-md-3'>
                <Label>
                    審核人員 {editData.selLog.Approve_Uid}/{map_u_name(editData.selLog.Approve_Uid)}
                </Label>
            </div>
            <div className='col-md-1'>
                <Label>審核時間</Label>
            </div>
            <div className='col-md-5'>
                <DateTimePicker
                    width={'50%'}
                    format={'yy-MM-dd HH:mm:ss'}
                    value={dayjs(editData.selLog.Approve_datetime).toDate()}
                    onChange={(p) => {
                        setEditData((pre) => ({
                            ...pre,
                            selLog: { ...pre.selLog, Approve_datetime: dayjs(p.value).toJSON() },
                        }));
                    }}
                />
            </div>
        </div>
        <DialogActionsBar>
            <Button onClick={onSaveData}>存</Button>
            <Button onClick={onEditClose}>棄</Button>
        </DialogActionsBar>
    </Dialog>
);

/**
 * 顯示該流程的Log
 * @param {object} {selNode:{Func_type: 'CM01', Func_PK: null, Func_str_PK: null, isShowTime: true}} - 主要點選的物件
 * @param {object} ref 父元件傳進來的Ref
 *
 */
const FlowSignLog = forwardRef((props, ref) => {
    const [lLog, setLLog] = useState([]);

    const { selNode, getLogs, isShowTime = true, isEditable = false } = props;

    let uContext = useUserContext();

    const [editData, setEditData] = useState({ showDialog: false, selLog: null, count: 0 });

    useImperativeHandle(ref, () => ({
        dispatchRefresh() {
            refresh();
        },
    }));

    const refresh = async () => {
        try {
            let { data } = await apiFlowGet_FlowLogByID({ node: selNode });

            setLLog(data);

            if (!isNil(getLogs)) {
                getLogs(data);
            }
        } catch (e) {
            handleErrorSw(e);
        }
    };

    const map_u_name = (p) => mapUserName(uContext, p);

    useEffect(() => {
        if (_.isEmpty(selNode) | (_.isNil(selNode?.Func_PK) && _.isNil(selNode?.Func_str_PK))) {
            setLLog([]);
            return;
        }
        refresh();
    }, [selNode?.Func_PK, selNode?.Func_str_PK]);

    let timeformat = isShowTime ? 'YY-MM-DD HH:mm:ss' : 'YY-MM-DD';

    const onEditClose = () =>
        setEditData((pre) => ({
            ...pre,
            count: 0,
            showDialog: false,
        }));

    const onSaveData = async () => {
        await apiFlowEditLogTime({
            lid: editData.selLog.Id,
            assign: editData.selLog.Assign_datetime,
            approve: editData.selLog.Approve_datetime,
        });
        await refresh();
        onEditClose();
        alert('ok');
    };

    return (
        <div>
            {/* 修改時間視窗 */}
            {editData.showDialog && (
                <SpecialTimeChange {...{ editData, onEditClose, setEditData, map_u_name, onSaveData }} />
            )}

            <Tooltip openDelay={100} position='top' anchorElement='target'>
                <Grid data={lLog}>
                    <Column
                        title={'節點'}
                        field='Next_flow_status'
                        width={50}
                        celsl={{
                            data: ({ dataItem }) => (
                                <td title={dataItem.Next_flow_status}>
                                    {isEditable ? (
                                        <a
                                            style={{ color: colorList[editData.count] }}
                                            onClick={() => {
                                                let canEdit = editData.count === 1;

                                                setEditData((pre) => ({
                                                    ...pre,
                                                    count: pre.count + 1,
                                                    showDialog: canEdit,
                                                    selLog: dataItem,
                                                }));
                                            }}
                                        >
                                            {dataItem.Next_flow_status}
                                        </a>
                                    ) : (
                                        <>{dataItem.Next_flow_status}</>
                                    )}
                                </td>
                            ),
                        }}
                    />
                    <Column
                        title='陳核人員'
                        cells={{
                            data: ({ dataItem }) => {
                                return (
                                    <td>
                                        {dataItem.Assign_Uid}/{map_u_name(dataItem.Assign_Uid)}
                                    </td>
                                );
                            },
                        }}
                    ></Column>
                    <Column
                        title='陳核時間'
                        width='150px'
                        cells={{
                            data: (p) => <td>{dayjs(p.dataItem.Assign_datetime).format(timeformat)}</td>,
                        }}
                    ></Column>
                    <Column
                        title='簽核人員'
                        cells={{
                            data: ({ dataItem }) => {
                                return (
                                    <td>
                                        {dataItem.Approve_Uid}/{map_u_name(dataItem.Approve_Uid)}
                                    </td>
                                );
                            },
                        }}
                    ></Column>
                    <Column
                        field='Next_flow_status'
                        title='狀態'
                        width='150px'
                        cells={{
                            data: (p) => {
                                let nodename = mapNodeName(uContext, selNode?.Func_type, p.dataItem.Next_flow_status);
                                return <td title={nodename}>{nodename}</td>;
                            },
                        }}
                    ></Column>
                    <Column
                        title='簽核時間'
                        width='150px'
                        cells={{
                            data: (p) => (
                                <td>
                                    {p.dataItem.Approve_datetime === null
                                        ? ''
                                        : dayjs(p.dataItem.Approve_datetime).format(timeformat)}
                                </td>
                            ),
                        }}
                    ></Column>
                    <Column
                        title='簽核意見'
                        cells={{
                            data: (p) => (
                                <td title={p.dataItem.Approve_memo || ''}>
                                    <TextArea value={p.dataItem.Approve_memo || ''}></TextArea>
                                </td>
                            ),
                        }}
                    ></Column>
                    <Column
                        title='簽核動作'
                        width='100px'
                        cells={{
                            data: (p) => (
                                <td>
                                    {p.dataItem.Action === 'Trans'
                                        ? '同意'
                                        : p.dataItem.Action === 'Back'
                                        ? '退件'
                                        : ''}
                                </td>
                            ),
                        }}
                    ></Column>
                </Grid>
            </Tooltip>
        </div>
    );
});

export { FlowSignLog };
