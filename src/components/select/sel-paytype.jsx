import { withValueField } from '@/share/hoc/select';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { useState } from 'react';

const DLvalue = withValueField(DropDownList);

export const SelPayType = ({ onChange, value, clearAll, allowClear = true, ...others }) => {
    const [st, setSt] = useState({
        data: [
            { id: 1, text: '天' },
            { id: 30, text: '月' },
            { id: 120, text: '季' },
            { id: 180, text: '半年' },
            { id: 360, text: '年' },
            { id: 9999, text: '驗收' },
        ],
        loading: false,
        value: null,
        error: null,
    });

    return (
        <DLvalue valueField='id' textField='text' {...{ value: value, onChange, data: st.data }} {...others}></DLvalue>
    );
};
