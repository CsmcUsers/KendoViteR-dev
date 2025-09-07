import { DropDownList } from '@progress/kendo-react-dropdowns';
import { useEffect, useState } from 'react';
import { apiFlowGetFlowDoc } from '@/api';
import { handleErrorSw } from '@/share/common';
import { withValueField } from '@/share/hoc/select';

const DropDownListWithValueField = withValueField(DropDownList);

export const SelFuncType = ({ ...props }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        apiFlowGetFlowDoc()
            .then(({ data }) => {
                let keys = Object.keys(data);

                const dlData = keys.map((v, i) => {
                    return { text: `${v}/${data[v]}`, value: v };
                });

                setData(dlData);
            })
            .catch(handleErrorSw);
    }, []);

    return <DropDownListWithValueField data={data} textField='text' valueField='value' {...props} />;
};
