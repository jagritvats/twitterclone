import './Auth.css'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { login } from '../../features/userSlice'
import { TextField } from '@material-ui/core';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Login() {

    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const history = useHistory()
    const doLogin = () => {
        dispatch(login())
        history.push("/")
    }
    return (
        <div className="auth login">

            <div className="auth__container">
                <div className="twittericon">
                    <TwitterIcon />
                </div>
                
                <h1>Log in to Twitter</h1>
                <form className="auth__form" onSubmit={doLogin}>
                    <TextField required label="Email" variant="outlined" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <TextField required label="Password" variant="outlined" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
                    <button type="submit" className="auth__submit">Login</button>
                </form>
                <Link to="/register">Sign up for Twitter</Link>
            </div>
        </div>
    )
}

export default Login
