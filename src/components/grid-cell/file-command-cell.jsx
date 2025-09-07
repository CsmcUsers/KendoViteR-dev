import { ButtonGroup } from '@progress/kendo-react-buttons';
import React from 'react';
import { BtnDownLoad } from '../button/K_Button';
import { Download } from '../../share/common';

export const FilesGridCommandCell = ({ dataItem: { id, origin_name }, ...others }) => {
    return (
        <td>
            <ButtonGroup>
                <BtnDownLoad
                    onClick={() => {
                        Download(id, origin_name, others.onClose);
                    }}
                />
            </ButtonGroup>
        </td>
    );
};
