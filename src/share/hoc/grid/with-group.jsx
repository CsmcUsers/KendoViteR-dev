import { groupBy } from '@progress/kendo-data-query';
import { setExpandedState, setGroupIds } from '@progress/kendo-react-data-tools';
import React, { useEffect, useState, useCallback } from 'react';

/**
 * 處理gourp 資料
 * @param {*} data
 * @param {*} group
 * @returns
 */
const processWithGroups = (data, group) => {
    const newDataState = groupBy(data, group);

    setGroupIds({
        data: newDataState,
        group: group,
    });
    return newDataState;
};

/**
 * 且所有的Column都要有width
 * 建議Column 的width 一定要用大一點，不然Group 會擠在一起
 *
 *  isNil 判斷是不是Group 的行
 *  <td>{isNil(groupId) && `${Create_Uid}/${mapUserName(common, Create_Uid, '')}`}</td>
 *
 * @param {*} GridComponent
 * @returns
 */
export const withGridGroup = (GridComponent) => (props) => {
    const initialGroup = [{}];

    const [group, setGroup] = useState(props?.initialGroup || initialGroup);

    const [showResultState, setShowResultState] = useState([]);

    const [collapsedState, setCollapsedState] = useState([]);

    const onGroupChange = useCallback(
        (event) => {
            const newDataState = processWithGroups(props.data, event.group);

            setGroup(event.group);
            setShowResultState(newDataState);
        },
        [props?.data]
    );

    const onExpandChange = useCallback(
        (event) => {
            const item = event.dataItem;
            console.log(event.dataItem);

            if (item.groupId) {
                const newCollapsedIds = !event.value
                    ? [...collapsedState, item.groupId]
                    : collapsedState.filter((groupId) => groupId !== item.groupId);
                setCollapsedState(newCollapsedIds);
            }
        },
        [collapsedState]
    );

    useEffect(() => {
        setShowResultState(processWithGroups(props?.data, props?.initialGroup));
    }, [props.data]);

    const newData = setExpandedState({
        data: showResultState,
        collapsedIds: collapsedState,
    });

    return (
        <GridComponent
            groupable={true}
            onGroupChange={onGroupChange}
            group={group}
            onExpandChange={onExpandChange}
            expandField='expanded'
            {...props}
            //一定要在props下面不然會帶入原始資料
            data={newData}
        />
    );
};
