import axios from 'axios';
import { filter } from 'lodash';

import { urlNotes01, urlNotes02, urlNotes03, urlNotes04, urlNotes05 } from '@/share/setting';
axios.defaults.withCredentials = true;

export const apiNotes01 = axios.create({ baseURL: urlNotes01 });

export const apiNotes02 = axios.create({ baseURL: urlNotes02 });

export const apiNotes03 = axios.create({ baseURL: urlNotes03 });

export const apiNotes04 = axios.create({ baseURL: urlNotes04 });

export const apiNotes05 = axios.create({ baseURL: urlNotes05 });

export const apiNotesTerGetApplyById = (p) => apiNotes01.post('GetById', p);
export const apiNotesTerGetApplyByCon = (p) => apiNotes01.post('GetApplyByCon', p);
export const apiNotes_CreateTerEnterApply = (p) => apiNotes01.post('CreateTerEnterApply', p);
export const apiNotes_UpdateTerEnterApply = (p) => apiNotes01.post('UpdateTerEnterApply', p);
export const apiNotes_DeleteEnterApply = (p) => apiNotes01.post('DeleteTerEnterApply', p);

export const apiNotesGetApplyByCon = (p) => apiNotes02.post('GetApplyByCon', p);

/**
 *
 * @param {*}  { Id: int }
 * @returns
 */
export const apiNotesGetApplyById = (p) => apiNotes02.post('GetById', p);
export const apiNotesGetWorkList = (p) => apiNotes02.post('GetWorkList', p);
export const apiNotesUpdateEnterApply = (p) => apiNotes02.post('UpdateEnterApply', p);
export const apiNotesCreateEnterApply = (p) => apiNotes02.post('CreateEnterApply', p);
export const apiNotesDeleteEnterApply = (p) => apiNotes02.post('DeleteEnterApply', p);
export const apiNotesGetMISByUid = ({ uid }) => apiNotes02.post('GetMISByUid', { uid });

export const apiNotesGetMediaById = (p) => apiNotes03.post('GetById', p);
export const apiNotesGetMediaByYear = (p) => apiNotes03.post('GetMediaByYear', p);
export const apiNotesGetDetailByMid = (p) => apiNotes03.post('GetDetailByMid', p);
export const apiNotesCreateMediaRoom = (p) => apiNotes03.post('CreateMediaRoom', p);
export const apiNotesUpdateMediaRoom = (p) => apiNotes03.post('UpdateMediaRoom', p);
export const apiNotesDeleteMediaRoom = (p) => apiNotes03.post('DeleteMediaRoom', p);

export const apiNotesGetPasswdByYear = (p) => apiNotes05.post('GetByYear', p);
export const apiNotesGetPassWDSheetById = (p) => apiNotes05.post('GetById', p);
export const apiNotesCreatePSSheet = (p) => apiNotes05.post('CreatePSSheet', p);
export const apiNotesUpdatePassWDSheet = (p) => apiNotes05.post('UpdatePassWDSheet', p);
export const apiNotesDeletePassWDSheet = (p) => apiNotes05.post('DeletePassWDSheet', p);
export const apiNotesSaveSign = (p) => apiNotes05.post('SaveSign', p);
export const apiNotesDeleteSign = (p) => apiNotes05.post('DeleteSign', p);

export const rerangeFun = (selectDetail) => {
    let outc = filter(selectDetail, { DriveType: 'C', InorOut: false });
    let inc = filter(selectDetail, { DriveType: 'C', InorOut: true });
    let outl = filter(selectDetail, { DriveType: 'L', InorOut: false });
    let inl = filter(selectDetail, { DriveType: 'L', InorOut: true });
    let outs = filter(selectDetail, { DriveType: 'S', InorOut: false });
    let ins = filter(selectDetail, { DriveType: 'S', InorOut: true });
    let outd = filter(selectDetail, { DriveType: 'D', InorOut: false });
    let ind = filter(selectDetail, { DriveType: 'D', InorOut: true });
    let outo = filter(selectDetail, { DriveType: 'O', InorOut: false });
    let ino = filter(selectDetail, { DriveType: 'O', InorOut: true });

    let outcountc = outc?.length || 0;
    let incountc = inc?.length || 0;
    let outcountl = outl?.length || 0;
    let incountl = inl?.length || 0;
    let outcounts = outs?.length || 0;
    let incounts = ins?.length || 0;
    let outcountd = outd?.length || 0;
    let incountd = ind?.length || 0;
    let outcounto = outo?.length || 0;
    let incounto = ino?.length || 0;

    let detailView = [
        {
            outtype: 'C',
            outcount: outcountc,
            outmemo: outc,
            intype: 'C',
            incount: incountc,
            inmemo: inc,
        },
        {
            outtype: 'L',
            outcount: outcountl,
            outmemo: outl,
            intype: 'L',
            incount: incountl,
            inmemo: inl,
        },
        {
            outtype: 'S',
            outcount: outcounts,
            outmemo: outs,
            intype: 'S',
            incount: incounts,
            inmemo: ins,
        },
        {
            outtype: 'D',
            outcount: outcountd,
            outmemo: outd,
            intype: 'D',
            incount: incountd,
            inmemo: ind,
        },
        {
            outtype: 'O',
            outcount: outcounto,
            outmemo: outo,
            intype: 'O',
            incount: incounto,
            inmemo: ino,
        },
    ];

    let sumall = {
        C: incountc - outcountc,
        L: incountl - outcountl,
        S: incounts - outcounts,
        D: incountd - outcountd,
        O: incounto - outcounto,
    };

    return [detailView, sumall];
};
