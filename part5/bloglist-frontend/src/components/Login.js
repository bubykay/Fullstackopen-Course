import React from 'react';

const Login = ({setUsername, password,errorMessage, setPassword, username, handleLogin}) => {
    return (
        <div>
            {errorMessage !== null? <div>{errorMessage}</div>:null}
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <input 
                    name='username' 
                    type='text'
                    value={username}
                    onChange={({target})=>setUsername(target.value)}
                    />
                </div>
                <div>
                    <input 
                    name='password' 
                    type='password'
                    value={password}
                    onChange={({target})=>setPassword(target.value)}
                    />
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;