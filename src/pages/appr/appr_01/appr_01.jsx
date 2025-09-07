import { GridColumn as Column, Grid } from '@progress/kendo-react-grid';
import { TmplatePartial } from '../components';

const Appr01 = () => {
    return (
        <TmplatePartial title={'新臺幣一般存款'} funcId={'Appr01'}>
            <Grid>
                <Column />
            </Grid>
        </TmplatePartial>
    );
};

export default Appr01;
