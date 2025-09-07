import React from 'react';
import { mapUserDept, mapUserName, useUserContext } from '@/share/context';
import { isNil } from 'lodash';

export const UserEditCell = ({ dataItem: item, field, onChange, ...others }) => {
    const common = useUserContext();
    let color = 'black';
    let msg = '';

    console.log(others, field);

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

    let content = item.inEdit ? (
        <input style={{ color: 'black' }} value={item[field] || ''} onChange={handleChange} />
    ) : (
        <span style={{ color: color }}>
            {isNil(item?.[field]) ? '' : `${item?.[field]}/${mapUserName(common, item?.[field])}`}
        </span>
    );

    return (
        <td style={{ color: color }} title={msg}>
            {content}
        </td>
    );
};

export const celluser = ({ dataItem: item, field }) => {
    const common = useUserContext();
    return <td>{isNil(item?.[field]) ? '' : `${item?.[field]}/${mapUserName(common, item?.[field])}`}</td>;
};

export const celluserdept = ({ dataItem: item, field }) => {
    const common = useUserContext();
    return <td>{isNil(item?.[field]) ? '' : `${item?.[field]}/${mapUserDept(common, item?.[field])}`}</td>;
};
