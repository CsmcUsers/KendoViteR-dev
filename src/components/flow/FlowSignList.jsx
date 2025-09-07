import { Button } from '@progress/kendo-react-buttons';
import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import { Tooltip } from '@progress/kendo-react-tooltip';
import { isNil } from 'lodash';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { ColumnMenu } from '@/components/grid-column';
import { withGridFilterSort } from '@/share/hoc/grid/with-filter';
import { celluser } from '../grid-cell/user-cell';
import { useUserContext } from '@/share/context';

const G_F_S = withGridFilterSort(Grid);

const initialDataState = {
    take: 6,
    skip: 0,
};

const FlowSignList = (props) => {
    const [page, setPage] = useState(initialDataState);

    const { selectName = '簽核', showType = false, data, onClick } = props;

    const { flowtypes } = useUserContext();

    //如果沒有設定page state 會停留在上個查詢階段
    useEffect(() => {
        setPage(initialDataState);
    }, [data]);

    return (
        <div>
            <Tooltip openDelay={100} position='top' anchorElement='target'>
                <G_F_S
                    style={{
                        height: '500px',
                    }}
                    pageable={true}
                    data={data}
                    dataState={page}
                    pageSize={6}
                    total={data.length}
                >
                    <Column
                        field=''
                        width='100px'
                        title='操作'
                        cells={{
                            data: (p) => (
                                <td>
                                    <Button themeColor={'primary'} size={'small'} onClick={() => onClick(p.dataItem)}>
                                        {selectName}
                                    </Button>
                                </td>
                            ),
                        }}
                    />
                    <Column
                        title='編號'
                        width='180px'
                        cells={{
                            data: ({ dataItem: item }) => {
                                let flowno = item.Func_type + '_' + (item.Func_PK || item.Func_str_PK);
                                return <td title={flowno}>{flowno}</td>;
                            },
                        }}
                    />
                    <Column
                        title='表單類型'
                        width='180px'
                        cells={{
                            data: ({ dataItem: item }) => (
                                <td title={flowtypes[item.Func_type]}>{flowtypes[item.Func_type]}</td>
                            ),
                        }}
                    />
                    {showType && (
                        <Column
                            title='(送審/簽核)'
                            width='180px'
                            field='tip'
                            cells={{ data: ({ dataItem: item }) => <td title={item.tip}>{item.tip}</td> }}
                        />
                    )}
                    <Column
                        field='F_desc'
                        title='表單說明'
                        width='350px'
                        cells={{ data: ({ dataItem: item }) => <td title={item.F_desc}>{item.F_desc}</td> }}
                    />
                    {showType ? (
                        <Column
                            title='簽核日期'
                            cells={{
                                data: (p) => (
                                    <td>
                                        {!isNil(p.dataItem.Approve_datetime)
                                            ? dayjs(p.dataItem.Approve_datetime).format('YYYY-MM-DD HH:mm:ss')
                                            : ''}
                                    </td>
                                ),
                            }}
                            width='150px'
                        />
                    ) : (
                        <Column
                            title='起單日期'
                            cells={{
                                data: (p) => (
                                    <td>
                                        {!isNil(p.dataItem.SheetStartTime)
                                            ? dayjs(p.dataItem.SheetStartTime).format('YYYY-MM-DD HH:mm:ss')
                                            : ''}
                                    </td>
                                ),
                            }}
                            width='150px'
                        />
                    )}
                    <Column
                        field='sheetCUid'
                        title='申請人'
                        width='120px'
                        columnMenu={ColumnMenu}
                        cells={{ data: celluser }}
                    />
                    <Column field='Node_Name' title='目前流程狀態' width='250px' />
                </G_F_S>
            </Tooltip>
        </div>
    );
};

const FlowReturnList = (props) => {
    const [page, setPage] = useState(initialDataState);

    const { selectName = '簽核', data, onClick } = props;

    const { flowtypes } = useUserContext();

    //如果沒有設定page state 會停留在上個查詢階段
    useEffect(() => {
        setPage(initialDataState);
    }, [data]);

    return (
        <div>
            <Tooltip openDelay={100} position='top' anchorElement='target'>
                <G_F_S
                    style={{
                        height: '500px',
                    }}
                    pageable={true}
                    data={data}
                    dataState={page}
                    pageSize={6}
                    total={data.length}
                >
                    <Column
                        field=''
                        width='100px'
                        title='操作'
                        cells={{
                            data: (p) => (
                                <td>
                                    <Button themeColor={'primary'} size={'small'} onClick={() => onClick(p.dataItem)}>
                                        {selectName}
                                    </Button>
                                </td>
                            ),
                        }}
                    />
                    <Column
                        title='編號'
                        width='180px'
                        cells={{
                            data: ({ dataItem: item }) => {
                                let flowno = item.Func_type + '_' + (item.Func_PK || item.Func_str_PK);
                                return <td title={flowno}>{flowno}</td>;
                            },
                        }}
                    />
                    <Column
                        title='表單類型'
                        width='180px'
                        cells={{
                            data: ({ dataItem: item }) => (
                                <td title={flowtypes[item.Func_type]}>{flowtypes[item.Func_type]}</td>
                            ),
                        }}
                    />
                    <Column
                        field='F_desc'
                        title='表單說明'
                        width='350px'
                        cells={{ data: ({ dataItem: item }) => <td title={item.F_desc}>{item.F_desc}</td> }}
                    />
                    <Column
                        title='起單日期'
                        cells={{
                            data: (p) => (
                                <td>
                                    {!isNil(p.dataItem.Create_datetime)
                                        ? dayjs(p.dataItem.Create_datetime).format('YYYY-MM-DD HH:mm:ss')
                                        : ''}
                                </td>
                            ),
                        }}
                        width='150px'
                    />
                    <Column
                        field='Create_Uid'
                        title='申請人'
                        width='120px'
                        columnMenu={ColumnMenu}
                        cells={{ data: celluser }}
                    />
                    <Column field='Node_Name' title='目前流程狀態' width='250px' />
                </G_F_S>
            </Tooltip>
        </div>
    );
};

export { FlowSignList, FlowReturnList };
