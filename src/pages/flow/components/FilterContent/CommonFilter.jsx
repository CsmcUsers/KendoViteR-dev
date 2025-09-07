import { Label } from '@progress/kendo-react-labels';
import React, { useEffect } from 'react';
import { CDRangePicker } from '@/components/date-input';
import { SelFlowStatus, SelFuncType } from '@/components/select';

export const CommonFilter = ({ value, onChange, clearData, showType: isFlow02 }) => {
    useEffect(() => {
        clearData({ target: { name: 'status' } });
    }, [value.funcType]);

    return (
        <>
            <div className='row'>
                <div className='col1' style={{ textAlign: 'end' }}>
                    <Label>{isFlow02 ? '簽核日期' : '起單日期'}</Label>
                </div>
                <div className='col3' style={{ textAlign: 'start' }}>
                    <div style={{ display: 'flex' }}>
                        <CDRangePicker
                            name='timePeriod'
                            width='50%'
                            value={value.timePeriod}
                            onChange={onChange}
                            showClear={true}
                            onClear={() => {
                                onChange({
                                    target: { props: { name: 'timePeriod' } },
                                    value: {
                                        start: null,
                                        end: null,
                                    },
                                });
                            }}
                        ></CDRangePicker>
                    </div>
                </div>
                <div className='col1' style={{ textAlign: 'end' }}>
                    <Label>表單種類</Label>
                </div>
                <div className='col3' style={{ textAlign: 'start' }}>
                    <SelFuncType
                        name='funcType'
                        style={{ width: '250px' }}
                        value={value.funcType}
                        onChange={onChange}
                    ></SelFuncType>
                </div>
                <div className='col1' style={{ textAlign: 'end' }}>
                    <Label>目前狀態</Label>
                </div>
                <div className='col3' style={{ textAlign: 'start' }}>
                    <SelFlowStatus
                        name='status'
                        style={{ width: '200px' }}
                        value={value.status}
                        selFuncType={value.funcType}
                        onChange={onChange}
                    />
                </div>
            </div>
        </>
    );
};
