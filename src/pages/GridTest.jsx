import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import React from 'react';

// Mock data for the grid
const mockData = [
    { id: 1, name: '王小明', age: 28, position: '前端工程師', department: '技術部', salary: 65000 },
    { id: 2, name: '李美華', age: 32, position: '後端工程師', department: '技術部', salary: 72000 },
    {
        id: 3,
        name: '張志偉',
        age: 29,
        position: 'UI/UX 設計師',
        department: '設計部',
        salary: 58000,
    },
    { id: 4, name: '陳雅婷', age: 26, position: '產品經理', department: '產品部', salary: 78000 },
];

const GridTest = (params) => {
    const [data, setData] = React.useState([]);

    const [edit, setEdit] = React.useState({});

    // Refresh 方法：等待 700 毫秒後重新設定資料為 mockData
    const refresh = () => {
        setTimeout(() => {
            setData(mockData);
        }, 700);
    };

    // 在元件載入時執行 refresh
    React.useEffect(() => {
        refresh();
    }, []);

    const itemChange = (event) => {
        if (event.field) {
            setData((data) =>
                data.map((item) =>
                    item.id === event.dataItem.id
                        ? {
                              ...item,
                              [event.field]: event.value,
                          }
                        : item
                )
            );
        }
        setChanges(true);
    };

    const handleEditChange = (event) => {
        setEdit(event.edit);
    };

    return (
        <div className='grid-test'>
            <h2>員工資料表格</h2>
            <p>這是一個使用 Kendo React Grid 的測試頁面，包含員工基本資料。</p>

            <Grid
                data={data}
                dataItemKey='id'
                autoProcessData={true}
                pageable={true}
                pageSize={10}
                sortable={true}
                // edit={edit}
                // editable={{ mode: 'incell' }}
                // onEditChange={handleEditChange}
                // onItemChange={itemChange}
            >
                <Column field='id' title='員工編號' width='100px' />
                <Column field='name' title='姓名' width='120px' />
                <Column field='age' title='年齡' width='80px' />
                <Column field='position' title='職位' width='150px' />
                <Column field='department' title='部門' width='120px' />
                <Column
                    field='salary'
                    title='薪資'
                    width='120px'
                    format='{0:c0}'
                    cells={{
                        data: (props) => (
                            <td style={{ textAlign: 'right', color: '#2c3e50', fontWeight: '500' }}>
                                NT$ {props.dataItem.salary.toLocaleString()}
                            </td>
                        ),
                        edit: (props) => (
                            <td>
                                <input
                                    type='number'
                                    value={props.dataItem.salary}
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: '1px solid #ddd',
                                    }}
                                />
                            </td>
                        ),
                    }}
                />
            </Grid>
        </div>
    );
};

export default GridTest;
