import { ButtonGroup } from '@progress/kendo-react-buttons';
import React from 'react';
import { BtnOpenAtFlow } from '@/components/button';

export const CommandCell = (p) => {
    const { showDialog, selectappr } = p;

    return (
        <td>
            <ButtonGroup>
                <BtnOpenAtFlow
                    onClick={() => {
                        selectappr(p.dataItem);
                        showDialog();
                    }}
                    themeColor='secondary'
                />
            </ButtonGroup>
        </td>
    );
};
