import { Button } from '@progress/kendo-react-buttons';
import { GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { find, isNil } from 'lodash';
import { useState } from 'react';
import { InlineCommandCell } from '../../../components/grid-cell';
import { generateId } from '../../common';

/**
 * 主要屬性 total 會怪
 *
 *
 * tag 屬性會標示是【新增】或是【修改】過的資料
 * tag = insert、
 * tag = update
 *
 * TODO  跟 withGridFilterSort 會有問題
 * @param {string} pk ex: 'Id'
 * @param {string} userField 如果有定義，則只有該建立的人才能編輯
 * @param {boolean} isEdiable 該筆資料是否可以修改 false= 可以 true=不可以
 * @param {object[]} inputdata 資料
 */
export const withInlineEdit = (GridComponent) => (props) => {
    const commands = { insert: 'insert', update: 'update', delete: 'delete' };

    const {
        inputdata,
        setDialogData,
        pk,
        addNewHook,
        titleBtns,
        isEdiable = false,
        userField,
        disableAdd = false,
        disableDelete = false,
    } = props;

    const [editTmp, setEditTmp] = useState(null);

    let isSame = (item) => (p) => p[pk] === item[pk];

    const discard = () => {
        const newData = [...inputdata];
        newData.splice(0, 1);
        setDialogData(newData);
    };

    const cancel = (dataItem) => {
        const originalItem = find(inputdata, isSame(dataItem));

        const newData = inputdata.map((item) => (isSame(item)(originalItem) ? editTmp : item));

        setDialogData(newData);
    };

    const enterEdit = (dataItem) => {
        let edititem = find(inputdata, isSame(dataItem));

        setDialogData(
            inputdata.map((item) =>
                isSame(item)(edititem)
                    ? {
                          ...item,
                          inEdit: true,
                      }
                    : item
            )
        );

        setEditTmp(edititem);
    };

    const itemChange = (event) => {
        const newData = inputdata.map((item) =>
            isSame(item)(event.dataItem)
                ? {
                      ...item,
                      [event.field || '']: event.value,
                  }
                : item
        );

        setDialogData(newData);
    };

    /**
     * 剛點新增
     */
    const addNew = () => {
        const newDataItem = {
            inEdit: true,
            tag: 'insert',
        };

        if (!isNil(addNewHook)) {
            addNewHook(newDataItem);
        }

        setDialogData([newDataItem, ...inputdata]);
    };

    const insertItem = (item) => {
        let id = generateId(inputdata, pk);

        item[pk] = id;
        item.inEdit = false;
        item.tag = commands.insert;
        return inputdata;
    };

    const add = (dataItem) => {
        dataItem.inEdit = true;
        const newData = insertItem(dataItem);
        setDialogData(newData);
    };

    const updateItem = (item) => {
        let index = inputdata.findIndex(isSame(item));
        inputdata[index] = item;
        return inputdata;
    };

    const update = (dataItem) => {
        dataItem.inEdit = false;
        if (isNil(dataItem.tag)) {
            dataItem.tag = commands.update;
        }
        const newData = updateItem(dataItem);
        setDialogData(newData);
    };

    const deleteItem = (item) => {
        let index = inputdata.findIndex(isSame(item));

        let oriitem = inputdata[index];

        if (isNil(oriitem.tag)) {
            oriitem.tag = commands.delete;
        }

        if (oriitem.tag === commands.insert) {
            inputdata.splice(index, 1);
        }
        return inputdata;
    };

    const remove = (dataItem) => {
        const newData = [...deleteItem(dataItem)];
        setDialogData(newData);
    };

    const CommandCell = (cprops) => (
        <InlineCommandCell
            {...{ ...cprops, isEdiable, userField }}
            edit={enterEdit}
            remove={remove}
            add={add}
            discard={discard}
            update={update}
            cancel={cancel}
            editField={'inEdit'}
            idname={pk}
            confirm={(p) => confirm('是否刪除 ')}
            disableDelete={disableDelete}
        />
    );

    return (
        <GridComponent onItemChange={itemChange} editField={'inEdit'} {...props} data={inputdata}>
            {isEdiable ? (
                <></>
            ) : (
                <GridToolbar>
                    {!disableAdd && (
                        <Button
                            themeColor='primary'
                            size={'small'}
                            key={0}
                            disabled={isEdiable}
                            onClick={addNew}
                            children='新增'
                        />
                    )}
                    {titleBtns}
                </GridToolbar>
            )}
            {isEdiable ? <></> : <Column width={180} cells={{ data: CommandCell }} />}
            {props.children}
        </GridComponent>
    );
};
