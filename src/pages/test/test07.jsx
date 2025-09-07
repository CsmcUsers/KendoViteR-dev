import { apiFile, apiNewInnerPostPermissionSetting2 } from '@/api';
import { CheckboxGroup } from '@/components/checkbox';
import { DPicker, DTPicker } from '@/components/date-input';
import { Button } from '@progress/kendo-react-buttons';
import { Card, CardBody, CardHeader, CardTitle } from '@progress/kendo-react-layout';
import { useState, useEffect } from 'react';
import { SelYear } from '@/components/select/';
import { withAuthProtection } from '@/components/route/AuthenticationRoute';
import { useTokenContext } from '@/share/context/authContext';

function Test07(props) {
    let { ...others } = props;

    const [pd, setPd] = useState(null);
    const { isLoggedIn, login } = useTokenContext();

    const handleApiCall = () => {
        if (isLoggedIn()) {
            apiNewInnerPostPermissionSetting2({ DepID: '0490', EmpID: '002643' });
        }
    };

    const handleFileApiCall = () => {
        if (isLoggedIn()) {
            apiFile();
        }
    };

    useEffect(() => {}, []);

    return (
        <div className='k-card-list'>
            <Card>
                <CardHeader>
                    <CardTitle>{props.displayName}</CardTitle>
                </CardHeader>
                <CardBody>
                    <div>
                        <Button onClick={handleApiCall}>apiNewInnerPostPermission</Button>
                    </div>
                    <div>{apiFile.defaults.baseURL}</div>
                    <CheckboxGroup
                        dataObj={{
                            'A.添購沙包、安裝防水閘門、租/買抽水機': 'A',
                            'B.定期為排水系統作檢護維修': 'B',
                            'C.加強回流裝置、排水渠、及污水渠等設計': 'C',
                            'D.提高電源插座高度、分散電力迴圈系統': 'D',
                            'E.重要設備及物品擺放位置移至高處': 'E',
                            'Z.其他': 'Z',
                        }}
                        size='large'
                        direction='vertical'
                    />
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <div className='row'>
                        <div className='col3'>
                            <Button onClick={handleFileApiCall}>call7777</Button>
                            <div>
                                {apiFile.defaults.baseURL}
                                <DPicker size={'small'} value={pd} onChange={(p) => setPd(p.value)} />
                            </div>
                        </div>
                        <div className='col3'>
                            <SelYear style={{ width: 200 }} />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default withAuthProtection(Test07);
