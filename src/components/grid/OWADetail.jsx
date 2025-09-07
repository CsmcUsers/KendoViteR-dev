import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { apiOutterGetOWA } from '../../api';
import { extractPatterns, handleErrorSw } from '../../share/common';
import { useLoading } from '../../share/hook';
import { loadingPanel } from '../K_Common';

export const OWADetail = ({ data = '' }) => {
    const [owa, setOWA] = useState([]);

    const [loading, startLoading, finishLoading] = useLoading();

    let extracted = extractPatterns(data, /資訊處-第\d{7}號/g).map((p) => {
        return { text: p };
    });

    let hasOWA = extracted.length !== 0;

    const refresh = async () => {
        if (!hasOWA) {
            setOWA([]);
            return;
        }

        startLoading();

        axios
            .all(
                extracted.map((p) => {
                    let seven = extractPatterns(p.text, /\d{7}/);
                    return apiOutterGetOWA({ sid: seven[0] });
                })
            )
            .then(
                axios.spread((...res) => {
                    setOWA(res.map((p) => ({ ...p.data, text: p.config.data })));
                })
            )
            .catch(handleErrorSw)
            .finally(() => {
                finishLoading();
            });
    };

    useEffect(() => {
        refresh();
    }, [extracted.length]);

    let owadetail = (
        <div style={{ border: '1px solid black', padding: '5px', marginTop: '5px' }}>
            {loading && loadingPanel}

            <Grid data={owa}>
                <Column
                    field='text'
                    width={200}
                    title='需求單號'
                    cells={{
                        data: ({ dataItem: item, field }) => {
                            let j = JSON.parse(item?.[field]);
                            return <td>資訊處-第{j.sid}號</td>;
                        },
                    }}
                />
                <Column
                    field='REMARK'
                    title='說明   (上面事由有符合 資訊處-第xxxxxxx號 的格式會帶入需求單資訊)'
                    cells={{
                        data: ({ dataItem: item, field }) => {
                            return (
                                <td>
                                    <span>{item?.[field]}</span>{' '}
                                    <span style={{ color: 'green' }}>{item?.['MIS_DTE'] !== null ? 'ok' : ''}</span>
                                </td>
                            );
                        },
                    }}
                />
            </Grid>
        </div>
    );

    return owadetail;
};
