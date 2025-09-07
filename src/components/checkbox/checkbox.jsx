import { Checkbox } from '@progress/kendo-react-inputs';

/**
 *
 * @param {{
 * direction: 'horizontal' | 'vertical'
 * }} param0
 * @returns
 */
export const CheckboxGroup = ({
    dataObj,
    onChange = (f) => f,
    direction = 'horizontal',
    spacing = '15px',
    dataArray,
    separator = '',
    ...others
}) => {
    let elements = Object.keys(dataObj).map((key, i, row) => {
        const mLeft = direction === 'horizontal' && i > 0 ? spacing : '0px'; // 若水平排列，則第二項開始要 margin-left
        const value = dataObj[key]; // 取 key 對應的 value
        // 組裝 Checkbox 元素
        let elem = [
            <Checkbox
                key={i}
                label={key}
                name={value}
                value={dataArray?.includes(value)}
                onChange={(p) => onChange(p, value, dataArray)}
                style={{ marginLeft: mLeft }}
                {...others}
            />,
        ];
        // 插入中介字串
        if (!!separator && i + 1 !== row.length) {
            elem.push(<div>{separator}</div>);
        }

        return elem;
    });

    if (direction === 'horizontal') {
        elements = <div style={{ display: 'inline-flex', flexDirection: 'row' }}>{elements}</div>;
    }

    return elements;
};
