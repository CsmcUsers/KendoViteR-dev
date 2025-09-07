import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { apiAuthGetAllValidItem } from '@/api';
import { handleErrorSw } from '@/share/common';
import { mapUserDept, mapUserName, useUserContext } from '@/share/context/userContext';
import { withGridGroup } from '@/share/hoc/grid/with-group';

const initialGroup = [
    {
        field: 'ItemName',
    },
];

const GroupGrid = withGridGroup(Grid);

const Appr17 = (props) => {
    const [pageData, setPageData] = useState({
        items: [],
    });

    let common = useUserContext();

    useEffect(() => {
        refresh();
    }, []);

    const refresh = async () => {
        common.refreshAuth_V();

        let { data: items } = await apiAuthGetAllValidItem().catch(handleErrorSw);

        let rr = [];

        items.forEach((ii) => {
            let people = _.filter(common.authv, (q) => q.Dept_ID === ii.Dept_ID);
            rr = rr.concat(people.map((pp) => _.assign({ ItemName: ii.ItemName, SortBy: ii.SortBy }, pp)));
        });

        rr = _.orderBy(rr, (p) => p.SortBy);

        setPageData((pre) => ({ ...pre, items: rr }));
    };

    return (
        <div className='k-card-list'>
            <Card>
                <CardHeader>
                    <CardTitle>{`各項業務連絡窗口(資料來源來自New Inner)`}</CardTitle>
                </CardHeader>
                <CardBody>
                    <div className='row'>
                        <div className='col-md-12'>
                            <GroupGrid data={pageData.items} initialGroup={initialGroup}>
                                <Column title='業務項目' field='ItemName' />
                                <Column
                                    title='部門'
                                    field='Dept_ID'
                                    cells={{
                                        data: (p) => {
                                            let uid = p.dataItem.Emp_ID;
                                            let dept = p.dataItem.Dept_ID;
                                            if (p.dataItem.aggregates) {
                                                return <></>;
                                            }
                                            return <td>{`${dept}/${mapUserDept(common, uid)}`}</td>;
                                        },
                                    }}
                                    groupable={false}
                                />
                                <Column
                                    title='員編'
                                    field='Emp_ID'
                                    cells={{
                                        data: (p) => {
                                            if (p.dataItem.aggregates) {
                                                return <></>;
                                            }
                                            let uid = p.dataItem.Emp_ID;
                                            return <td>{`${uid}/${mapUserName(common, uid)}`}</td>;
                                        },
                                    }}
                                />
                                <Column
                                    title='角色'
                                    sortable={true}
                                    cells={{
                                        data: (p) => {
                                            const { Role_Name } = p.dataItem;
                                            if (p.dataItem.aggregates) {
                                                return <></>;
                                            }

                                            let colorShow = '';
                                            switch (Role_Name) {
                                                case '主管':
                                                    colorShow = 'red';
                                                    break;
                                                case '經辦':
                                                    colorShow = 'green';
                                                    break;
                                                case '財會主管':
                                                    colorShow = 'DarkMagenta';
                                                    break;
                                                default:
                                                    colorShow = 'black';
                                                    break;
                                            }

                                            return <td style={{ color: colorShow }}>{Role_Name}</td>;
                                        },
                                    }}
                                />
                            </GroupGrid>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default Appr17;
