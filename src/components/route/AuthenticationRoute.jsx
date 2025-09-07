import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTokenContext } from '@/share/context/authContext';

export function withAuthProtection(Component) {
    return function ProtectedComponent(props) {
        const { isLoggedIn } = useTokenContext();
        const navigate = useNavigate();

        useEffect(() => {
            if (!isLoggedIn()) {
                const timer = setTimeout(() => {
                    navigate('/login');
                }, 3000);

                return () => clearTimeout(timer);
            }
        }, [isLoggedIn, navigate]);

        if (!isLoggedIn()) {
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '50vh',
                    }}
                >
                    <p>您尚未登入，3秒後將跳轉至登入頁面...</p>
                </div>
            );
        }

        return <Component {...props} />;
    };
}
