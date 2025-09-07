import { withValueField } from '@/share/hoc/select';
import { DropDownList } from '@progress/kendo-react-dropdowns';

const DLvalue = withValueField(DropDownList);

const SelHalfYear = ({ value, ...otherProps }) => {
    let data = [
        { id: '01', text: '上半年度試算' },
        { id: '02', text: '上半年' },
        { id: '03', text: '下半年度試算' },
        { id: '04', text: '下半年' },
    ];

    return <DLvalue data={data} value={value} valueField='id' textField='text' {...otherProps}></DLvalue>;
};

export { SelHalfYear };
