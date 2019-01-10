import React from 'react';
import { AuthContext } from '../AuthProvider';

const HomePage = () => (
    <AuthContext>
        {({ signOut }) => (
            <div>
                <h1>Welcome !!!!</h1>
                <button onClick={signOut}>LOGOUT</button>
            </div>
        )}
    </AuthContext>
);

export default HomePage;