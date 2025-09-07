import React, { useEffect, useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { TmplatePartial } from '../components';

const Appr20 = (props) => {
    const [pageData, setPageData] = useState({
        source: [],
    });

    useEffect(() => {
        refresh();
    }, []);

    const refresh = (p) => {};

    return (
        <TmplatePartial funcId={'Appr20'}>
            <Grid>
                <Column />
            </Grid>
        </TmplatePartial>
    );
};

export default Appr20;
