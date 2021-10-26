import React from 'react';
import { useField } from '../hooks';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/loginReducer';
import { useHistory } from 'react-router-dom';


const LoginForm = ( ) => {

    const username = useField('text');
    const password = useField('password');
    const dispatch = useDispatch();
    const history = useHistory();

    const handleLogin = async(event) => {
        event.preventDefault();
        dispatch(login({ username:username.value, password:password.value }));
        username.reset();
        password.reset();
        history.push('/');
        // username.

    };

    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <div>
                username: <input {...username} />
                </div>
                <div>
                Password: <input {...password} />
                </div>
                <div>
                    <button type='submit' id='loginButton'>Login</button>
                </div>
            </form>
            {/* </div> */}
        </div>
    );
};
LoginForm.propTypes = {

};
export default LoginForm;