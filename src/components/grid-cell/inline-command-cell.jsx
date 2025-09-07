import { Button, ButtonGroup } from '@progress/kendo-react-buttons';
import {
    tableAddIcon,
    saveIcon,
    tableDeleteIcon,
    cancelIcon,
    editToolsIcon,
    xCircleIcon,
} from '@progress/kendo-svg-icons';
import { useTokenContext } from '@/share/context';
import { isEmpty, isNil } from 'lodash';

/**
 *
 * @param {*} props
 * @returns
 */
export const InlineCommandCell = (props) => {
    const {
        dataItem,
        isEdiable,
        confirm = undefined,
        idname = null,
        onlyIcon = false,
        userField,
        disableDelete,
    } = props;

    const inEdit = dataItem[props.editField];

    const isNewItem = dataItem[idname] === undefined;

    const { userToken } = useTokenContext();

    const isSelf = isNil(userField)
        ? true
        : isEmpty(dataItem[userField])
        ? true
        : dataItem[userField] === userToken.UseID;

    if (!isSelf) {
        return <td className='k-command-cell'></td>;
    }

    return inEdit ? (
        <td className='k-command-cell'>
            <ButtonGroup>
                <Button
                    size={'small'}
                    themeColor={'primary'}
                    disabled={isEdiable}
                    svgIcon={onlyIcon ? (isNewItem ? tableAddIcon : saveIcon) : null}
                    onClick={() => (isNewItem ? props.add(dataItem) : props.update(dataItem))}
                >
                    {!onlyIcon ? (isNewItem ? '新增' : '更新') : ''}
                </Button>
                <Button
                    size={'small'}
                    themeColor={'warning'}
                    disabled={isEdiable}
                    svgIcon={onlyIcon ? (isNewItem ? tableDeleteIcon : cancelIcon) : null}
                    onClick={() => (isNewItem ? props.discard(dataItem) : props.cancel(dataItem))}
                >
                    {!onlyIcon && (isNewItem ? '捨棄' : '取消')}
                </Button>
            </ButtonGroup>
        </td>
    ) : (
        <td className='k-command-cell'>
            <ButtonGroup>
                <Button
                    size={'small'}
                    themeColor={'success'}
                    disabled={isEdiable}
                    svgIcon={onlyIcon ? editToolsIcon : null}
                    onClick={() => props.edit(dataItem)}
                >
                    {!onlyIcon && '編輯'}
                </Button>
                {!disableDelete && (
                    <Button
                        size={'small'}
                        svgIcon={onlyIcon ? xCircleIcon : null}
                        themeColor={'error'}
                        disabled={isEdiable}
                        onClick={() => {
                            if (confirm === undefined) {
                                alert('InlineCommandCell 還沒有設定 confirm');
                            }
                            confirm(dataItem) && props.remove(dataItem);
                        }}
                    >
                        {!onlyIcon && '刪除'}
                    </Button>
                )}
            </ButtonGroup>
        </td>
    );
};
