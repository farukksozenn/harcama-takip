'use client';
import {useState} from 'react';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Kayıt Başarılı!');
                setEmail('');
                setPassword('');
            }else {
                setMessage(data.error || 'Bir hata oluştu.');   
            }
        }catch (error) {
            setMessage('Sunucuya bağlantı kurulamadı.');
        }
    };
    return (
        <div style={{maxWidth: 400, margin: 'auto', marginTop: '4rem'}}>
            <h1>Kayıt ol</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>E-mail:</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' required />
                </div>
                <div>
                    <label>Şifre:</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type='password'
                        required
                    />
                </div>

                <button type='submit' style={{marginTop: '1rem'}}>
                    Kayıt Ol
                </button>
                {message && <p style={{marginTop: '1rem'}}>{message}</p>}
            </form>
        </div>
    );
}