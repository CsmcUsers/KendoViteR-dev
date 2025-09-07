import React from 'react';

export const loadingPanel = (
    <div className='k-loading-mask'>
        <span className='k-loading-text'>Loading</span>
        <div className='k-loading-image'></div>
        <div className='k-loading-color'></div>
    </div>
);

export const loadingPanelV2 = (
    <div
        className='loading-indicator'
        style={{
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#3f51b5',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            margin: '10px 0',
        }}
    >
        資料載入中，請稍候...
    </div>
);
