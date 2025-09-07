import React from 'react';
import { mapNodeName, useUserContext } from '../../share/context';

export const cellFlowInfo = ({ dataItem, field, funcId }) => {
    const common = useUserContext();
    return <td>{`${mapNodeName(common, funcId, dataItem?.[field])}`}</td>;
};
