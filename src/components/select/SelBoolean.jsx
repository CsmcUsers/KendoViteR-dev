import { withValueField } from '@/share/hoc/select';
import { DropDownList } from '@progress/kendo-react-dropdowns';

const DropDownListWithValueField = withValueField(DropDownList);

export const SelBoolean = ({ ...props }) => {
    const data = [
        {
            Id: null,
            text: '不篩選',
        },
        {
            Id: true,
            text: '是',
        },
        {
            Id: false,
            text: '否',
        },
    ];

    return (
        <div>
            <DropDownListWithValueField data={data} textField='text' valueField='Id' {...props} />
        </div>
    );
};
