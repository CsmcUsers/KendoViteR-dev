import { Outlet, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

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
  navMenu: {
    display: 'flex',
    listStyle: 'none',
    margin: '0',
    padding: '0',
    gap: '30px',
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '40px 20px',
    width: '100%',
    boxSizing: 'border-box',
  },
  footer: {
    backgroundColor: '#34495e',
    color: '#ecf0f1',
    textAlign: 'center',
    padding: '20px',
    marginTop: 'auto',
  },
  footerText: {
    margin: '0',
    fontSize: '0.9rem',
  },
}

// 響應式樣式
const getResponsiveStyles = (windowWidth) => {
  const isMobile = windowWidth <= 768
  const isSmallMobile = windowWidth <= 480

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
        padding: '15px 10px',
      },
    }
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
        padding: '20px 15px',
      },
    }
  }

  return styles
}

function Layout() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [sideOpen, setSideOpen] = useState(window.innerWidth > 768)
  const [sideCollapsed, setSideCollapsed] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      // 同步 side menu 在大螢幕自動顯示、在小螢幕自動隱藏
      if (window.innerWidth > 768) {
        setSideOpen(true)
      } else {
        setSideOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const responsiveStyles = getResponsiveStyles(windowWidth)

  // hover 效果處理
  const handleNavLinkHover = (e, isHover) => {
    if (isHover) {
      e.target.style.color = '#ecf0f1'
      e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
    } else {
      if (!e.target.classList.contains('active')) {
        e.target.style.color = '#bdc3c7'
        e.target.style.backgroundColor = 'transparent'
      }
    }
  }

  // 組合 side menu 在不同寬度下的樣式
  const sideWidth = sideCollapsed ? '64px' : '240px'

  const sideMenuBase = {
    width: sideWidth,
    backgroundColor: '#1f2d3a',
    color: '#ecf0f1',
    padding: '20px 10px',
    boxSizing: 'border-box',
    transition: 'transform 0.25s ease, visibility 0.25s ease',
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

  const contentWrapperStyle = {
    display: 'flex',
    alignItems: 'stretch',
    gap: '20px',
    width: '100%',
    boxSizing: 'border-box',
  }

  // menu toggle button for small screens
  const menuToggleStyle = {
    background: 'transparent',
    border: '1px solid rgba(236,240,241,0.08)',
    color: '#ecf0f1',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1.1rem',
  }

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

  return (
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
            <h2 style={responsiveStyles.navLogo || styles.navLogo}>My App</h2>
          </div>
          <ul style={responsiveStyles.navMenu || styles.navMenu}>
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
          </ul>
        </div>
      </nav>

      <div style={contentWrapperStyle}>
        {/* 左側 SideMenu */}
        <aside style={sideMenuStyle}>
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: sideCollapsed ? 'center' : 'flex-end',
                padding: '6px',
              }}
            >
              {/* collapse button */}
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
                {/** 使用簡單 icon（文字或 emoji）在縮小時顯示 */}
                <li>
                  <NavLink
                    to='/'
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

        <main style={{ ...(responsiveStyles.mainContent || styles.mainContent), flex: 1 }}>
          <Outlet />
        </main>
      </div>
      <footer style={styles.footer}>
        <p style={styles.footerText}>&copy; 2025 My App. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default Layout
