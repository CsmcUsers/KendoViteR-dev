import { isEmpty, isNil } from 'lodash';
import { SelTitle } from '../select';
import { mapTitleName, useUserContext } from '@/share/context';

export const TitleEditCell = ({ dataItem: item, field, onChange }) => {
    let color = 'black';
    let msg = '';

    const common = useUserContext();

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
            <SelTitle value={item[field]} onChange={handleChange} />
        </div>
    ) : isEmpty(msg) ? (
        <span style={{ color: color, whiteSpace: 'pre-line' }}>
            {item[field] + mapTitleName(common, item[field], '')}
        </span>
    ) : (
        msg
    );

    return (
        <td style={{ color: color }} title={item[field]}>
            {cellContent}
        </td>
    );
};
