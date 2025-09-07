import React from 'react';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import _ from 'lodash';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { getTimeString } from '@/share/common';
import { loadingPanel } from '@/components/K_Common';
import { BtnCancel } from '@/components/button/K_Button';
import { useUserContext, mapDeptName } from '@/share/context/userContext';

export const ScoreBoard = (props) => {
    const common = useUserContext();

    return (
        <Dialog height={500} width={500} title={'匯入成績'} onClose={props.onClose}>
            {props.loading && loadingPanel}
            <div className='row'>
                <div className='col-md-12'>
                    <Grid data={props.data}>
                        <Column
                            title='分行'
                            cells={{ data: (p) => <td>{mapDeptName(common, p.dataItem.Branch)}</td> }}
                        />
                        <Column title='得分' field='Score_Val' />
                        {/* <Column title='總分' field='Total_Score' /> */}
                        <Column
                            title='匯入時間'
                            cells={{ data: (p) => <td>{getTimeString(p.dataItem.Create_datetime)}</td> }}
                        />
                    </Grid>
                </div>
            </div>
            <DialogActionsBar>
                <BtnCancel onClick={props.onClose} />
            </DialogActionsBar>
        </Dialog>
    );
};
