import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import { apiFile } from '@/api';
import { Button } from '@progress/kendo-react-buttons';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
const people = [
    {
        name: 'Calvin Hawkins',
        email: 'calvin.hawkins@example.com',
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Kristen Ramos',
        email: 'kristen.ramos@example.com',
        image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
        name: 'Ted Fox',
        email: 'ted.fox@example.com',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
];

export default function Test08(props) {
    return (
        <div className='k-card-list'>
            <Card>
                <CardHeader>
                    <CardTitle>{props.displayName}</CardTitle>
                </CardHeader>
                <CardBody></CardBody>
            </Card>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col3'>
                            <Button themeColor={'primary'}>primary</Button>
                            <Button themeColor={'secondary'}>jio2</Button>
                        </div>
                        <div className='col3'>
                            <Button>jio</Button>
                        </div>
                        <div className='col3'>
                            <Button className='k-button'>jio</Button>
                        </div>
                        <div className='col3'>
                            <Button>jio</Button>
                        </div>
                    </div>
                    {/* 產生一個kendo的datagrid元件的範例  */}
                    <div className='row'>
                        <div className='col12'>
                            <Button>jio</Button>
                            <Button>jio2</Button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col12'>
                            <Grid data={people}>
                                <GridColumn field='name' title='姓名' />
                                <GridColumn field='email' title='電子郵件' />
                            </Grid>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
