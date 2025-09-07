import { withValueField } from '@/share/hoc/select';
import { _sys_modules } from '@/share/staticdata/result';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { assign } from 'lodash';

const DLvalue = withValueField(DropDownList);

export const SelModule = ({ onChange, value, allowModule = [], IsSupper = false, ...others }) => {
    return (
        <DLvalue
            valueField='id'
            textField='text2'
            data={_sys_modules.map((v) => {
                return assign(
                    {
                        text2: `【${v.id}】${v.text}`,
                        disabled: IsSupper ? false : !allowModule.includes(v.id.toLowerCase()),
                    },
                    v
                );
            })}
            value={value}
            onChange={onChange}
            {...others}
        ></DLvalue>
    );
};
