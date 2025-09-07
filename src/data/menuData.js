export const menuData = [
    {
        text: '首頁',
        icon: '🏠',
        url: '/',
    },
    {
        text: '關於我們',
        icon: 'ℹ️',
        url: '/about',
    },
    {
        text: '產品',
        icon: '📦',
        children: [
            { text: '產品列表', icon: '📋', url: '/products' },
            { text: '產品分類', icon: '🏷️', url: '/products/categories' },
            { text: '新品上市', icon: '✨', children: [{ text: 'new1', icon: '✨', url: '/new/new1' }] },
        ],
    },
    {
        text: '網格測試',
        icon: '🔲',
        url: '/grid-test',
    },
    {
        text: 'Test',
        icon: '✉️',
        children: [
            { text: 'Test07', icon: '📋', url: '/test/test07' },
            { text: 'Test08', icon: '📋', url: '/test/test08' },
        ],
    },
    {
        text: '聯絡我們',
        icon: '✉️',
        url: '/contact',
    },
];
