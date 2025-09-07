import { withValueField } from '@/share/hoc/select';
import { DropDownList } from '@progress/kendo-react-dropdowns';

const DLvalue = withValueField(DropDownList);

const SelQuar = ({ value, ...otherProps }) => {
    let data = [
        { id: '01', text: '第一季' },
        { id: '02', text: '第二季' },
        { id: '03', text: '第三季' },
        { id: '04', text: '第四季' },
    ];

    return <DLvalue data={data} value={value} valueField='id' textField='text' {...otherProps}></DLvalue>;
};

export { SelQuar };
