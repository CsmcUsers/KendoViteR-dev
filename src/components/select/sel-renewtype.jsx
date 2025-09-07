import { DropDownList } from '@progress/kendo-react-dropdowns';
import React, { useState } from 'react';
import { withValueField } from '@/share/hoc/select';

const DLvalue = withValueField(DropDownList);

export const SelRenewType = ({ onChange, value, clearAll, initData, allowClear = true, ...others }) => {
    const [st, setSt] = useState({
        data: [
            { id: 1, text: '無' },
            { id: 2, text: '書面通知' },
            { id: 3, text: '電子通知' },
            { id: 4, text: '自動' },
        ],
        loading: false,
        value: null,
        error: null,
    });

    return (
        <DLvalue valueField='id' textField='text' {...{ value: value, onChange, data: st.data }} {...others}></DLvalue>
    );
};
