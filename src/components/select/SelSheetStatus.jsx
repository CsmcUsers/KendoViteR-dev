import { DropDownList } from '@progress/kendo-react-dropdowns';
import { withValueField } from '@/share/hoc/select';

const DropDownListWithValueField = withValueField(DropDownList);

export const SelSheetStatus = ({ ...props }) => {
    const sheet_status = [
        { text: '草稿', value: 0 },
        { text: '審核流程中', value: 1 },
        { text: '成立', value: 6 },
        { text: '註銷', value: 99 },
    ];

    return (
        <DropDownListWithValueField data={sheet_status} textField='text' size={'small'} valueField='value' {...props} />
    );
};
