import { isEmpty, isNil } from 'lodash';
import { DLDepts } from '../select';
import { mapDeptName, useUserContext } from '@/share/context';

export const DeptEditCell = ({ dataItem: item, field, onChange, editable = true }) => {
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

    const cellContent =
        editable && item.inEdit ? (
            <div>
                <DLDepts value={item[field]} initData={common.depts} onChange={handleChange} />
            </div>
        ) : isEmpty(msg) ? (
            <span style={{ color: color, whiteSpace: 'pre-line' }}>
                {item[field] + mapDeptName(common, item[field], '')}
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
