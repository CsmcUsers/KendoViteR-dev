import { NavLink } from 'react-router-dom';
import { IntlProvider, load, loadMessages, LocalizationProvider } from '@progress/kendo-react-intl';
import { useState, useEffect } from 'react';
import SideMenu from './SideMenu';
import { chain, filter } from 'lodash';
import { _commonpage } from '@/data/result';
import { language } from '@/data/language/Taiwan.js';

//#region  CLDR 數據導入

import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';
import numbers from 'cldr-numbers-full/main/zh-Hant/numbers.json';
import currencies from 'cldr-numbers-full/main/zh-Hant/currencies.json';
import caGregorian from 'cldr-dates-full/main/zh-Hant/ca-gregorian.json';
import dateFields from 'cldr-dates-full/main/zh-Hant/dateFields.json';
import timeZoneNames from 'cldr-dates-full/main/zh-Hant/timeZoneNames.json';
import { useTokenContext, useUserContext } from '@/share/context';

//#endregion

// 載入 CLDR 數據
load(likelySubtags, currencyData, weekData, numbers, currencies, caGregorian, dateFields, timeZoneNames);
loadMessages(language, 'zh-TW');

const appName = import.meta.env.VITE_APP_NAME;

// 樣式物件
const styles = {
    layout: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        margin: '0',
        padding: '0',
        width: '100%',
    },
    navbar: {
        backgroundColor: '#2c3e50',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: '0',
        left: '0',
        right: '0',
        width: '100%',
        zIndex: 1000,
        margin: '0',
        padding: '0',
    },
    navContainer: {
        width: '100%',
        margin: '0',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60px',
        boxSizing: 'border-box',
    },
    navLogo: {
        color: '#ecf0f1',
        margin: '0',
        fontSize: '1.5rem',
    },
    //上面的NavBar
    navMenu: {
        display: 'flex',
        listStyle: 'none',
        margin: '0',
        padding: '0',
        gap: '20px',
    },
    navItem: {
        display: 'flex',
        alignItems: 'center',
    },
    navLink: {
        color: '#bdc3c7',
        textDecoration: 'none',
        padding: '8px 16px',
        borderRadius: '6px',
        transition: 'all 0.3s ease',
        fontWeight: '500',
    },
    navLinkActive: {
        color: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
    },
    mainContent: {
        flex: 1,
        // maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px',
        width: '100%',
        boxSizing: 'border-box',
    },
    footerText: {
        margin: '0',
        fontSize: '0.9rem',
    },
};

// 響應式樣式
const getResponsiveStyles = (windowWidth) => {
    const isMobile = windowWidth <= 768;
    const isSmallMobile = windowWidth <= 480;

    if (isSmallMobile) {
        return {
            navContainer: {
                ...styles.navContainer,
                flexDirection: 'column',
                height: 'auto',
                padding: '10px 5px',
            },
            navLogo: {
                ...styles.navLogo,
                marginBottom: '15px',
                fontSize: '1.3rem',
            },
            navMenu: {
                ...styles.navMenu,
                gap: '10px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
            },
            navLink: {
                ...styles.navLink,
                padding: '6px 12px',
                fontSize: '0.9rem',
            },
            mainContent: {
                ...styles.mainContent,
                padding: '15px 0',
            },
        };
    } else if (isMobile) {
        return {
            navContainer: {
                ...styles.navContainer,
                flexDirection: 'column',
                height: 'auto',
                padding: '15px 10px',
            },
            navLogo: {
                ...styles.navLogo,
                marginBottom: '15px',
            },
            navMenu: {
                ...styles.navMenu,
                gap: '15px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                width: '100%',
            },
            mainContent: {
                ...styles.mainContent,
                padding: '20px 0',
            },
        };
    }

    return styles;
};

function Layout({ children, data: functions }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [sideOpen, setSideOpen] = useState(window.innerWidth > 768);
    const [sideCollapsed, setSideCollapsed] = useState(false);
    const { userToken } = useTokenContext();
    const common = useUserContext();

    const getCommonAuth = (f) => {
        let rval = [];
        let commonpage = _commonpage.map((p) => p.toUpperCase());

        rval = rval.concat(
            filter(f, (p) => {
                return commonpage.includes(p.FuncId.toUpperCase());
            })
        );

        return rval;
    };

    const mcb = (user, f) => {
        let rval = [];

        if (user.IsSupper) {
        } else {
            let accesspages = chain(common.actAuths)
                .filter((p) => p.Act === 'access')
                .map((p) => p.FuncPK)
                .value();

            rval = filter(f, (p) => accesspages.includes(p.Id));
        }

        return rval;
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            // 同步 side menu 在大螢幕自動顯示、在小螢幕自動隱藏
            if (window.innerWidth > 768) {
                setSideOpen(true);
            } else {
                setSideOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const responsiveStyles = getResponsiveStyles(windowWidth);

    // hover 效果處理
    const handleNavLinkHover = (e, isHover) => {
        if (isHover) {
            e.target.style.color = '#ecf0f1';
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        } else {
            if (!e.target.classList.contains('active')) {
                e.target.style.color = '#bdc3c7';
                e.target.style.backgroundColor = 'transparent';
            }
        }
    };

    // 組合 side menu 在不同寬度下的樣式
    const contentWrapperStyle = {
        display: 'flex',
        alignItems: 'stretch',
        // gap: '20px',
        width: '100%',
        boxSizing: 'border-box',
    };

    // menu toggle button for small screens
    const menuToggleStyle = {
        background: 'transparent',
        border: '1px solid rgba(236,240,241,0.08)',
        color: '#ecf0f1',
        padding: '6px 10px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '1.1rem',
    };

    let leftFuncs = mcb(userToken, functions);

    let commonFuncs = getCommonAuth(functions);

    let allpages = chain(leftFuncs).concat(commonFuncs).uniqBy('Id').orderBy('FOrder').value();

    return (
        <LocalizationProvider language='zh-TW'>
            <IntlProvider locale='zh-Hant'>
                <div style={styles.layout}>
                    <nav style={styles.navbar}>
                        <div style={responsiveStyles.navContainer || styles.navContainer}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                {/* 在小螢幕顯示切換按鈕 */}
                                {windowWidth <= 768 && (
                                    <button
                                        onClick={() => setSideOpen(!sideOpen)}
                                        style={menuToggleStyle}
                                        aria-label='Toggle menu'
                                    >
                                        ☰
                                    </button>
                                )}
                                <h2 style={responsiveStyles.navLogo || styles.navLogo}>{appName}</h2>
                            </div>
                            <ul style={responsiveStyles.navMenu || styles.navMenu}>
                                <li
                                    style={{
                                        ...styles.navItem,
                                        color: '#ecf0f1',
                                        fontSize: '0.9rem',
                                        padding: '8px 12px',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                        borderRadius: '6px',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                    }}
                                >
                                    <span style={{ marginRight: '8px' }}>👤</span>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        <span style={{ fontWeight: '600' }}>
                                            {userToken.UseID ? userToken.EMP_NAME || userToken.UseID : '沒有登入'}
                                        </span>
                                        {userToken.DEPT_NAME && (
                                            <span style={{ fontSize: '0.8rem', opacity: '0.8' }}>
                                                {userToken.DEPT_NAME}
                                            </span>
                                        )}
                                    </div>
                                </li>
                                <li style={styles.navItem}>
                                    <NavLink
                                        to='/'
                                        style={({ isActive }) => ({
                                            ...(responsiveStyles.navLink || styles.navLink),
                                            ...(isActive ? styles.navLinkActive : {}),
                                        })}
                                        onMouseEnter={(e) => handleNavLinkHover(e, true)}
                                        onMouseLeave={(e) => handleNavLinkHover(e, false)}
                                    >
                                        首頁
                                    </NavLink>
                                </li>
                                <li style={styles.navItem}>
                                    <NavLink
                                        to='/about'
                                        style={({ isActive }) => ({
                                            ...(responsiveStyles.navLink || styles.navLink),
                                            ...(isActive ? styles.navLinkActive : {}),
                                        })}
                                        onMouseEnter={(e) => handleNavLinkHover(e, true)}
                                        onMouseLeave={(e) => handleNavLinkHover(e, false)}
                                    >
                                        關於我們
                                    </NavLink>
                                </li>
                                <li style={styles.navItem}>
                                    <NavLink
                                        to='/products'
                                        style={({ isActive }) => ({
                                            ...(responsiveStyles.navLink || styles.navLink),
                                            ...(isActive ? styles.navLinkActive : {}),
                                        })}
                                        onMouseEnter={(e) => handleNavLinkHover(e, true)}
                                        onMouseLeave={(e) => handleNavLinkHover(e, false)}
                                    >
                                        產品
                                    </NavLink>
                                </li>
                                <li style={styles.navItem}>
                                    <NavLink
                                        to='/grid-test'
                                        style={({ isActive }) => ({
                                            ...(responsiveStyles.navLink || styles.navLink),
                                            ...(isActive ? styles.navLinkActive : {}),
                                        })}
                                        onMouseEnter={(e) => handleNavLinkHover(e, true)}
                                        onMouseLeave={(e) => handleNavLinkHover(e, false)}
                                    >
                                        網格測試
                                    </NavLink>
                                </li>
                                <li style={styles.navItem}>
                                    <NavLink
                                        to='/contact'
                                        style={({ isActive }) => ({
                                            ...(responsiveStyles.navLink || styles.navLink),
                                            ...(isActive ? styles.navLinkActive : {}),
                                        })}
                                        onMouseEnter={(e) => handleNavLinkHover(e, true)}
                                        onMouseLeave={(e) => handleNavLinkHover(e, false)}
                                    >
                                        聯絡我們
                                    </NavLink>
                                </li>
                                <li style={styles.navItem}>
                                    <button
                                        onClick={() => {
                                            // 登出邏輯
                                            window.location.href = '/login';
                                        }}
                                        style={{
                                            ...styles.navLink,
                                            background: 'transparent',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            cursor: 'pointer',
                                        }}
                                        onMouseEnter={(e) => handleNavLinkHover(e, true)}
                                        onMouseLeave={(e) => handleNavLinkHover(e, false)}
                                    >
                                        登出
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <div></div>
                    <div style={contentWrapperStyle}>
                        <SideMenu
                            data={allpages}
                            sideCollapsed={sideCollapsed}
                            setSideCollapsed={setSideCollapsed}
                            windowWidth={windowWidth}
                            sideOpen={sideOpen}
                            setSideOpen={setSideOpen}
                        />
                        <main
                            style={{ ...(responsiveStyles.mainContent || styles.mainContent), flex: 1, height: '100%' }}
                        >
                            {children}
                        </main>
                    </div>
                </div>
            </IntlProvider>
        </LocalizationProvider>
    );
}

export default Layout;
