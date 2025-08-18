import { NavLink } from 'react-router-dom'

export default function SideMenu({
  sideCollapsed,
  setSideCollapsed,
  windowWidth,
  sideOpen,
  setSideOpen,
}) {
  const sideWidth = sideCollapsed ? '64px' : '240px'

  const sideMenuBase = {
    width: sideWidth,
    backgroundColor: '#1f2d3a',
    color: '#ecf0f1',
    padding: '20px 10px',
    boxSizing: 'border-box',
    transition: 'transform 0.25s ease, visibility 0.25s ease, width 0.2s ease',
    overflow: 'hidden',
  }

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
          // 桌面模式：側邊欄固定於左側並從 navbar 底部延伸到視窗底部
          position: 'sticky',
          top: '60px',
          alignSelf: 'stretch',
          height: 'calc(100vh - 60px)',
        }

  const sideMenuStyle = { ...sideMenuBase, ...sideMenuResponsive }

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
  }

  // 點擊連結在小螢幕自動收起
  const handleLinkClick = () => {
    if (windowWidth <= 768 && setSideOpen) setSideOpen(false)
  }

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
          <button
            onClick={() => setSideCollapsed(!sideCollapsed)}
            style={collapseButtonStyle}
            aria-label={sideCollapsed ? 'Expand menu' : 'Collapse menu'}
            title={sideCollapsed ? 'Expand' : 'Collapse'}
          >
            {sideCollapsed ? '»' : '«'}
          </button>
        </div>

        <nav style={{ flex: 1 }}>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              alignItems: sideCollapsed ? 'center' : 'stretch',
            }}
          >
            <li>
              <NavLink
                to='/'
                onClick={handleLinkClick}
                style={({ isActive }) => ({
                  color: isActive ? '#3498db' : '#ecf0f1',
                  textDecoration: 'none',
                  padding: sideCollapsed ? '8px' : '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: sideCollapsed ? 0 : 8,
                  justifyContent: sideCollapsed ? 'center' : 'flex-start',
                  borderRadius: '6px',
                })}
                title='首頁'
              >
                {sideCollapsed ? '🏠' : '首頁'}
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/about'
                onClick={handleLinkClick}
                style={({ isActive }) => ({
                  color: isActive ? '#3498db' : '#ecf0f1',
                  textDecoration: 'none',
                  padding: sideCollapsed ? '8px' : '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: sideCollapsed ? 0 : 8,
                  justifyContent: sideCollapsed ? 'center' : 'flex-start',
                  borderRadius: '6px',
                })}
                title='關於我們'
              >
                {sideCollapsed ? 'ℹ️' : '關於我們'}
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/products'
                onClick={handleLinkClick}
                style={({ isActive }) => ({
                  color: isActive ? '#3498db' : '#ecf0f1',
                  textDecoration: 'none',
                  padding: sideCollapsed ? '8px' : '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: sideCollapsed ? 0 : 8,
                  justifyContent: sideCollapsed ? 'center' : 'flex-start',
                  borderRadius: '6px',
                })}
                title='產品'
              >
                {sideCollapsed ? '📦' : '產品'}
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/grid-test'
                onClick={handleLinkClick}
                style={({ isActive }) => ({
                  color: isActive ? '#3498db' : '#ecf0f1',
                  textDecoration: 'none',
                  padding: sideCollapsed ? '8px' : '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: sideCollapsed ? 0 : 8,
                  justifyContent: sideCollapsed ? 'center' : 'flex-start',
                  borderRadius: '6px',
                })}
                title='網格測試'
              >
                {sideCollapsed ? '🔲' : '網格測試'}
              </NavLink>
            </li>

            <li>
              <NavLink
                to='/contact'
                onClick={handleLinkClick}
                style={({ isActive }) => ({
                  color: isActive ? '#3498db' : '#ecf0f1',
                  textDecoration: 'none',
                  padding: sideCollapsed ? '8px' : '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: sideCollapsed ? 0 : 8,
                  justifyContent: sideCollapsed ? 'center' : 'flex-start',
                  borderRadius: '6px',
                })}
                title='聯絡我們'
              >
                {sideCollapsed ? '✉️' : '聯絡我們'}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
