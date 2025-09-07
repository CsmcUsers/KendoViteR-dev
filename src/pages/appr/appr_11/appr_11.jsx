import React, { useEffect, useState } from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { TmplatePartial } from '../components';

const Appr11 = (props) => {
    const [pageData, setPageData] = useState({
        source: [],
    });

    useEffect(() => {
        refresh();
    }, []);

    const refresh = (p) => {};

    return (
        <TmplatePartial title={'數位金融業務'} funcId={'Appr11'}>
            <Grid>
                <Column />
            </Grid>
        </TmplatePartial>
    );
};

export default Appr11;
