import { RadioButton } from '@progress/kendo-react-inputs';

/**
 *
 * @param {{
 * direction: 'horizontal' | 'vertical'
 * }} param0
 * @returns
 */
export const RadioButtonGroup = ({
    dataObj,
    checked,
    name,
    onChange = (f) => f,
    direction = 'horizontal',
    spacing = '15px',
    ...others
}) =>
    Object.keys(dataObj).map((key, i) => {
        const mLeft = direction === 'horizontal' && i > 0 ? spacing : '0px'; // 若水平排列，則第二項開始要 margin-left
        const value = dataObj[key]; // 取 key 對應的 value
        // 組裝 Checkbox 元素
        let elem = (
            <RadioButton
                label={key}
                name={name}
                key={i}
                value={value}
                checked={checked === value}
                onChange={(p) => onChange(p, value)}
                style={{ marginLeft: mLeft }}
                {...others}
            />
        );

        // 垂直排列
        if (direction === 'vertical') {
            elem = <div>{elem}</div>;
        }

        return elem;
    });
