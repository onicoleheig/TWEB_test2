import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <AuthContext>
            {({ error, user, signIn }) => {

                if (user) {
                    return <Redirect to="/" />;
                }

                const onSubmit = (e) => {
                    e.preventDefault();
                    signIn({ username, password });
                };

                return (
                    <div>
                        <h1>Login</h1>
                        <form onSubmit={onSubmit}>
                            <input
                                type="text"
                                placeholder="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <br />
                            <input
                                type="password"
                                placeholder="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <br />
                            <button type="submit">LOGIN</button>
                            <p style={{ color: 'red' }}>{error}</p>
                        </form>
                    </div>
                )
            }}
        </AuthContext>
    )
}

export default LoginPage;