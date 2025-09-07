import { Upload } from '@progress/kendo-react-upload';
import React, { useRef } from 'react';
import { newUrlParam } from '@/share/common';
import { urlFile } from '@/share/setting';
import { isEmpty } from 'lodash';

export const folder = {
    //test資料夾，其他人自己建立自己的資料夾
    f1: 'f1',
    DC0010: 'DC0010',
    //...
};

/**
 * control mode 的files 結構
 * [
    {
        name: "Picture1",
        extension: ".jpg",
        size: 4000,
        progress: 0,
        status: UploadFileStatus.Initial, 
        https://www.telerik.com/kendo-react-ui/components/upload/api/UploadFileStatus/
        uid: "uidPicture1",
    },
  ]
 * 
 *  fileDir     代表要放在專案上傳資料夾的
 *  foldId      文管資料夾ID
 *  funcId      功能ID
 *  funcPk      功能int    PK
 *  funcStrPk   功能string PK
 * @param {*} props
 * @returns
 */
export const UpFile = (props) => {
    const {
        funcId = 'nofunc',
        foldId = '-1',
        fileDir = 'undefined',
        funcPk = 0,
        funcStrPk = null,
        isPublic = false,
        callback = (f) => f,
        actiontype = 'Upload',
        id,
    } = props;

    const [files, setFiles] = React.useState([]);

    const uRef = useRef(null);

    const onAdd = (event) => {
        setFiles(event.affectedFiles);
    };

    const onRemove = (event) => {
        setFiles(event.newState);
    };

    const onProgress = (event) => {
        setFiles(event.newState);
    };

    const onStatusChange = (event) => {
        callback(event);
        setFiles(event.newState);
    };

    const actApiName = actiontype === 'Upload' ? 'UploadFileSingle?' : 'SwitchFileSingle?';

    const errorCheck = () => {
        let rval = '';
        if (actiontype !== 'Upload' && isEmpty(id)) {
            rval = 'SwitchFileSingle AND id is empty';
        }

        return rval;
    };

    let front_env = import.meta.env.VITE_APP_TEST;

    return (
        <div>
            <div className='form-group' style={{ color: 'blue' }}>
                {props.children}
            </div>
            {isEmpty(errorCheck()) ? (
                <Upload
                    ref={uRef}
                    autoUpload={true}
                    batch={false}
                    multiple={props.multiple || false}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    onProgress={onProgress}
                    files={files}
                    onStatusChange={onStatusChange}
                    //如果cra 沒有走HTTPS就要設定成false
                    withCredentials={true}
                    saveUrl={
                        urlFile +
                        actApiName +
                        newUrlParam({ ...{ funcId, fileDir, foldId, funcPk, funcStrPk, id, isPublic, front_env } })
                    }
                    {...props}
                />
            ) : (
                <div className=''>errorCheck有問題</div>
            )}
        </div>
    );
};
