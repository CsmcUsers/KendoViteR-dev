import React from 'react';

/**
 * detail 展開的鍵
 */
export class DetailColumnCell extends React.Component {
    render() {
        let dataItem = this.props.dataItem;

        return (
            <td className='k-hierarchy-cell'>
                {dataItem.details.length === 0 ? (
                    <></>
                ) : dataItem.expanded ? (
                    <span
                        onClick={() => {
                            this.props.expandChange(dataItem);
                            return;
                        }}
                        className='k-icon k-minus'
                        href='#'
                        tabIndex='-1'
                    >
                        閉
                    </span>
                ) : (
                    <span
                        onClick={() => {
                            this.props.expandChange(dataItem);
                            return;
                        }}
                        className='k-icon k-plus'
                        href='#'
                        tabIndex='-1'
                    >
                        開
                    </span>
                )}
            </td>
        );
    }
}
export * from './time-cell';
export * from './inline-command-cell';
export * from './colorful_cell';
export * from './bool-cell';
