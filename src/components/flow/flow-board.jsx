import { useFlowContext } from '@/share/context';
import { Card, CardBody, CardHeader } from '@progress/kendo-react-layout';
import { Link } from 'react-router-dom';

let FlowBoard = () => {
    const { flowData } = useFlowContext();

    const renderFlowInfo = ({ data, url, title = 'Title' }) => {
        if (data.length > 0) {
            return (
                <Link to={url} className='clickable-label-black'>
                    <span className='comp-label'>
                        <strong>{`${title}(${data?.length || 0})`}</strong>
                    </span>
                </Link>
            );
        } else {
            return (
                data.length === 0 && (
                    <span className='comp-label'>
                        <strong>{`${title}(${data?.length || 0})`}</strong>
                    </span>
                )
            );
        }
    };

    return (
        <>
            <style>{`
                .comp-label strong {
                    font-size:  22px;
                    line-height: 1;
                    font-weight: 400;
                    display: block;
                }
                .comp-label small {
                    font-size: 0.7em;
                    text-transform: uppercase;
                    display: block;
                }
                .clickable-label-black {
                    color: black;
                }
                .clickable-label-black:hover {
                    text-shadow: 2px 2px 4px gray;
                    cursor: pointer;
                    color: black;
                    text-decoration: none;
                }
                .clickable-label-green {
                    color: green;
                }
                .clickable-label-green:hover {
                    text-shadow: 2px 2px 4px lightgreen;
                    cursor: pointer;
                    color: green;
                    text-decoration: none;
                }
                .clickable-label-red {
                    color: red;
                }
                .clickable-label-red:hover {
                    text-shadow: 2px 2px 4px lightcoral;
                    cursor: pointer;
                    color: red;
                    text-decoration: none;
                }

            
            `}</style>
            <div className='dashboard'>
                <div className='row justify-content-md-center'>
                    <div className={'k-card-deck'}>
                        <Card
                            style={{
                                width: 450,
                                marginLeft: '10px',
                            }}
                            orientation='horizontal'
                        >
                            <CardHeader style={{ backgroundColor: '#6fb6c2' }}></CardHeader>
                            <CardBody>
                                <span className='comp-label'>
                                    {renderFlowInfo({
                                        data: flowData.signlist,
                                        url: '/flow/flow01',
                                        title: '待簽核表單',
                                    })}
                                </span>
                            </CardBody>
                        </Card>
                        <Card
                            style={{
                                width: 450,
                            }}
                            orientation='horizontal'
                        >
                            <CardHeader style={{ backgroundColor: '#6fb6c2' }}></CardHeader>
                            <CardBody>
                                <span className='comp-label'>
                                    {renderFlowInfo({
                                        data: flowData.returnlist,
                                        url: '/flow/flow04',
                                        title: '被退回的表單',
                                    })}
                                </span>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};

export { FlowBoard };
