import { apiCmr01, apiFile, GetCommon } from '@/api';
import { DPicker } from '@/components/date-input';
import { FilesGridCommandCell } from '@/components/grid-cell/file-command-cell';
import { loadingPanel } from '@/components/K_Common';
import {
    DLDepts,
    SelContractor,
    SelCurrency,
    SelMainType,
    SelPayType,
    SelRenewType,
    SelSecType,
} from '@/components/select';
import { getTimeString, handleErrorSw, sleep } from '@/share/common';
import { mapDeptName, mapNodeName, mapUserDept, mapUserName, useUserContext } from '@/share/context/userContext';
import { selectClosePointer } from '@/share/css';
import { useLoading } from '@/share/hook/loading';
import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { GridColumn as Column, Grid, GridToolbar } from '@progress/kendo-react-grid';
import { Input, TextArea } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { TabStrip, TabStripTab } from '@progress/kendo-react-layout';
import { xIcon } from '@progress/kendo-svg-icons';
import dayjs from 'dayjs';
import { isNil } from 'lodash';
import { useEffect, useState } from 'react';

const fontSize = '1.2em';
const funcId = 'CM01';

export const SCF_CM01 = ({ selNode, mainData: contract, onClose = (f) => f }) => {
    const [selected, setSelected] = useState(0);

    const [files, setFiles] = useState([]);

    const [auths, setAuths] = useState([]);

    const [comData, setComData] = useState({
        MainTypes: [],
        SecTypes: [],
        contractors: [],
    });

    const [loading, startLoading, finishLoading] = useLoading();

    let common = useUserContext();

    const handleSelect = (e) => {
        setSelected(e.selected);
    };

    const getAuths = async (id) => {
        let auths = await apiCmr01.post('GetContractAuth', { Id: id }).catch(handleErrorSw);

        setAuths(auths);
    };

    const refresh = async () => {
        startLoading();

        const { MainTypes, SecTypes, contractors } = await GetCommon();
        setComData({ MainTypes, SecTypes, contractors });

        await sleep(500);

        if (contract?.Id === null) {
            return;
        }

        await apiFile
            .post('GetByFuncId_Pk', { funcId, pk: null, strpk: contract?.Id })
            .then(({ data }) => {
                setFiles(data);
            })
            .catch(handleErrorSw);

        await getAuths(contract?.Id);
        finishLoading();
    };

    useEffect(() => {
        refresh();
    }, [selNode.Func_PK, selNode.Func_str_PK]);

    return (
        <div className='container-fluid'>
            {loading && loadingPanel}
            <TabStrip selected={selected} onSelect={handleSelect}>
                <TabStripTab title='一般資料'>
                    <div className='row'>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>合約編號 : </Label>
                        </div>
                        <div className='col-md-4'>
                            <Label>{contract?.No}</Label>
                        </div>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>流程狀態 : </Label>
                        </div>
                        <div className='col-md-4'>
                            <Label>{mapNodeName(common, funcId, contract?.Flow_Status)}</Label>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>主類別 : </Label>
                        </div>
                        <div className='col-md-4'>
                            <SelMainType
                                style={{ width: '100%', ...selectClosePointer }}
                                name={'MainTypeId'}
                                value={contract?.MainTypeId}
                                initData={comData.MainTypes}
                            ></SelMainType>
                        </div>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>次類別 : </Label>
                        </div>
                        <div className='col-md-4'>
                            <SelSecType
                                label=''
                                style={{ width: '100%', ...selectClosePointer }}
                                name={'SecTypeId'}
                                value={contract?.SecTypeId}
                                initData={comData.SecTypes}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>需求部門 : </Label>
                        </div>
                        <div className='col-md-4'>
                            <DLDepts
                                style={{ ...selectClosePointer }}
                                value={contract?.NeedDept}
                                initData={common.depts}
                            />
                        </div>
                        <div className='col-md-2' style={{ textAlign: 'end' }}></div>
                        <div className='col-md-4'></div>
                    </div>

                    <div className='row'>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>合約名稱 : </Label>
                        </div>
                        <div className='col-md-4'>
                            <Input
                                style={{ fontSize: fontSize, width: '100%' }}
                                name='ContractName'
                                value={contract?.ContractName || ''}
                            ></Input>
                        </div>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>供應商 : </Label>
                        </div>
                        <div className='col-md-4'>
                            <SelContractor
                                style={{ fontSize: fontSize, width: '100%', ...selectClosePointer }}
                                name='ContractorId'
                                label=''
                                allowClear={false}
                                value={contract?.ContractorId}
                                initData={comData.contractors}
                            />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>幣別 : </Label>
                        </div>
                        <div className='col-md-4'>
                            <SelCurrency
                                label=''
                                name='Curency'
                                style={{ fontSize: fontSize, width: '100%' }}
                                value={contract?.Curency}
                            />
                        </div>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>金額 : </Label>
                        </div>
                        <div className='col-md-4'>
                            <Input
                                style={{ fontSize: fontSize, textAlign: 'right' }}
                                name='Amt'
                                value={contract?.Amt || ''}
                            ></Input>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>合約起日 : </Label>
                        </div>
                        <div className='col-md-4'>
                            <DPicker width={200} name='StartTime' value={contract?.StartTime} />
                        </div>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>合約迄日 :</Label>
                        </div>
                        <div className='col-md-4'>
                            <DPicker width={200} name='ExpiredTime' value={contract?.ExpiredTime} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>建立者 : </Label>
                        </div>
                        <div className='col-md-4'>
                            <Label>
                                {contract?.Create_Uid}/{mapUserName(common, contract?.Create_Uid)}
                            </Label>
                        </div>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>上次修改者 :</Label>
                        </div>
                        <div className='col-md-4'>
                            {contract?.Update_Uid && (
                                <Label>{contract?.Update_Uid + '/' + mapUserName(common, contract?.Update_Uid)}</Label>
                            )}
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>建立時間 : </Label>
                        </div>
                        <div className='col-md-4'>
                            <Label>{getTimeString(contract?.Create_datetime)}</Label>
                        </div>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>上次修改時間 :</Label>
                        </div>
                        <div className='col-md-4'>
                            <Label>
                                {contract?.Update_datetime &&
                                    dayjs(contract?.Update_datetime).format('YYYY-MM-DD HH:mm:ss')}
                            </Label>
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-2' style={{ textAlign: 'end' }}>
                            <Label style={{ fontSize: fontSize }}>合約備註 : </Label>
                        </div>
                        <div className='col-md-10'>
                            <TextArea name='ConDesc' defaultValue={''} value={contract?.ConDesc} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-md-12'>
                            <Grid data={files}>
                                <GridToolbar>
                                    <Label>合約附件</Label>
                                </GridToolbar>
                                <Column title='檔名' field='origin_name' />
                                <Column
                                    title='上傳時間'
                                    field='create_time'
                                    width={200}
                                    cells={{
                                        data: (p) => {
                                            const { create_time } = p.dataItem;
                                            return (
                                                <td>{dayjs(create_time).format('YYYY-MM-DD HH:mm:ss').toString()}</td>
                                            );
                                        },
                                    }}
                                />
                                <Column
                                    title='上傳人員'
                                    field='create_uid'
                                    cells={{
                                        data: (p) => (
                                            <td>
                                                {`${p.dataItem.create_uid}/` +
                                                    mapUserName(common, p.dataItem.create_uid)}
                                            </td>
                                        ),
                                    }}
                                />
                                <Column
                                    title='動作'
                                    width={250}
                                    cells={{
                                        data: (p) =>
                                            FilesGridCommandCell({
                                                ...p,
                                                onClose: onClose,
                                            }),
                                    }}
                                />
                            </Grid>
                        </div>
                    </div>
                </TabStripTab>
                <TabStripTab title='付款資料'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <Label style={{ width: 300 }}>付款方式</Label>
                        </div>
                        <div className='col-md-3'>
                            <SelPayType name='Pay_Type' value={contract?.Pay_Type} style={{ ...selectClosePointer }} />
                        </div>
                        <div className='col-md-3'>
                            <Label style={{ width: 300 }}>續約方式</Label>
                        </div>
                        <div className='col-md-3'>
                            <SelRenewType
                                name='Renew_Type'
                                value={contract?.Renew_Type}
                                style={{ ...selectClosePointer }}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'></div>
                    </div>
                </TabStripTab>

                <TabStripTab title='權限'>
                    <div className='row'>
                        <div className='col-auto mr-auto'></div>
                        <div className='col-auto'></div>
                    </div>
                    <div className='row'>
                        <div className='col-md-12'>
                            <Grid data={auths} total={auths.length}>
                                <Column
                                    title='使用者'
                                    field='uid'
                                    cells={{
                                        data: ({ dataItem: { uid } }) => (
                                            <td>
                                                {uid}
                                                {isNil(uid) ? '' : '/' + mapUserName(common, uid)}
                                                {isNil(uid) ? '' : '/' + mapUserDept(common, uid)}
                                            </td>
                                        ),
                                    }}
                                />
                                <Column
                                    title='部門'
                                    field='dept'
                                    cells={{
                                        data: ({ dataItem: { dept } }) => (
                                            <td>
                                                {dept}
                                                {isNil(dept) ? '' : '/' + mapDeptName(common, dept)}
                                            </td>
                                        ),
                                    }}
                                />
                                <Column
                                    title=''
                                    width={100}
                                    cells={{
                                        data: (p) => (
                                            <td>
                                                <ButtonGroup>
                                                    <Button
                                                        themeColor={'error'}
                                                        onClick={() => deleteAuth(p)}
                                                        svgIcon={xIcon}
                                                    ></Button>
                                                </ButtonGroup>
                                            </td>
                                        ),
                                    }}
                                />
                            </Grid>
                        </div>
                    </div>
                </TabStripTab>
            </TabStrip>
        </div>
    );
};
