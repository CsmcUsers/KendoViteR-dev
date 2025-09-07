import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import { withValueField } from '@/share/hoc/select/';
import { DropDownList } from '@progress/kendo-react-dropdowns';

const DLvalue = withValueField(DropDownList);

export const SelMainType = ({ onChange, value, clearAll, initData = [], allowClear = true, ...others }) => {
    const [st, setSt] = useState({
        data: initData.slice(),
        loading: false,
        value: null,
        error: null,
    });

    useEffect(() => {
        if (isEmpty(initData)) {
            return;
        }

        setSt({ data: initData });
    }, [initData]);

    return (
        <DLvalue valueField='id' textField='text' {...{ value: value, onChange, data: st.data }} {...others}></DLvalue>
    );
};
