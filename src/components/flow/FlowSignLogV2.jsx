import { Button } from '@progress/kendo-react-buttons';
import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import { Label } from '@progress/kendo-react-labels';
import { Tooltip } from '@progress/kendo-react-tooltip';
import _, { isNil } from 'lodash';
import dayjs from 'dayjs';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { apiFlowEditLogTime, apiFlowGet_FlowLogByIDV2 } from '@/api/apiFlow';
import { handleErrorSw } from '@/share/common';
import { mapUserName, useUserContext } from '@/share/context/userContext';

const colorList = ['Black', 'Tomato', 'Orange', 'DodgerBlue', 'MediumSeaGreen', 'Gray', 'SlateBlue', 'Violet'];

const SpecialTimeChange = ({ editData, onEditClose, map_u_name, setEditData, onSaveData }) => (
    <Dialog title={'神秘の時間修改'} onClose={onEditClose} height={'20%'} width={'50%'}>
        <div className='row'>
            <div className='col-md-2'>
                <Label>節點 {editData.selLog.Next_flow_status}</Label>
            </div>
            <div className='col-md-3'>
                <Label>
                    審核人員 {editData.selLog.Approve_Uid}/{map_u_name(editData.selLog.Approve_Uid)}
                </Label>
            </div>
            <div className='col-md-2'>
                <Label>審核時間</Label>
            </div>
            <div className='col-md-5'>
                <DateTimePicker
                    width={'100%'}
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
const FlowSignLogV2 = forwardRef((props, ref) => {
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
            let { data } = await apiFlowGet_FlowLogByIDV2({ node: selNode });

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
        if (editData.selLog.Next_flow_status === 0) {
            onEditClose();
            alert('不准修改第一個');
            return;
        }

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
                <Grid data={lLog} style={{ height: 300 }}>
                    <Column
                        title={'節點'}
                        field='Next_flow_status'
                        width={50}
                        cells={{
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
                        width={10}
                        title=' _'
                        cells={{
                            data: ({ dataItem: item }) => (
                                <td
                                    style={{
                                        backgroundColor: ['mutiToSingle', 'mutiToEvery'].includes(item.Sign_Type)
                                            ? 'green'
                                            : '',
                                    }}
                                >
                                    {''}
                                </td>
                            ),
                        }}
                    />
                    <Column
                        title='簽核者'
                        width='150px'
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
                        width='250px'
                        cells={{
                            data: (p) => {
                                return <td title={p.dataItem.Node_Name}>{p.dataItem.Node_Name}</td>;
                            },
                        }}
                    ></Column>
                    <Column
                        title='簽核意見'
                        cells={{
                            data: (p) => <td title={p.dataItem.Approve_memo || ''}>{p.dataItem.Approve_memo || ''}</td>,
                        }}
                    ></Column>
                    <Column
                        title='簽核時間'
                        width='220px'
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
                    <Column title='簽核動作' width='100px' field='Action'></Column>
                </Grid>
            </Tooltip>
        </div>
    );
});

export { FlowSignLogV2 };
