import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { newUrlParam } from '@/share/common';

export const BtnSelect = ({ noicon = true, ...props }) => (
    <Button {...props} themeColor='primary'>
        {!props.noicon ? <i className='fas fa-hand-point-up'></i> : undefined}
        點選
    </Button>
);

export const BtnCheckOut = ({ noicon = true, ...props }) => (
    <Button {...props} themeColor='primary'>
        {!props.noicon ? <i className='fas fa-hand-point-up'></i> : undefined}
        查看
    </Button>
);

export const BtnInsert = ({ noicon = true, ...props }) => (
    <Button themeColor='primary' {...props}>
        {!noicon ? <i className='fas fa-plus'></i> : undefined}
        新增
    </Button>
);

export const BtnSave = ({ noicon = true, ...props }) => (
    <Button themeColor='primary' {...props}>
        {!noicon ? <i className='far fa-save'></i> : undefined}
        儲存
    </Button>
);

export const BtnSearch = ({ noicon = true, ...props }) => (
    <Button style={{ backgroundColor: '#00695c', color: 'white' }} {...props}>
        {!noicon ? <i className='fas fa-search'></i> : undefined}
        查詢
    </Button>
);

export const BtnEdit = ({ noicon = true, ...props }) => (
    <Button themeColor='success' {...props}>
        {!noicon ? <i className='far fa-edit'></i> : undefined}
        編輯
    </Button>
);

export const BtnDelete = ({ noicon = true, ...props }) => (
    <Button themeColor='error' {...props}>
        {!noicon ? <i className='far fa-trash-alt'></i> : undefined}
        刪除
    </Button>
);

export const BtnSubmit = ({ noicon = true, ...props }) => {
    return (
        <Button themeColor={'primary'} {...props}>
            {!noicon ? <i className='far fa-paper-plane' /> : undefined}
            呈核
        </Button>
    );
};

export const BtnPrint = ({ noicon = true, ...props }) => {
    return (
        <Button style={{ backgroundColor: '#00bfa5', color: 'white' }} {...props}>
            {!noicon ? <i className='far fa-paper-plane' /> : undefined}
            列印
        </Button>
    );
};

export const BtnReject = ({ noicon = true, ...props }) => {
    return (
        <Button themeColor={'warning'} {...props}>
            {!noicon ? <i className='fas fa-undo pr-1' /> : undefined}
            退件
        </Button>
    );
};

export const BtnClear = ({ noicon = true, ...props }) => (
    <Button themeColor='warning' {...props}>
        {!noicon ? <i className='fas fa-broom' /> : undefined}
        清除
    </Button>
);

export const BtnOpenFile = ({ noicon = true, ...props }) => (
    <Button look='clear' {...props}>
        {!noicon ? <i className='fas fa-file' /> : undefined}
        操作手冊
    </Button>
);

export const BtnDownLoad = ({ noicon = true, ...props }) => (
    <Button
        themeColor={'primary'}
        onClick={() => {
            window.open(props.urlFile + 'DownLoadFileById?' + newUrlParam({ Id: props.fileId }));
        }}
        {...props}
    >
        {!noicon ? <i className='fas fa-file-download'></i> : undefined}
        下載
    </Button>
);

export const BtnCancel = ({ noicon = true, onClick = (f) => f, ...props }) => (
    <Button onClick={onClick} {...props}>
        {!noicon ? <i className='fas fa-window-close'></i> : undefined}
        取消
    </Button>
);

export const BtnHelfMask = ({ noicon = true, onClick = (f) => f, ...props }) => (
    <Button onClick={onClick} {...props}>
        {noicon ? <i className='fas fa-eye-slash'></i> : <i className='fas fa-eye'></i>}
    </Button>
);

export const BtnMask = ({ noicon = true, onClick = (f) => f, ...props }) => (
    <Button onClick={onClick} {...props}>
        {noicon ? <i className='fas fa-eye-slash'></i> : <i className='fas fa-eye'></i>}
    </Button>
);

export const BtnShowLog = ({ noicon = true, onClick = (f) => f, ...props }) => (
    <Button onClick={onClick} className='bg-secondary text-white' {...props}>
        {!noicon ? <i className='fas fa-clipboard-list'></i> : undefined}
        紀錄
    </Button>
);

export const BtnOpenAtFlow = ({ noicon = true, onClick = (f) => f, ...props }) => (
    <Button onClick={onClick} {...props}>
        {!noicon ? <i className='fas fa-clipboard-list'></i> : undefined}詳
    </Button>
);
