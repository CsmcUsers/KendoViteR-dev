import { apiNotesGetPasswdByYear } from '@/api/apiNotes';
import { loadingPanel } from '@/components/K_Common';
import { TimeCell } from '@/components/grid-cell';
import { handleErrorSw, sleep } from '@/share/common';
import { mapNodeName, mapUserName, useUserContext } from '@/share/context/userContext';
import { useLoading } from '@/share/hook/loading';
import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import { Label } from '@progress/kendo-react-labels';
import { Tooltip } from '@progress/kendo-react-tooltip';
import dayjs from 'dayjs';
import { assign, filter, orderBy } from 'lodash';
import { useEffect, useState } from 'react';

const fontSize = '1.2em';
const funcId = 'Notes05';

const initialDataState = {
    skip: 0,
    take: 10,
};

/**
 *
 * @param {*} param0
 * @returns
 */
export const SCF_Notes05 = ({ selNode, mainData: pssheet, onClose = (f) => f }) => {
    const [contentData, setcontentData] = useState({
        sheets: [],
    });

    const [loading, startLoading, finishLoading] = useLoading();

    let common = useUserContext();

    const [page, setPage] = useState(initialDataState);

    const pageChange = (event) => {
        setPage(event.page);
    };

    const refresh = async () => {
        startLoading();

        await sleep(500);
        try {
            if (pssheet?.Id === null) {
                return;
            }
            let sheettime = dayjs(pssheet.SheetTime);

            let inbankCheep = 0;
            let inbankNormal = 0;
            let { data: sheets } = await apiNotesGetPasswdByYear({ yyy: sheettime.year() - 1911 });

            sheets = orderBy(sheets, ['SheetTime'], ['asc']);

            sheets = sheets.map((v, i) => {
                if (v.PassWDType === 'cheep') {
                    inbankCheep += (v.Incount || 0) - v.UseCount - v.AbandonedCount;
                    return assign({ Inbank: inbankCheep }, v);
                } else {
                    inbankNormal += (v.Incount || 0) - v.UseCount - v.AbandonedCount;
                    return assign({ Inbank: inbankNormal }, v);
                }
            });

            sheets = filter(sheets, (p) => {
                return (
                    dayjs(p.SheetTime).year() === sheettime.year() && dayjs(p.SheetTime).month() === sheettime.month()
                );
            });

            setcontentData((pre) => ({ ...pre, sheets }));
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
                    <Label>{mapNodeName(common, funcId, pssheet?.Flow_Status || 0)}</Label>
                </div>
                <div className='col-md-2' style={{ textAlign: 'end' }}></div>
                <div className='col-md-4'></div>
            </div>

            <div className='row'>
                <div className='col-md-12' style={{ textAlign: 'end' }}>
                    <Tooltip openDelay={100} position='top' anchorElement='target'>
                        <Grid
                            data={contentData.sheets.slice(page.skip, page.take + page.skip)}
                            pageable={true}
                            onPageChange={pageChange}
                            total={contentData.sheets.length}
                            {...page}
                        >
                            <Column width={150} title='時間' field='SheetTime' cells={{ data: TimeCell }} />
                            <Column
                                title='碼單'
                                field='PassWDType'
                                width={120}
                                cells={{
                                    data: (p) => <td>{p.dataItem.PassWDType === 'cheep' ? '晶片' : '一般'}</td>,
                                }}
                            />
                            <Column title='使用量' width={120}>
                                <Column title='張數' field='UseCount' width={120} />
                                <Column
                                    title='起號'
                                    field='UStartNo'
                                    width={120}
                                    cells={{
                                        data: (p) => <td title={p.dataItem.UStartNo}>{p.dataItem.UStartNo}</td>,
                                    }}
                                />
                                <Column
                                    title='迄號'
                                    field='UEndNo'
                                    width={120}
                                    cells={{
                                        data: (p) => <td title={p.dataItem.UEndNo}>{p.dataItem.UEndNo}</td>,
                                    }}
                                />
                            </Column>
                            <Column title='作廢量'>
                                <Column title='張數' field='AbandonedCount' width={120} />
                                <Column
                                    title='起號'
                                    field='AStartNo'
                                    width={120}
                                    cells={{
                                        data: (p) => <td title={p.dataItem.AStartNo}>{p.dataItem.AStartNo}</td>,
                                    }}
                                />
                                <Column
                                    title='迄號'
                                    field='AEndNo'
                                    width={120}
                                    cells={{
                                        data: (p) => <td title={p.dataItem.AEndNo}>{p.dataItem.AEndNo}</td>,
                                    }}
                                />
                            </Column>
                            <Column
                                title='進貨量'
                                field='Incount'
                                width={100}
                                cells={{
                                    data: ({ dataItem: item }) => <td title={item.Incount}>{item.Incount}</td>,
                                }}
                            />
                            <Column
                                title='庫存量'
                                width={100}
                                field='Inbank'
                                cells={{
                                    data: ({ dataItem: item }) => <td title={item.Inbank}>{item.Inbank}</td>,
                                }}
                            />
                            <Column
                                title='監督人'
                                field='CheckUid'
                                width={100}
                                cells={{
                                    data: ({ dataItem }) => <td>{mapUserName(common, dataItem.CheckUid)}</td>,
                                }}
                            />
                            <Column
                                title='備註'
                                field='Memo'
                                width={150}
                                cells={{
                                    data: (p) => (
                                        <td title={p.dataItem.Memo}>
                                            <Label>{p.dataItem?.Memo || ''} </Label>
                                        </td>
                                    ),
                                }}
                            />
                        </Grid>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};
