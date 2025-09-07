import { isLocal } from '@/share/common';
import { useTokenContext } from '@/share/context';
import { find, isEmpty, isNil } from 'lodash';
import { useNavigate } from 'react-router-dom';

/**
 * 檢查是否有該頁面的權限
 * @param {children, data, controlList} param0
 * @returns
 */
export function ProtectedRoute({ children, data, controlList }) {
    let isValid = false;

    const {
        userToken: { IsSupper },
    } = useTokenContext();

    const navigate = useNavigate();

    let conPath = '';

    if (IsSupper) {
        isValid = true;
        conPath += '0+';
    }

    let apppath = isLocal()
        ? window.location.pathname.toUpperCase()
        : window.location.pathname.substring(4).toUpperCase();

    //檢查該URL 是否在控管名單上面
    let isMatchControllList = !isNil(find(controlList, (p) => p.Path.toUpperCase() === apppath));

    if (isEmpty(data) || isEmpty(controlList)) {
        conPath += '0';
        isValid = true;
    }

    if (['/FLOW/FLOW01', '/FLOW/FLOW02', '/FLOW/FLOW04', '/NOAUTH'].includes(apppath)) {
        isValid = true;
        conPath += '1';
    }

    if (apppath.includes('TEST')) {
        isValid = true;
        conPath += '2';
    }

    if (isMatchControllList) {
        let isMatch2 = !isNil(find(data, (p) => p.Path.toUpperCase() === apppath));

        conPath += '3';
        if (isMatch2) {
            isValid = true;

            conPath += '4';
        }
    } else {
        isValid = true;
        conPath += '5';
    }

    // console.log('conPath= ', conPath, apppath, isValid);

    //<Navigate to='/NoAuth' />在 v6版本會有點問題
    //https://stackoverflow.com/questions/70742216/react-js-react-router-dom-navigate-not-working
    return isValid ? children : <button onClick={navigate('/NoAuth')}></button>;
}
