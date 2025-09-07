import { Switch } from '@progress/kendo-react-inputs';

import { isEmpty, isNil } from 'lodash';

export const BoolEditCell = ({ dataItem: item, field, onChange }) => {
    let color = 'black';
    let msg = '';

    switch (item.tag) {
        case 'insert':
            color = 'green';
            break;
        case 'update':
            color = '#ff8c00';
            break;
        case 'delete':
            color = 'red';
            break;

        default:
            if (isNil(item?.tag)) {
            } else {
                msg = 'tag not match';
            }
    }

    const handleChange = (e) => {
        if (onChange) {
            onChange({
                dataIndex: 0,
                dataItem: item,
                field: field,
                syntheticEvent: e.syntheticEvent,
                value: e.target.value,
            });
        }
    };

    const cellContent = item.inEdit ? (
        <div>
            <Switch checked={item[field]} onChange={handleChange} />
            {item[field] ? '啟用' : '不啟用'}
        </div>
    ) : isEmpty(msg) ? (
        <span style={{ color: color, whiteSpace: 'pre-line' }}>{item[field] ? 'true' : 'false'}</span>
    ) : (
        msg
    );

    return (
        <td style={{ color: color }} title={item[field]}>
            {cellContent}
        </td>
    );
};
