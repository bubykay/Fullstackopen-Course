import React from 'react';
import Input from './Input';
import PropTypes from 'prop-types';

const LoginForm = ({ password, username, handleLogin, handleUsernameChange, handlePasswordChange }) => {

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <Input
                    name='username'
                    type='text'
                    value={username}
                    onChange = {handleUsernameChange}
                />
                <Input
                    name='password'
                    type='password'
                    value={password}
                    onChange={handlePasswordChange}
                />
                <div>
                    <button type='submit' id='loginButton'>Login</button>
                </div>
            </form>
            {/* </div> */}
        </div>
    );
};
LoginForm.propTypes = {
    password: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired,
    handleUsernameChange:PropTypes.func.isRequired,
    handlePasswordChange:PropTypes.func.isRequired
};
export default LoginForm;