import { DropDownList } from '@progress/kendo-react-dropdowns';
import { assign } from 'lodash';
import { useEffect, useState } from 'react';
import { apiFlowGetNodeDef } from '@/api/apiFlow';
import { handleErrorSw } from '@/share/common';
import { withValueField } from '@/share/hoc/select';

const DropDownListWithValueField = withValueField(DropDownList);

export const SelFlowStatus = ({ selFuncType, ...props }) => {
    const [status, setStatus] = useState([]);

    const getStatus = async () => {
        try {
            let { data: nodedefs } = await apiFlowGetNodeDef({ funcType: selFuncType });

            nodedefs = nodedefs.map((v) => assign({ text: `${v.Node_Name}/${v.Node_Status}` }, v));

            setStatus(nodedefs);
        } catch (e) {
            handleErrorSw(e);
        }
    };

    useEffect(() => {
        getStatus();
    }, [selFuncType]);

    return (
        <DropDownListWithValueField
            data={status}
            textField='text'
            valueField='Node_Status'
            disabled={selFuncType == null}
            size={'small'}
            {...props}
        />
    );
};
