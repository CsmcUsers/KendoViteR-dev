import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Label } from '@progress/kendo-react-labels';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { apiAppr01, apiFileGetByFuncId_Pk } from '@/api';
import { ScoreBoard } from '../../../appr/components';
import { BtnDownLoad } from '@/components/button/K_Button';
import { loadingPanel } from '@/components/K_Common';
import { Download, getTimeString, handleErrorSw, sleep } from '@/share/common';
import { mapUserName, useUserContext } from '@/share/context';
import { useLoading } from '@/share/hook/loading';

export const SCApprFlow = ({ selNode, mainData: appr, onClose = (f) => f }) => {
    const [contentData, setcontentData] = useState({
        detail: null,
        scDetailLoading: false,
        scDetail: [],
        showScore: false,
    });

    const [loading, startLoading, finishLoading] = useLoading();

    let common = useUserContext();

    useEffect(() => {
        refresh();
    }, [selNode.Func_PK, selNode.Func_str_PK]);

    const closeDialog = () => setcontentData((pre) => ({ ...pre, showScore: false }));
    const showDialog = () => setcontentData((pre) => ({ ...pre, showScore: true }));

    const refresh = async () => {
        startLoading();

        await sleep(500);

        let { data: files } = await apiFileGetByFuncId_Pk(appr.Type_Id, null, appr.YYY + '_' + appr.Period);

        setcontentData((pre) => ({ detail: { ...pre?.detail, files, appr } }));

        let { data: sc } = await apiAppr01.post('GetScroe', { id: appr.Id }).catch(handleErrorSw);

        setcontentData((pre) => ({ ...pre, scDetail: sc, scDetailLoading: false }));

        finishLoading();
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-4'>
                    <Label>{selNode.F_desc}</Label>
                </div>
                <div className='col-2'></div>
                <div className='col-2'></div>
                <div className='col-2'></div>
                <div className='col-2'></div>
            </div>
            <div className='row'>
                <div className='col-2'>
                    <Label>經辦</Label>
                </div>
                <div className='col-2'>
                    <Label>
                        {contentData.detail?.appr?.Create_Uid}/
                        {mapUserName(common, contentData.detail?.appr?.Create_Uid)}
                    </Label>
                </div>
                <div className='col-2'>
                    <Label>建立時間</Label>
                </div>
                <div className='col-2'>
                    <Label>{getTimeString(contentData.detail?.appr?.Create_datetime)}</Label>
                </div>
                <div className='col-2'>
                    <Button themeColor={'secondary'} onClick={showDialog}>
                        檢視成績
                    </Button>
                </div>
                <div className='col-2'></div>
            </div>
            <div className='row'>
                <div className='col-12'>
                    {loading && loadingPanel}
                    <Grid data={contentData.detail?.files} style={{ height: 200 }}>
                        <Column title='檔名' field='origin_name' />
                        <Column
                            title='上傳時間'
                            field='create_time'
                            width={200}
                            cells={{
                                data: (p) => {
                                    const { create_time } = p.dataItem;
                                    return <td>{getTimeString(create_time)}</td>;
                                },
                            }}
                        />
                        <Column
                            title='上傳人員'
                            cells={{
                                data: (p) => (
                                    <td>{`${p.dataItem.create_uid}/${mapUserName(common, p.dataItem.create_uid)}`}</td>
                                ),
                            }}
                        />
                        <Column title='是否鎖定' width={100} field='islock' />
                        <Column
                            title='動作'
                            width={200}
                            cells={{
                                data: (p) => {
                                    const { id, origin_name } = p.dataItem;
                                    return (
                                        <td>
                                            <ButtonGroup>
                                                <BtnDownLoad
                                                    onClick={() => {
                                                        Download(id, origin_name, onClose);
                                                    }}
                                                />
                                            </ButtonGroup>
                                        </td>
                                    );
                                },
                            }}
                        />
                    </Grid>
                </div>
            </div>
            {contentData.showScore && (
                <ScoreBoard loading={contentData.scDetailLoading} onClose={closeDialog} data={contentData.scDetail} />
            )}
        </div>
    );
};
