import React, { useEffect, useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { TmplatePartial } from '../components';

const Appr14 = (props) => {
    const [pageData, setPageData] = useState({
        source: [],
    });

    useEffect(() => {
        refresh();
    }, []);

    const refresh = (p) => {};

    return (
        <TmplatePartial title={'新台幣存放比率'} funcId={'Appr14'}>
            <Grid>
                <Column />
            </Grid>
        </TmplatePartial>
    );
};

export default Appr14;
