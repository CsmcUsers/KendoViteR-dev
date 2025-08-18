import { useState } from 'react'

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        alert(`感謝您的聯絡，${formData.name}！我們會盡快回覆您。`)
        setFormData({ name: '', email: '', message: '' })
    }

    return (
        <div className='contact'>
            <h1>聯絡我們</h1>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                    gap: '3rem',
                    marginTop: '2rem',
                }}
            >
                <div>
                    <h2>取得聯絡</h2>
                    <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
                        我們很樂意聽到您的聲音！無論您有任何問題、建議或合作提案，
                        請隨時與我們聯絡。
                    </p>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>📧 電子郵件</h3>
                        <p>contact@myapp.com</p>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>📞 電話</h3>
                        <p>+886 2 1234 5678</p>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>📍 地址</h3>
                        <p>台北市信義區信義路五段7號</p>
                    </div>

                    <div>
                        <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>🕐 營業時間</h3>
                        <p>週一至週五：09:00 - 18:00</p>
                    </div>
                </div>

                <div>
                    <h2>發送訊息</h2>
                    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#2c3e50',
                                }}
                            >
                                姓名 *
                            </label>
                            <input
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #e0e0e0',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.3s ease',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={e => (e.target.style.borderColor = '#3498db')}
                                onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
                            />
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#2c3e50',
                                }}
                            >
                                電子郵件 *
                            </label>
                            <input
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #e0e0e0',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    transition: 'border-color 0.3s ease',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={e => (e.target.style.borderColor = '#3498db')}
                                onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
                            />
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label
                                style={{
                                    display: 'block',
                                    marginBottom: '0.5rem',
                                    fontWeight: '500',
                                    color: '#2c3e50',
                                }}
                            >
                                訊息 *
                            </label>
                            <textarea
                                name='message'
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '2px solid #e0e0e0',
                                    borderRadius: '6px',
                                    fontSize: '1rem',
                                    resize: 'vertical',
                                    transition: 'border-color 0.3s ease',
                                    boxSizing: 'border-box',
                                }}
                                onFocus={e => (e.target.style.borderColor = '#3498db')}
                                onBlur={e => (e.target.style.borderColor = '#e0e0e0')}
                            />
                        </div>

                        <button
                            type='submit'
                            style={{
                                backgroundColor: '#3498db',
                                color: 'white',
                                border: 'none',
                                padding: '0.75rem 2rem',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                width: '100%',
                            }}
                            onMouseEnter={e => (e.target.style.backgroundColor = '#2980b9')}
                            onMouseLeave={e => (e.target.style.backgroundColor = '#3498db')}
                        >
                            發送訊息
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact
