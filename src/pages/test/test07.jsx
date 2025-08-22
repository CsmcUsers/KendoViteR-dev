import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import { apiFile } from '@/api';
import { Button } from '@progress/kendo-react-buttons';

export default function Test07(props) {
    return (
        <div className='k-card-list'>
            <Card>
                <CardHeader>
                    <CardTitle>{props.displayName}</CardTitle>
                </CardHeader>
                <CardBody>
                    <div>
                        <Button onClick={(f) => apiFile()}>call7777</Button>
                    </div>

                    <div>{apiFile.defaults.baseURL}</div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <div>
                        <Button onClick={(f) => apiFile()}>call7777</Button>
                    </div>

                    <div>{apiFile.defaults.baseURL}</div>
                </CardBody>
            </Card>
        </div>
    );
}
