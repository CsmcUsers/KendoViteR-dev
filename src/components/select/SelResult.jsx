import { DropDownList } from '@progress/kendo-react-dropdowns';
import { withValueField } from '@/share/hoc/select';
import { _result as rdata } from '@/data/result';

const DLvalue = withValueField(DropDownList);

export const SelResult = (props) => {
    return <DLvalue data={rdata} textField={'text'} valueField={'id'} {...props} />;
};
