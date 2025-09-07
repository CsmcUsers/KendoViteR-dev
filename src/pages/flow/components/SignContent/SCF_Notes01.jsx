import { DPicker } from '@/components/date-input';
import { OWADetail } from '@/components/grid';
import { SelEmp } from '@/components/select';
import { _dependon1 } from '@/data/result';
import { Download } from '@/share/common';
import { mapNodeName, mapUserName, useUserContext } from '@/share/context/userContext';
import { withValueField } from '@/share/hoc/select';
import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { SvgIcon } from '@progress/kendo-react-common';
import { DropDownList, MultiSelect } from '@progress/kendo-react-dropdowns';
import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import { Input } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { downloadIcon, trashIcon } from '@progress/kendo-svg-icons';
import dayjs from 'dayjs';
import { isEmpty, isNil } from 'lodash';

const fontSize = '1.2em';
const funcId = 'Notes01';

const DL_V = withValueField(DropDownList);

export const SCF_Notes01 = ({ selNode, mainData: ea, onClose = (f) => f }) => {
    let common = useUserContext();

    return (
        <div className='container-fluid'>
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
                    <Label style={{ fontSize: fontSize }}>{mapNodeName(common, funcId, ea?.Flow_Status || 0)}</Label>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>會同人員: </Label>
                </div>
                <div className='col-md-4'>
                    <Input name='EnterWith' value={ea?.EnterWith || ''} />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>登入 :</Label>
                </div>
                <div className='col-md-4'>
                    <p style={{ fontSize: fontSize }}>登入[ 最高權限]</p>

                    <MultiSelect
                        name='LoginType'
                        value={isEmpty(ea?.LoginType) ? [] : ea?.LoginType?.split(',')}
                        data={['最高權限']}
                        onChange={(p) => {
                            console.log(p);
                        }}
                    ></MultiSelect>
                </div>
            </div>{' '}
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>管制科經辦 : </Label>
                </div>
                <div className='col-md-4'>
                    <SelEmp
                        style={{ width: 300 }}
                        name='Handle_Uid'
                        infoNum={3}
                        value={ea?.Handle_Uid}
                        disabled={true}
                    />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>證明文件 : </Label>
                </div>
                <div className='col-md-4'>
                    <DL_V
                        name='DependOnDoc'
                        textField='text'
                        valueField='id'
                        data={_dependon1}
                        value={ea?.DependOnDoc}
                    />
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>文件ID : </Label>
                </div>
                <div className='col-md-4'>
                    <Input name='DependOnDocNo' value={ea?.DependOnDocNo || ''} />
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>檔案 : </Label>
                </div>
                <div className='col-md-10'>
                    <Grid data={ea?.files}>
                        <Column field='origin_name' title='檔案名稱' />
                        <Column
                            width={150}
                            title='操作'
                            cells={{
                                data: (p) => {
                                    const { id, origin_name } = p.dataItem;
                                    return (
                                        <td>
                                            <ButtonGroup>
                                                <Button
                                                    size={'small'}
                                                    themeColor={'primary'}
                                                    onClick={() => {
                                                        Download(id, origin_name);
                                                    }}
                                                >
                                                    <SvgIcon icon={downloadIcon} />
                                                </Button>
                                                <Button size={'small'} themeColor={'error'} onClick={(f) => f}>
                                                    <SvgIcon icon={trashIcon} />
                                                </Button>
                                            </ButtonGroup>
                                        </td>
                                    );
                                },
                            }}
                        />
                    </Grid>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>建立者 : </Label>
                </div>
                <div className='col-md-4'>
                    <Label style={{ fontSize: fontSize }}>
                        {!isNil(ea?.Create_Uid)
                            ? `${ea?.Create_Uid}/${mapUserName(common, ea?.Create_Uid)}`
                            : userToken.UseID + '/' + mapUserName(common, userToken.UseID)}
                    </Label>
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>上次修改者 :</Label>
                </div>
                <div className='col-md-4'>
                    {ea?.Update_Uid && (
                        <Label style={{ fontSize: fontSize }}>
                            {ea?.Update_Uid + '/' + mapUserName(common, ea?.Update_Uid)}
                        </Label>
                    )}
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>進入時間 : </Label>
                </div>
                <div className='col-md-4'>
                    <Label style={{ fontSize: fontSize }}>
                        {ea?.EnterTime && dayjs(ea?.EnterTime).format('YYYY-MM-DD HH:mm:ss')}
                    </Label>
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>出來時間 : </Label>
                </div>
                <div className='col-md-4'>
                    <Label style={{ fontSize: fontSize }}>
                        {ea?.LeaveTime && dayjs(ea?.LeaveTime).format('YYYY-MM-DD HH:mm:ss')}
                    </Label>
                </div>
            </div>
        </div>
    );
};
