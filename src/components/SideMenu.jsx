
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { menuData } from '../data/menuData';
import { Button } from '@progress/kendo-react-buttons';

export default function SideMenu({ sideCollapsed, setSideCollapsed, windowWidth, sideOpen, setSideOpen }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedItems, setExpandedItems] = useState({});
    const sideWidth = sideCollapsed ? '64px' : '240px';

    const sideMenuBase = {
        width: sideWidth,
        backgroundColor: '#1f2d3a',
        color: '#ecf0f1',
        padding: '20px 10px',
        boxSizing: 'border-box',
        transition: 'transform 0.25s ease, visibility 0.25s ease, width 0.2s ease',
        overflow: 'hidden',
    };

    const sideMenuResponsive =
        windowWidth <= 768
            ? {
                  position: 'fixed',
                  top: '60px',
                  left: 0,
                  height: 'calc(100vh - 60px)',
                  zIndex: 1100,
                  transform: sideOpen ? 'translateX(0)' : 'translateX(-110%)',
              }
            : {
                  position: 'sticky',
                  top: '60px',
                  alignSelf: 'stretch',
                  height: 'calc(100vh - 60px)',
              };

    const sideMenuStyle = { ...sideMenuBase, ...sideMenuResponsive };

    const collapseButtonStyle = {
        background: 'transparent',
        border: '1px solid rgba(255,255,255,0.06)',
        color: '#ecf0f1',
        padding: '6px',
        borderRadius: '6px',
        cursor: 'pointer',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '12px',
    };



    return (
        <aside style={sideMenuStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: sideCollapsed ? 'center' : 'flex-end',
                        padding: '6px',
                    }}
                >
                    <Button
                        onClick={() => setSideCollapsed(!sideCollapsed)}
                        style={collapseButtonStyle}
                        aria-label={sideCollapsed ? 'Expand menu' : 'Collapse menu'}
                        title={sideCollapsed ? 'Expand' : 'Collapse'}
                    >
                        {sideCollapsed ? '»' : '«'}
                    </Button>
                </div>

                <div>
                    {menuData.map((item) => (
                        <div key={item.text}>
                            <div
                                onClick={() => {
                                    if (item.children) {
                                        setExpandedItems(prev => ({
                                            ...prev,
                                            [item.text]: !prev[item.text]
                                        }));
                                    } else {
                                        navigate(item.url);
                                        if (windowWidth <= 768 && setSideOpen) setSideOpen(false);
                                    }
                                }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: sideCollapsed ? 0 : 8,
                                    color: location.pathname === item.url ? '#3498db' : '#ecf0f1',
                                    padding: '8px 12px',
                                    borderRadius: '6px',
                                    backgroundColor: location.pathname === item.url ? 'rgba(52, 152, 219, 0.1)' : 'transparent',
                                    marginBottom: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                <span style={{ display: 'flex', alignItems: 'center', gap: sideCollapsed ? 0 : 8 }}>
                                    {sideCollapsed ? item.icon : `${item.icon} ${item.text}`}
                                </span>
                                {item.children && !sideCollapsed && (
                                    <span>{expandedItems[item.text] ? '▼' : '▶'}</span>
                                )}
                            </div>
                            {item.children && expandedItems[item.text] && !sideCollapsed && (
                                <div style={{ marginLeft: '20px' }}>
                                    {item.children.map((child) => (
                                        <div
                                            key={child.text}
                                            onClick={() => {
                                                navigate(child.url);
                                                if (windowWidth <= 768 && setSideOpen) setSideOpen(false);
                                            }}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                color: location.pathname === child.url ? '#3498db' : '#bdc3c7',
                                                padding: '6px 12px',
                                                borderRadius: '4px',
                                                backgroundColor: location.pathname === child.url ? 'rgba(52, 152, 219, 0.1)' : 'transparent',
                                                marginBottom: '2px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                            }}
                                        >
                                            {child.icon && <span>{child.icon}</span>}
                                            {child.text}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
}
