import { apiNotesGetDetailByMid } from '@/api';
import { loadingPanel } from '@/components/K_Common';
import { handleErrorSw, sleep } from '@/share/common';
import { mapNodeName, mapUserName, useUserContext } from '@/share/context/userContext';
import { useLoading } from '@/share/hook/loading';
import { Input, TextArea } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import dayjs from 'dayjs';
import { filter, find } from 'lodash';
import { useEffect, useState } from 'react';

const fontSize = '1.2em';
const funcId = 'Notes03';

const INPUT_WIDTH = 100;

const MediaTB = ({ changeCol, data, onChange }) => {
    return (
        <table width={'100%'}>
            <thead>
                <tr>
                    <td>
                        <Label>代碼</Label>
                    </td>

                    <td>
                        <Label>數量</Label>
                    </td>
                </tr>
            </thead>
            <tbody>
                {changeCol.map((v, i) => {
                    let hdName = v.Id.substring(v.Id.length - 1);

                    return (
                        <tr key={i}>
                            <td>
                                <Label>{hdName}</Label>
                            </td>
                            <td>
                                <Input
                                    name={v.Id}
                                    value={data[v.Id] || 0}
                                    type='number'
                                    width={INPUT_WIDTH}
                                    onChange={onChange}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

/**
 *
 * @param {*} param0
 * @returns
 */
export const SCF_Notes03 = ({ selNode, mainData: mediaroom, onClose = (f) => f }) => {
    const [contentData, setcontentData] = useState({
        details: [],
    });

    const [loading, startLoading, finishLoading] = useLoading();

    let common = useUserContext();

    const renderCustom = ({ data, title }) => {
        let c = find(data, { DriveType: 'C' });
        let l = find(data, { DriveType: 'L' });
        let s = find(data, { DriveType: 'S' });
        let d = find(data, { DriveType: 'D' });
        let o = find(data, { DriveType: 'O' });

        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th scope='col' className='w-25'>
                            <Label>{title}</Label>
                        </th>
                        <th scope='col' className='w-25'>
                            <Label>數量</Label>
                        </th>
                        <th scope='col' className='w-50'>
                            <Label>庫號</Label>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {[c, l, s, d, o].map((v, i) => (
                        <tr key={i}>
                            <th scope='row'>{v?.DriveType}</th>
                            <td>
                                <Input name='Num' type='number' width={50} value={v?.Num} />
                            </td>
                            <td>
                                <TextArea
                                    name='Memo'
                                    width={100}
                                    rows={v?.Memo.split('\n')?.length + 1 || 2}
                                    value={v?.Memo}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const refresh = async () => {
        startLoading();

        await sleep(500);
        try {
            if (mediaroom?.Id === null) {
                return;
            }

            let { data: rdetails } = await apiNotesGetDetailByMid({ id: mediaroom.Id });

            setcontentData({ details: rdetails });

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
                    <Label style={{ fontSize: fontSize }}>表單說明 : </Label>
                </div>
                <div className='col-md-10'>
                    <Label style={{ fontSize: fontSize }}>{selNode?.F_desc} </Label>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label style={{ fontSize: fontSize }}>流程狀態 : </Label>
                </div>
                <div className='col-md-4'>
                    <Label>{mapNodeName(common, funcId, mediaroom?.Flow_Status || 0)}</Label>
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}></div>
                <div className='col-md-4'></div>
            </div>

            <div className='row'>
                <div className='col-md-2' style={{ textAlign: 'end' }}>
                    <Label>地點: </Label>
                </div>
                <div className='col-md-4'>
                    <Label>{mediaroom.Location === 1 ? '資訊處媒體室' : '第二媒體室'}</Label>
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}></div>
                <div className='col-md-4'></div>
            </div>

            <div className='row'>
                <div className='col-md-4'>
                    <div className='k-card-deck'>
                        <Card style={{ width: '100%' }}>
                            <CardHeader style={{ backgroundColor: 'yellowgreen' }}>
                                <CardTitle>前日庫存</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <MediaTB
                                    changeCol={[{ Id: 'BC' }, { Id: 'BL' }, { Id: 'BS' }, { Id: 'BD' }, { Id: 'BO' }]}
                                    data={mediaroom}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='k-card-deck'>
                        <Card style={{ width: '100%' }}>
                            <CardHeader style={{ backgroundColor: 'yellowgreen' }}>
                                <CardTitle>外借磁帶</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <MediaTB
                                    changeCol={[{ Id: 'OC' }, { Id: 'OL' }, { Id: 'OS' }, { Id: 'OD' }, { Id: 'OO' }]}
                                    data={mediaroom}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className='col-md-4'>
                    <div className='k-card-deck'>
                        <Card style={{ width: '100%' }}>
                            <CardHeader style={{ backgroundColor: 'yellowgreen' }}>
                                <CardTitle>本日庫存</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <MediaTB
                                    changeCol={[{ Id: 'C' }, { Id: 'L' }, { Id: 'S' }, { Id: 'D' }, { Id: 'O' }]}
                                    data={mediaroom}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-6'>
                    <Label>
                        經辦 : {`${mediaroom?.Create_Uid}/${mapUserName(common, mediaroom?.Create_Uid)}      `}
                    </Label>
                    <Label> {dayjs(mediaroom?.Create_datetime).format('YYYY-MM-DD HH:MM:ss')}</Label>
                </div>
                <div className='col-md-6'></div>
            </div>

            <div className='row'>
                <div className='col-md-6'>
                    {renderCustom({
                        data: filter(contentData.details, { InorOut: false }),
                        title: '出庫',
                    })}
                </div>
                <div className='col-md-6'>
                    {renderCustom({
                        data: filter(contentData.details, { InorOut: true }),
                        title: '入庫',
                    })}
                </div>
            </div>
        </div>
    );
};
