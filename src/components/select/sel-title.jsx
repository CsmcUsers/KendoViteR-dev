import { DropDownList } from '@progress/kendo-react-dropdowns';
import { assign } from 'lodash';
import { useUserContext } from '@/share/context';
import { withFilter, withValueField } from '@/share/hoc/select';

const DLvalue = withFilter(withValueField(DropDownList));

export const SelTitle = ({ onChange, value, clearAll, initData = [], allowClear = true, ...others }) => {
    const { titles } = useUserContext();

    return (
        <DLvalue
            valueField='TitleID'
            textField='text'
            minLen={2}
            delay={600}
            allData={titles.map((p) => assign({ text: `${p.TitleID}/ ${p.TitleName}` }, p))}
            value={value}
            onChange={onChange}
            {...others}
        />
    );
};
