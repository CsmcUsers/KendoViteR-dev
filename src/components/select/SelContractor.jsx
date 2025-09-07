import { apiCmr03 } from '@/api';
import { handleErrorSw, sleep, useMountedRef } from '@/share/common';
import { withValueField } from '@/share/hoc/select';
import { colorDL } from '@/share/setting';
import { filterBy } from '@progress/kendo-data-query';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';

const Sel_V = withValueField(DropDownList);

export const SelContractor = ({ onChange, value, clearAll, initData = [], allowClear = true, ...others }) => {
    const delay = 1500;

    const [state, setState] = useState({
        data: [],
        loading: false,
        value: null,
        error: null,
    });

    let mounted = useMountedRef();

    useEffect(() => {
        if (value && _.isEmpty(initData)) {
            apiCmr03
                .post('GetById', { Id: value })
                .then(({ data }) => {
                    if (mounted.current) {
                        setState((pre) => ({
                            ...pre,
                            data: [{ ...data, Id: data.Id, text: data.TaxId + ' / ' + data.CompanyName }],
                        }));
                    }
                })
                .catch(handleErrorSw);
        }

        return () => {};
    }, []);

    useEffect(() => {
        setState((pre) => ({ ...pre, data: initData.slice() }));
    }, [initData]);

    const getVender = (key) => {
        return apiCmr03.post('FilterContractorsByCon', { cName: key, taxid: key });
    };

    const timeout = useRef(false);

    const filterData = (allData, filter) => {
        _.each(allData, (item) => {
            _.assignIn(item, { Id: item.Id, text: `${item.TaxId} / ${item.CompanyName}` });
        });

        return filterBy(allData, filter);
    };

    const filterChange = (event) => {
        if (event.filter.value.length < 2) {
            return;
        }

        clearTimeout(timeout.current);

        timeout.current = setTimeout(async () => {
            setState({ ...state, loading: true });
            await sleep(500);
            await getVender(event.filter.value.toUpperCase())
                .then(({ data }) => {
                    setState({
                        loading: false,
                        data: filterData(data, event.filter),
                    });
                })
                .catch(handleErrorSw);
        }, delay);
    };

    const handleChange = (event) => {
        onChange({ ...event, value: event.value });
    };

    const itemRender = (li, itemProps) => {
        const { CompanyName, ComNickName, TaxId } = itemProps.dataItem;
        const itemChildren = [
            <span
                key={1}
                style={{
                    color: colorDL.one,
                }}
            >
                <b>{TaxId}</b>
            </span>,

            <span key={4}>{` / `}</span>,

            <span
                key={5}
                style={{
                    color: colorDL.two,
                }}
            >
                <b>{CompanyName}</b>
            </span>,

            <span key={2}>{` / `}</span>,

            <span
                key={3}
                style={{
                    color: colorDL.three,
                }}
            >
                <b>{ComNickName}</b>
            </span>,
        ];
        return React.cloneElement(li, li.props, itemChildren);
    };

    return (
        <Sel_V
            label='廠商'
            value={value || null}
            data={state.data}
            textField='text'
            valueField='Id'
            filterable={true}
            onFilterChange={filterChange}
            onChange={handleChange}
            loading={state.loading}
            itemRender={itemRender}
            {...others}
        />
    );
};
