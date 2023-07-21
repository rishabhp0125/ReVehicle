import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

export const Login = (props) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(email)
        console.log(pass)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePass = (e) => {
        setPass(e.target.value)
    }

    return (
        <div className="auth-form-container">
            <h2 className="login-header">Login</h2>
            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={handleChangeEmail} type="email" placeholder="youremail@email.com" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={handleChangePass} type="password" placeholder="*******" id="password" name="password"/>
                <Link className="submit" type="submit" to={email !== '' && pass !== '' ? '/cars' : '/'}>Log In</Link>
            </form>
            <button className="switch" onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
        </div>
    )
}
