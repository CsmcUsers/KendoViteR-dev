import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { apiAuth, apiAuthGetAllValidItem } from '@/api/apiCommon';
import { NotiGroup } from '@/components/K_Notify';
import { handleErrorSw } from '@/share/common';
import { DialogEdit } from './components/dialog';

const Appr19 = () => {
    const [pageData, setPageData] = useState({
        year: (new Date().getFullYear() - 1911).toString(),
        period: null,
        items: [],
        showDialog: false,
        selectItem: null,
        showNoti: false,
    });

    useEffect(() => {
        refresh();
    }, []);

    const refresh = async () => {
        let { data: items } = await apiAuthGetAllValidItem().catch((f) => f);

        items = _.sortBy(items, ['FuncId'], ['desc']);

        setPageData((pre) => ({ ...pre, items }));
    };

    const closeDialog = () => setPageData((pre) => ({ ...pre, showDialog: false }));

    const openDialog = (p) => {
        setPageData((pre) => ({ ...pre, showDialog: true, selectItem: p.dataItem }));
    };

    const updateItem = (p) => {
        setPageData((pre) => ({
            ...pre,
            selectItem: { ...pageData.selectItem, [p.target.name || p.target.props.name]: p.value },
        }));
    };

    const clearItem = () => setPageData((pre) => ({ ...pre, selectItem: null, showDialog: false }));

    const onSave = () => {
        apiAuth
            .post('UpdateItem', pageData.selectItem)
            .then(() => {
                refresh();
                setPageData((pre) => ({ ...pre, showNoti: true }));
                setTimeout(() => {
                    setPageData((pre) => ({ ...pre, showNoti: false }));
                }, 1e3);
                clearItem();
            })
            .catch(handleErrorSw);
    };

    return (
        <div className='k-card-list'>
            <Card>
                <CardHeader>
                    <CardTitle>{`成績設定`}</CardTitle>
                </CardHeader>
                <CardBody>
                    <Grid data={pageData.items}>
                        <Column title='業務項目' field='ItemName' />
                        <Column title='業務項目代號' field='FuncId' width={120} />
                        <Column title='本期最高分數' field='Top_Score' width={120} />
                        <Column title='狀態' field='Status' width={120} />
                        <Column title='備註' field='Memo' />
                        <Column
                            title='操作'
                            cells={{
                                data: (p) => (
                                    <td>
                                        <ButtonGroup>
                                            <Button themeColor={'primary'} onClick={() => openDialog(p)}>
                                                {'修改'}
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                ),
                            }}
                        />
                    </Grid>
                </CardBody>
            </Card>

            {pageData.showDialog && (
                <DialogEdit {...{ selectItem: pageData.selectItem, onSave, closeDialog, updateItem }} />
            )}

            <NotiGroup
                notis={[
                    {
                        isShow: pageData.showNoti,
                        style: 'success',
                        onClose: () => {
                            setPageData((pre) => ({ ...pre, showNoti: false }));
                        },
                        text: '修改成功',
                    },
                    ,
                ]}
            ></NotiGroup>
        </div>
    );
};

export default Appr19;
