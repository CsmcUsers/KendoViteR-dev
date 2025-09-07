import { filterBy } from '@progress/kendo-data-query';
import React, { useEffect } from 'react';
import { createDataState } from '../../common';

/**
 * withFilter 已定要在with-page 前面，不然資料顯示會怪怪的
 * 主要屬性 total 會怪
 * @param {*} GridComponent
 * @returns
 */
export const withGridFilter = (GridComponent) => (props) => {
    const initialFilter = {
        logic: 'and',
        filters: [],
    };
    const [filter, setFilter] = React.useState(initialFilter);

    return (
        <GridComponent
            filterable={true}
            filter={filter}
            onFilterChange={(e) => setFilter(e.filter)}
            {...props}
            data={filterBy(props.data, filter)}
        />
    );
};

/**
 * data={pageData.data}
 * dataState={{
 *    take: 10,
 *    skip: 0,
 * }}
 * pageSize={10}
 * @param {*} GridComponent
 * @returns
 */
export const withGridFilterSort = (GridComponent) => (props) => {
    let initDataState = props.dataState || {
        take: 10,
        skip: 0,
    };

    let ds = createDataState(initDataState, props.data);

    const [result, setResult] = React.useState(ds.result);

    const [dataState, setDataState] = React.useState(initDataState);

    const dataStateChange = (event) => {
        let updatedState = createDataState(event.dataState, props.data);

        setResult(updatedState.result);
        setDataState(updatedState.dataState);
    };

    useEffect(() => {
        let updatedState = createDataState(initDataState, props.data);

        setResult(updatedState.result);
        setDataState(updatedState.dataState);
    }, [props.data]);

    return (
        <GridComponent
            {...props}
            {...dataState}
            onDataStateChange={dataStateChange}
            sortable={true}
            pageable={true}
            data={result}
        />
    );
};
