import { useState } from 'react'

function Products() {
    const [products] = useState([
        {
            id: 1,
            name: 'React 開發套件',
            description: '專業的 React 開發工具包，包含各種實用組件',
            price: '$299',
            image: '🚀',
        },
        {
            id: 2,
            name: 'Vite 建置工具',
            description: '快速的前端建置工具，支援熱更新',
            price: '$199',
            image: '⚡',
        },
        {
            id: 3,
            name: '響應式設計模板',
            description: '現代化的響應式網頁設計模板',
            price: '$149',
            image: '🎨',
        },
        {
            id: 4,
            name: 'API 整合服務',
            description: '完整的 API 整合解決方案',
            price: '$399',
            image: '🔗',
        },
    ])

    return (
        <div className='products'>
            <h1>我們的產品</h1>
            <p style={{ marginBottom: '2rem', color: '#666' }}>
                探索我們精心設計的產品，為您的專案提供完美的解決方案。
            </p>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem',
                    marginTop: '2rem',
                }}
            >
                {products.map(product => (
                    <div
                        key={product.id}
                        style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: '12px',
                            padding: '1.5rem',
                            backgroundColor: '#fff',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            e.currentTarget.style.transform = 'translateY(-5px)'
                            e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.15)'
                        }}
                        onMouseLeave={e => {
                            e.currentTarget.style.transform = 'translateY(0)'
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <div
                            style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '1rem' }}
                        >
                            {product.image}
                        </div>
                        <h3 style={{ marginBottom: '0.5rem', color: '#2c3e50' }}>{product.name}</h3>
                        <p style={{ color: '#666', marginBottom: '1rem', lineHeight: '1.5' }}>
                            {product.description}
                        </p>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <span
                                style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 'bold',
                                    color: '#3498db',
                                }}
                            >
                                {product.price}
                            </span>
                            <button
                                style={{
                                    backgroundColor: '#3498db',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '0.9rem',
                                    transition: 'background-color 0.3s ease',
                                }}
                                onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
                                onMouseLeave={e => (e.target.style.backgroundColor = '#3498db')}
                            >
                                了解更多
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Products
