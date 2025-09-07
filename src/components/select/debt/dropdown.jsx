import { apiOutter_DebtGetAllLGOffices } from '@/api';
import { handleErrorSw } from '@/share/common';
import { withValueField } from '@/share/hoc/select';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { useEffect, useState } from 'react';

const DL_V = withValueField(DropDownList);

export const SelLodgedReason = ({ onChange, value, clearAll, allowClear = true, ...others }) => {
    const data = [
        { id: 1, text: '假扣押' },
        { id: 2, text: '假處分' },
        { id: 3, text: '假執行' },
        { id: 4, text: '免為假執行' },
        { id: 5, text: '停止執行' },
        { id: 6, text: '撤銷假扣押' },
        { id: 7, text: '變換擔保物' },
    ];

    return <DL_V textField='text' valueField='id' data={data} onChange={onChange} value={value} {...others} />;
};

export const SelLodgmentOffice = ({ onChange, value, clearAll, allowClear = true, ...others }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        apiOutter_DebtGetAllLGOffices()
            .then(({ data }) => {
                setData(data);
            })
            .catch(handleErrorSw);
    }, []);

    return (
        <DL_V textField='LodgmentOffice' valueField='Id' data={data} onChange={onChange} value={value} {...others} />
    );
};

export const SelLodgedItem = ({ onChange, value, clearAll, allowClear = true, ...others }) => {
    return <DL_V textField='text' valueField='id' onChange={onChange} value={value} {...others} />;
};
