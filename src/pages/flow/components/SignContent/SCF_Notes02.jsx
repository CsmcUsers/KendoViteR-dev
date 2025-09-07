import { DropDownList } from '@progress/kendo-react-dropdowns';
import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { filter, isEmpty, isNil } from 'lodash';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { apiNotesGetWorkList } from '@/api/apiNotes';
import { loadingPanel } from '@/components/K_Common';
import { DPicker } from '@/components/date-input';
import { handleErrorSw, sleep } from '@/share/common';
import { mapNodeName, mapUserName, useUserContext, useTokenContext } from '@/share/context/';
import { withValueField } from '@/share/hoc/select';
import { useLoading } from '@/share/hook/loading';
import { _dependon, _logintype } from '@/data/result';
import { SelEmp } from '@/components/select';
import { apiMISPersonGetByGourpId } from '@/api';
import { OWADetail } from '@/components/grid';

const DL_V = withValueField(DropDownList);

const fontSize = '1.2em';
const funcId = 'Notes02';

/**
 *
 * @param {*} param0
 * @returns
 */
export const SCF_Notes02 = ({ selNode, mainData: ea, onClose = (f) => f }) => {
    const [contentData, setcontentData] = useState({
        // ea: null,
        worklist: ea?.wl,
        gourp009: [],
    });

    const [loading, startLoading, finishLoading] = useLoading();

    let common = useUserContext();

    let userToken = useTokenContext();

    const refreshWorkList = async () => {
        try {
            let { data: worklist } = await apiNotesGetWorkList({ Id: selNode?.Func_PK });

            setcontentData((pre) => ({ ...pre, worklist }));
        } catch (e) {
            handleErrorSw(e);
        }
    };

    const refreshgroup009 = async () => {
        try {
            let { data } = await apiMISPersonGetByGourpId('009');

            data = filter(data, (e) => isEmpty(e.LeaveDate));

            setcontentData((pre) => ({
                ...pre,
                gourp009: data.map((v) =>
                    _.assign(v, { ...v, id: v.UserID, text: `${v.UserID} / ${v.UserName_CH} / ${v.DeptName_CH}` })
                ),
            }));
        } catch (e) {
            handleErrorSw(e);
        }
    };

    const refresh = async () => {
        startLoading();

        await refreshgroup009();

        await sleep(500);
        try {
            if (ea?.Id === null) {
                return;
            }

            await refreshWorkList();

            finishLoading();
        } catch (e) {
            handleErrorSw(e);
            onClose();
        }
    };

    useEffect(() => {
        refresh();
    }, [selNode.Func_PK, selNode.Func_str_PK]);

    return (
        <div className='container-fluid'>
            {loading && loadingPanel}

            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>事由 : </Label>
                </div>
                <div className='col-md-10'>
                    <Label style={{ fontSize: fontSize }}>{ea?.Reason} </Label>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>辨識後的需求單 : </Label>
                </div>
                <div className='col-md-10'>
                    <OWADetail data={ea?.Reason} />
                </div>
            </div>

            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>日期 : </Label>
                </div>
                <div className='col-md-4'>
                    <DPicker width={200} name='EnterDate' value={ea?.EnterDate} />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>流程狀態 : </Label>
                </div>
                <div className='col-md-4'>
                    <Label>{mapNodeName(common, funcId, ea?.Flow_Status || 0)}</Label>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label>管制人員 :</Label>
                </div>
                <div className='col-md-4'>
                    <SelEmp allData={contentData.gourp009} name='DCUid' value={ea?.DCUid} />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}></div>
                <div className='col-md-4'></div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label>會同人員 :</Label>
                </div>
                <div className='col-md-4'>
                    <Input name='EnterWith' value={ea?.EnterWith || ''} />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label>登入 :</Label>
                </div>
                <div className='col-md-4'>
                    <DL_V name='LoginType' valueField='id' textField='text' data={_logintype} value={ea?.LoginType} />
                </div>
            </div>

            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>依據 : </Label>
                </div>
                <div className='col-md-4'>
                    <DL_V name='DependOn' textField='text' valueField='id' data={_dependon} value={ea?.DependOn} />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>需求單號 : </Label>
                </div>
                <div className='col-md-4'>
                    <Input name='DependOnDocNo' value={ea?.DependOnDocNo || ''} />
                </div>
            </div>

            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>作業 : </Label>
                </div>
                <div className='col-md-10'>
                    <Grid data={ea?.wl || []}>
                        <Column title='作業名稱' field='WorkName' />
                        <Column title='作業內容及注意事項' field='WorkDetail' />
                        <Column title='作業時間' field='WorkTime' editor='text' />
                    </Grid>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>建立者 : </Label>
                </div>
                <div className='col-md-4'>
                    <Label>
                        {!isNil(ea?.Create_Uid)
                            ? `${ea?.Create_Uid}/${mapUserName(common, ea?.Create_Uid)}`
                            : userToken.UseID + '/' + mapUserName(common, userToken.UseID)}
                    </Label>
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>上次修改者 :</Label>
                </div>
                <div className='col-md-4'>
                    {ea?.Update_Uid && <Label>{ea?.Update_Uid + '/' + mapUserName(common, ea?.Update_Uid)}</Label>}
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>DC登入時間 : </Label>
                </div>
                <div className='col-md-4'>
                    <Label>{ea?.DCLoginTime && dayjs(ea?.DCLoginTime).format('YYYY-MM-DD HH:mm:ss')}</Label>
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>最高權限登入時間 :</Label>
                </div>
                <div className='col-md-4'>
                    <Label>{ea?.DCAdminLoginTime && dayjs(ea?.DCAdminLoginTime).format('YYYY-MM-DD HH:mm:ss')}</Label>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>建立時間 : </Label>
                </div>
                <div className='col-md-4'>
                    <Label>{ea?.Create_datetime && dayjs(ea?.Create_datetime).format('YYYY-MM-DD HH:mm:ss')}</Label>
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>上次修改時間 :</Label>
                </div>
                <div className='col-md-4'>
                    <Label>{ea?.Update_datetime && dayjs(ea?.Update_datetime).format('YYYY-MM-DD HH:mm:ss')}</Label>
                </div>
            </div>
        </div>
    );
};
