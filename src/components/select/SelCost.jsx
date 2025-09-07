import { withValueField } from '@/share/hoc/select';
import { DropDownList } from '@progress/kendo-react-dropdowns';

const DLvalue = withValueField(DropDownList);

const rdata = [
    { id: 0, text: '賠償損失' },
    { id: 1, text: '裁罰損失' },
    { id: 2, text: '詐貸損失' },
];

export const SelCost = (props) => {
    return <DLvalue data={rdata} textField={'text'} valueField={'id'} {...props} />;
};
