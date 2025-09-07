import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { menuData } from '@/data/menuData';
import { Button } from '@progress/kendo-react-buttons';
import { Switch } from '@progress/kendo-react-inputs';
import { createtoHierarchyFunc } from '@/share/common';
import { assign, isEmpty } from 'lodash';
import { useFlowContext } from '@/share/context';

export default function SideMenu({
    sideCollapsed,
    setSideCollapsed,
    windowWidth,
    sideOpen,
    setSideOpen,
    data: functions,
}) {
    const navigate = useNavigate();
    const location = useLocation();
    const [expandedItems, setExpandedItems] = useState({});

    //開關1
    const [isMockData, setIsMockData] = useState(false);

    const getFuncHData = createtoHierarchyFunc('Pid', 'Id', 'children');

    const sideWidth = sideCollapsed ? '64px' : '240px';

    const { flowData } = useFlowContext();

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

    functions = functions.map((p) => {
        let icon = isEmpty(p.Path) ? '📁' : '📄';
        return assign({}, { text: p.FuncName, icon: icon, url: p.Path, ...p });
    });

    let funcsHD = getFuncHData(functions, null);

    let showMenuData = isMockData ? menuData : funcsHD;

    // 產生單一連結項目的JSX
    const createMenuItem = (item, level = 0, itemKey = null) => {
        const key = itemKey || `${item.text}_${level}`;
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedItems[key];
        const isActive = location.pathname === item.url;
        const marginLeft = level * 20;

        return (
            <div key={key}>
                <div
                    onClick={() => {
                        if (hasChildren) {
                            setExpandedItems((prev) => ({
                                ...prev,
                                [key]: !prev[key],
                            }));
                        } else if (item.url) {
                            navigate(item.url);
                            if (windowWidth <= 768 && setSideOpen) setSideOpen(false);
                        }
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: hasChildren ? 'space-between' : 'flex-start',
                        gap: sideCollapsed ? 0 : 8,
                        color: isActive ? '#3498db' : level === 0 ? '#ecf0f1' : '#bdc3c7',
                        padding: '8px 12px',
                        borderRadius: level === 0 ? '6px' : '4px',
                        backgroundColor: isActive ? 'rgba(52, 152, 219, 0.1)' : 'transparent',
                        marginBottom: level === 0 ? '4px' : '2px',
                        marginLeft: `${marginLeft}px`,
                        cursor: 'pointer',
                        fontSize: level === 0 ? '16px' : '14px',
                    }}
                >
                    <span style={{ display: 'flex', alignItems: 'center', gap: sideCollapsed ? 0 : 8 }}>
                        {sideCollapsed ? item.icon : `${item.icon || ''} ${item.text}`}
                    </span>
                    {hasChildren && !sideCollapsed && <span>{isExpanded ? '▼' : '▶'}</span>}
                </div>
                {hasChildren && isExpanded && !sideCollapsed && renderMenuItems(item.children, level + 1)}
            </div>
        );
    };

    // 遞迴渲染菜單的方法
    const renderMenuItems = (items, level = 0) => {
        return items
            .filter((item) => !item.Hide)
            .sort((a, b) => (a.FOrder || 0) - (b.FOrder || 0))
            .map((item) => createMenuItem(item, level));
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
                        title={sideCollapsed ? '展開' : '收合'}
                    >
                        {sideCollapsed ? '»' : '«'}
                    </Button>
                </div>

                <div
                    style={{
                        flex: 1,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        paddingRight: '4px',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: sideCollapsed ? 0 : 8,
                            color: '#ecf0f1',
                            padding: '8px 12px',
                            borderRadius: '6px',
                            backgroundColor: 'transparent',
                            marginBottom: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {'MockData'}
                        <Switch
                            checked={isMockData}
                            onChange={(e) => {
                                setIsMockData(e.value);
                            }}
                        ></Switch>
                    </div>

                    {/* 首頁連結 */}
                    {createMenuItem({ text: '首頁', icon: '🏠', url: '/' }, 0, 'home')}
                    {createMenuItem(
                        { text: `待簽核(${flowData.signlist.length})`, icon: '✨', url: '/flow/flow01' },
                        0,
                        'flow01'
                    )}
                    {createMenuItem({ text: '已送審/已簽', icon: '✅', url: '/flow/flow02' }, 0, 'flow02')}
                    {createMenuItem(
                        { text: `退回申請單(${flowData.returnlist.length})`, icon: '🎧', url: '/flow/flow04' },
                        0,
                        'flow04'
                    )}

                    {renderMenuItems(showMenuData)}
                </div>
            </div>
        </aside>
    );
}
