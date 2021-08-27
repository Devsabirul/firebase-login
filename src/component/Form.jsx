import React, { useState } from 'react'
import './form.css'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseConfig from '../config';


initializeApp(firebaseConfig);

const Form = () => {
    const [loginInfo, setLoginInfo] = useState(false)
    const [checked, setChecked] = useState(false)
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        error: '',
        success: false,
        alert: ''
    })
    const provider = new GoogleAuthProvider();
    const { email, password } = user;
    const formHandelSubmit = e => {
        if (email && password) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = ""
                    newUserInfo.success = true;
                    setUser(newUserInfo)
                })
                .catch((error) => {
                    const isEmailError = true;
                    if (isEmailError) {
                        const errorMessage = "The Email Address is already registered";
                        const newUserInfo = { ...user }
                        newUserInfo.error = errorMessage
                        newUserInfo.success = false
                        setUser(newUserInfo)
                    }
                });
        }
        e.preventDefault();
    }
    const googleHandle = () => {
        const auth = getAuth();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result)
            })
    }
    const handelBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'username') {
            isFieldValid = /[a-z]/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            isFieldValid = /^(?=.*\d)(?=.*[a-zA-Z]).{6,20}$/.test(e.target.value);
        }
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (isFieldValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            newUserInfo.alert = ""
            setUser(newUserInfo)
        } else {
            const newUserAlert = { ...user }
            newUserAlert.alert = "Please enter a valid Information"
            setUser(newUserAlert)
        }
    }
    return (
        <>
            {
                loginInfo ? <h1 className="text-center pb-4 ">Login </h1> : <h1 className="text-center pb-4 ">Registration Form</h1>
            }
            <form onSubmit={formHandelSubmit}>
                {
                    !loginInfo && <div className="form-group">
                        <label htmlFor="fullname">User Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullname"
                            onBlur={handelBlur}
                            name="username"
                            required
                        />
                    </div>
                }
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        required
                        type="email"
                        className="form-control"
                        id="email"
                        onBlur={handelBlur}
                        name="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        required
                        type="password"
                        className="form-control"
                        id="password"
                        onBlur={handelBlur}
                        name="password"
                    />
                </div>
                {
                    !loginInfo && <div className="form-check form-check-inline pb-4">
                        <input
                            className="form-check-input checkbox"
                            type="checkbox"
                            id="terms"
                            value="agree"
                            name="checkbox"
                            onChange={() => {
                                setChecked(!checked)
                            }}
                        />
                        <label
                            className="form-check-label checkbox"
                            htmlFor="terms">
                            I agree all terms and conditions
                        </label>
                    </div>
                }
                <div className="form-check form-check-inline pb-4">
                    <input
                        className="form-check-input checkbox"
                        type="checkbox"
                        id="login"
                        value="login"
                        name="checkbox"
                        onChange={() => { setLoginInfo(!loginInfo) }}
                    />
                    <label
                        className="form-check-label checkbox"
                        htmlFor="login">
                        Login
                    </label>
                </div>
                <div className="form-group ">
                    {
                        //Login Handle Use
                        loginInfo ? <input
                            type="submit"
                            value="Login"
                            className="form-control btn btn-primary"
                        /> :
                            //Submit Handle Use
                            checked ? <input
                                type="submit"
                                value="Submit"
                                className="form-control btn btn-primary"
                            /> : <input
                                type="submit"
                                value="Submit"
                                className="form-control btn btn-primary"
                                disabled
                            />
                    }
                </div>
            </form>
            {
                !loginInfo && <button className="btn btn-primary " onClick={googleHandle}>sign in with google</button>
            }
            <p className="pt-3 error">{user.error}</p>
            <p className="pt-3 error">{user.alert}</p>
            {
                user.success && <p className="pt-3 success">Registration successful</p>
            }
        </>
    )
}

export default Form;
