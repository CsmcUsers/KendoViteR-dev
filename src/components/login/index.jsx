import { handleErrorSw, isDev, isLocal, sleep } from '@/share/common';
import Swal from 'sweetalert2';
import { useTokenContext } from '@/share/context';
import { Button } from '@progress/kendo-react-buttons';
import qs from 'qs';
import { Loader } from '@progress/kendo-react-indicators';
import { isEmpty, isNil } from 'lodash';
import { useEffect, useState, useTransition } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import reactLogo from '@/assets/logo.svg';
import './login.css';

const waiting = 2e3;

const Login = () => {
    const [email, setEmail] = useState('*************');
    const [password, setPassword] = useState('');

    const [isPending, startTransition] = useTransition();

    let navigate = useNavigate();

    let tokencon = useTokenContext();

    const { module, funcId } = useParams();

    const queryData = qs.parse(location.search, { ignoreQueryPrefix: true });

    const isEmptyUid = isEmpty(queryData.uid);

    const autoLogin = () => {
        startTransition(async () => {
            try {
                await sleep(waiting);

                await tokencon.login(queryData);
                console.log('tokencon.login(queryData)------------------', location.search, queryData);

                if (!isNil(module) && !isNil(funcId)) {
                    navigate(`/${module}/${funcId}`);
                } else {
                    navigate('/');
                }
            } catch (e) {
                Swal.fire({
                    title: '登入失敗',
                    text: '帳號或密碼錯誤，請重新輸入',
                    icon: 'error',
                    confirmButtonText: '確定',
                });
            }
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        //只提提供非正式使用
        if (!isLocal() && !isDev()) {
            return;
        }

        let signInData = { uid: btoa(`${email}`) };

        startTransition(async () => {
            try {
                await sleep(waiting);
                await tokencon.login(signInData);
                navigate('/');
            } catch (e) {
                Swal.fire({
                    title: '登入失敗',
                    text: '帳號或密碼錯誤，請重新輸入',
                    icon: 'error',
                    confirmButtonText: '確定',
                });
            }
        });
    };

    useEffect(() => {
        if (!isEmptyUid) {
            autoLogin().catch((e) => {
                handleErrorSw(e);
            });
        }
    }, [queryData.uid]);

    return (
        <div className='login-container'>
            <form onSubmit={handleSubmit} className='login-form'>
                <div className='login-title'>
                    <img src={reactLogo} alt='React Logo' className='login-logo' />
                    <div className='system-title'>
                        <label className='login-label'>多模組管理專區2.0</label>
                    </div>
                </div>
                <label htmlFor='email' className='login-label'>
                    帳號
                </label>
                <input id='email' className='login-input' value={email} onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor='password' className='login-label'>
                    密碼
                </label>
                <input
                    type='password'
                    id='password'
                    className='login-input'
                    value={isEmptyUid ? '' : '**************'}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button type='submit' className='login-button' disabled={isPending}>
                    {isPending ? '登入中' : '登入'}
                    {isPending && <Loader size='small' type='infinite-spinner'></Loader>}
                </Button>
            </form>
        </div>
    );
};

export const LoginPage = () => {
    return (
        <div className='container-fluid loginp'>
            <Routes>
                <Route path='/' element={<Login />}>
                    <Route path=':module/:funcId/' element={<Login />}></Route>
                </Route>
            </Routes>
        </div>
    );
};
