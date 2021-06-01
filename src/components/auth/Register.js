import { TextField } from '@material-ui/core'
import './Auth.css'
import './Register.css'
import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
import TwitterIcon from '@material-ui/icons/Twitter';
import { useDispatch } from 'react-redux';

import blank_profile_image from './blank_profile_img.png'

function Register() {

    let [fname, setFname] = useState('')
    let [lname, setLname] = useState('')
    let [userName, setUserName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [img, setImg] = useState(blank_profile_image)
    let [bday, setbday] = useState('');

    let [usernameError, setUserNameError] = useState(false)
    let [isEligible, setIsEligible] = useState(true);

    const dispatch = useDispatch()
    const history = useHistory()

    const imgInput = (e) => {
        setImg(URL.createObjectURL(e.target.files[0]))
    }

    const doRegister = () => {
        if(!isEligible){
            return
        }
        // dispatch(login())
        history.push("/")
    }
    return (
        <div className="auth register">

            <div className="auth__container">
                <div className="twittericon">
                    <TwitterIcon />
                </div>
                
                <h1>Sign Up for Twitter</h1>
                <form className="auth__form" onSubmit={doRegister}>
                    <div className="register__image">
                        <input
                            color="primary"
                            accept="image/*"
                            type="file"
                            onChange={imgInput}
                            id="icon-button-file"
                            style={{ display: 'none', }}
                        />
                        <label htmlFor="icon-button-file">
                            <img src={img} alt="profile_image" className="register__image"/>
                        </label>
                    </div>

                    <div className="register__name">
                        <TextField label="First Name" variant="outlined" type="text" value={fname} onChange={e=>setFname(e.target.value)} required/>
                        <TextField label="Last Name" variant="outlined" type="text" value={lname} onChange={e=>setLname(e.target.value)}/>
                    </div>
                    <TextField label="Username" variant="outlined" type="text" value={userName} onChange={e=>{
                        const username = e.target.value
                        // validate username uniquness
                        const usernames = ['user','admin']; //fetch from firestore
                        if(usernames.includes(username)){
                            setUserNameError(true)
                        }else{
                            setUserNameError(false)
                        }
                        setUserName(username)
                    }} required/>
                    {usernameError? <p className="register__validate">Enter an unique username</p>:""}
                    {/* SAdd loading circle for loading of username */}
                    <TextField label="Email" variant="outlined" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
                    <TextField label="Password" variant="outlined" type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
                    <TextField
                        label="Birthday"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={bday}
                        required
                        onChange={e=> {
                            setbday(e.target.value)
                            var today = new Date();
                            var birthDate = new Date(e.target.value);
                            var age = today.getFullYear() - birthDate.getFullYear();
                            var m = today.getMonth() - birthDate.getMonth();
                            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                                age--;
                            }
                            if(age<13){
                                setIsEligible(false)
                            }else{
                                setIsEligible(true)
                            }
                            
                        }}
                    />
                    {!isEligible? <p className="register__validate">You should be atleast 13 years old</p>:""}
                    <button type="submit" className="auth__submit" disabled={!isEligible || usernameError}>Register</button>
                </form>
                
                <Link to="/login">Already have an account?</Link>
            </div>
        </div>
    )
}

export default Register
