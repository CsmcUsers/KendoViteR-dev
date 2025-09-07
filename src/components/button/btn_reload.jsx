import React, { useState } from 'react';
import { Button } from '@progress/kendo-react-buttons';

export const Btn_Reload = ({ onRefresh = (f) => f, onClick = (f) => f, ...others }) => {
    const [clicked, setClick] = useState(false);

    return (
        <Button
            themeColor={'primary'}
            size={'small'}
            disabled={clicked}
            onClick={async () => {
                setClick(true);
                await onRefresh();
                setClick(false);
            }}
            {...{ ...others }}
        >
            {'刷新'}
            {/* <span style={{ fontSize: 14, background: 'white', color: 'black', borderRadius: '5px' }}>{'Ctl+R'}</span> */}
        </Button>
    );
};
