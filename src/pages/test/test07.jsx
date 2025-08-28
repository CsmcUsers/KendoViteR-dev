import { apiFile } from '@/api'
import { DPicker, DTPicker } from '@/components/date-input'
import { Button } from '@progress/kendo-react-buttons'
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout'
import { useState } from 'react'

export default function Test07(props) {
    const [pd, setPd] = useState(null)

    return (
        <div className='k-card-list'>
            <Card>
                <CardHeader>
                    <CardTitle>{props.displayName}</CardTitle>
                </CardHeader>
                <CardBody>
                    <div>
                        <Button onClick={() => apiFile()}>call7777</Button>
                    </div>

                    <div>{apiFile.defaults.baseURL}</div>
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col3'>
                            <Button onClick={() => apiFile()}>call7777</Button>
                            <div>
                                {apiFile.defaults.baseURL}
                                <DPicker
                                    size={'small'}
                                    value={pd}
                                    onChange={(p) => setPd(p.value)}
                                />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}
