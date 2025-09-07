import React, { useEffect, useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { TmplatePartial } from '../components';

const Appr10 = (props) => {
    const [pageData, setPageData] = useState({
        source: [],
    });

    useEffect(() => {
        refresh();
    }, []);

    const refresh = (p) => {};

    return (
        <TmplatePartial title={'資訊安全'} funcId={'Appr10'}>
            <Grid>
                <Column />
            </Grid>
        </TmplatePartial>
    );
};

export default Appr10;
