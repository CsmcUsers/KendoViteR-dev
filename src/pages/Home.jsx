import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { Button } from '@progress/kendo-react-buttons';

function Home() {
    const [count, setCount] = useState(0);

    return (
        <div className='home'>
            <div style={{ textAlign: 'center' }}>
                <div>
                    <a href='https://vite.dev' target='_blank' rel='noopener noreferrer'>
                        <img src={viteLogo} className='logo' alt='Vite logo' />
                    </a>
                    <a href='https://react.dev' target='_blank' rel='noopener noreferrer'>
                        <img src={reactLogo} className='logo react' alt='React logo' />
                    </a>
                </div>
                <h1>歡迎來到首頁</h1>
                <div className='card'>
                    <Button themeColor={'primary'} onClick={() => setCount((count) => count + 1)}>
                        計數器 {count}
                    </Button>
                    <p>
                        編輯 <code>src/App.jsx</code> 來測試 HMR
                    </p>
                </div>
                <p className='read-the-docs'>點擊 Vite 和 React 標誌以了解更多</p>
            </div>
        </div>
    );
}

export default Home;
