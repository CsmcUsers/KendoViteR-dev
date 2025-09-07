import React, { useEffect, useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { TmplatePartial } from '../components';

const Appr13 = (props) => {
    const [pageData, setPageData] = useState({
        source: [],
    });

    useEffect(() => {
        refresh();
    }, []);

    const refresh = (p) => {};

    return (
        <TmplatePartial title={'盈餘'} funcId={'Appr13'}>
            <Grid>
                <Column />
            </Grid>
        </TmplatePartial>
    );
};

export default Appr13;
