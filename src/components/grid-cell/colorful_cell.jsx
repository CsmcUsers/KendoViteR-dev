import { Input, TextArea } from '@progress/kendo-react-inputs';
import { Label } from '@progress/kendo-react-labels';
import { isEmpty, isNil } from 'lodash';

export const ColorTextCell = ({ dataItem: item, field, onChange }) => {
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
        <TextArea style={{ color: color }} value={item[field] || ''} onChange={handleChange} rows={6} />
    ) : isEmpty(msg) ? (
        <span style={{ color: color, whiteSpace: 'pre-line' }}>{item[field]}</span>
    ) : (
        msg
    );

    return (
        <td style={{ color: color }} title={item[field]}>
            {cellContent}
        </td>
    );
};

export const ColorInputCell = ({ dataItem: item, field, onChange }) => {
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

    return (
        <td style={{ color: color }} title={msg}>
            {item.inEdit ? (
                <Input style={{ color: color }} value={item[field]} onChange={handleChange} rows={3} />
            ) : isEmpty(msg) ? (
                <Label style={{ color: color }}>{item[field]}</Label>
            ) : (
                msg
            )}
        </td>
    );
};
