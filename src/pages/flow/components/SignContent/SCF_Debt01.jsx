import { apiOutter_DebtGetAllNewBonds } from '@/api';
import { DPicker } from '@/components/date-input';
import { SelYear } from '@/components/select';
import { getTimeString } from '@/share/common';
import { mapNodeName, mapUserName, useUserContext } from '@/share/context/userContext';
import { Input, Switch, TextArea } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { isNil } from 'lodash';
import { useEffect, useState } from 'react';
import { SelLodgedItem, SelLodgedReason, SelLodgmentOffice } from '@/components/select/debt/dropdown';
import { bonds as bondsdata } from '@/data/debt';

const fontSize = '1.2em';
const funcId = 'Debt01';

export const SCF_Debt01 = ({ selNode, mainData: glItem, onClose = (f) => f }) => {
    let common = useUserContext();

    const [dd, setDd] = useState({ originbonds: [], bonds: [] });

    const refresh = async () => {
        let { data } = await apiOutter_DebtGetAllNewBonds();

        let bonds = data.map((v) => ({ id: v.BondCode, text: bondsdata[v.BondCode] || v.BondCode }));

        setDd((pre) => ({ ...pre, originbonds: data, bonds }));
    };

    useEffect(() => {
        refresh();
    }, []);

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>編號 : </Label>
                </div>
                <div className='col-md-4'>
                    <Label style={{ fontSize: fontSize }}>{glItem?.Id}</Label>
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>流程狀態 : </Label>
                </div>
                <div className='col-md-4'>
                    <Label style={{ fontSize: fontSize }}>{mapNodeName(common, funcId, glItem?.Flow_Status)}</Label>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>帳號 : </Label>
                </div>
                <div className='col-md-4'>
                    <Input name='Account' style={{ width: 300 }} value={glItem?.Account} />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>是否移管授管: </Label>
                </div>
                <div className='col-md-4'>
                    <Switch name='Transferred' checked={glItem?.Transferred || false} />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>借戶名稱 : </Label>
                </div>
                <div className='col-md-4'>
                    <Input name='Borrower' style={{ width: 300 }} value={glItem?.Borrower || ''} />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}></Label>
                </div>
                <div className='col-md-4'></div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>提存對象 : </Label>
                </div>
                <div className='col-md-4'>
                    <Input name='Lodger' style={{ width: 300 }} value={glItem?.Lodger} />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>提存案號 : </Label>
                </div>
                <div className='col-md-4'>
                    <SelYear name='yyy' category={2} value={glItem?.CaseNumber?.split('-')[0] || ''} />
                    年存
                    <Input name='caseno' style={{ width: 100 }} value={glItem?.CaseNumber?.split('-')[1] || ''} />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>提存處所 : </Label>
                </div>
                <div className='col-md-4'>
                    <SelLodgmentOffice name='LodgmentOffice' style={{ width: 200 }} value={glItem?.LodgmentOffice} />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>提存原因 : </Label>
                </div>
                <div className='col-md-4'>
                    <SelLodgedReason name='LodgedReason' style={{ width: 200 }} value={glItem?.LodgedReason} />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>提存物品名稱 : </Label>
                </div>
                <div className='col-md-4' style={{ alignItems: 'start' }}>
                    <SelLodgedItem
                        data={dd.bonds}
                        name='LodgedItem'
                        style={{ width: 390 }}
                        value={glItem?.LodgedItem}
                    />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}> 數量 : </Label>
                </div>
                <div className='col-md-4'>
                    <Input name='LodgedCount' style={{ width: 100 }} value={glItem?.LodgedCount} />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}> 提存日期 : </Label>
                </div>
                <div className='col-md-4'>
                    <DPicker name='LodgedDate' width={200} value={glItem?.LodgedDate || null} />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}> 提存總金額 : </Label>
                </div>
                <div className='col-md-4'>
                    <Input name='LodgedAmount' style={{ width: 300 }} value={glItem?.LodgedAmount} />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}> 應予提回日期 : </Label>
                </div>
                <div className='col-md-4'>
                    <DPicker name='DeterminedClaimDate' width={200} value={glItem?.DeterminedClaimDate || null} />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}> 歸還營業部日期 : </Label>
                </div>
                <div className='col-md-4'>
                    <DPicker name='ActualClaimDate' width={200} value={glItem?.ActualClaimDate || null} />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}> 備註 : </Label>
                </div>
                <div className='col-md-10'>
                    <TextArea name='Notes' value={glItem?.Notes} rows={4} />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>建立者 : </Label>
                </div>
                <div className='col-md-4'>
                    <Label style={{ fontSize: fontSize }}>
                        {!isNil(glItem?.CreateUid)
                            ? `${glItem?.CreateUid}/${mapUserName(common, glItem?.CreateUid)}`
                            : userToken.UseID + '/' + mapUserName(common, userToken.UseID)}
                    </Label>
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>上次修改者 :</Label>
                </div>
                <div className='col-md-4'>
                    {glItem?.UpdateUid && (
                        <Label style={{ fontSize: fontSize }}>
                            {glItem?.UpdateUid + '/' + mapUserName(common, glItem?.UpdateUid)}
                        </Label>
                    )}
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>建立時間 : </Label>
                </div>
                <div className='col-md-4'>
                    <Label style={{ fontSize: fontSize }}>{getTimeString(glItem?.CreateTime)}</Label>
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>上次修改時間 :</Label>
                </div>
                <div className='col-md-4'>
                    <Label style={{ fontSize: fontSize }}>{getTimeString(glItem?.UpdateTime)}</Label>
                </div>
            </div>
        </div>
    );
};
