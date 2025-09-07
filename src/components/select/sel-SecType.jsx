import { DropDownList } from '@progress/kendo-react-dropdowns';
import { withValueField } from '@/share/hoc/select';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';

const DLvalue = withValueField(DropDownList);

export const SelSecType = ({ onChange, value, clearAll, initData = [], allowClear = true, ...others }) => {
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
