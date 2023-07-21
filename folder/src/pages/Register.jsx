import React, { useState } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

export const Register = (props) => {
    const [email, setEmail] = useState('')
    const[pass, setPass] = useState('')
    const[name, setName] = useState('')


    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(name)
        console.log(email)
        console.log(pass)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePass = (e) => {
        setPass(e.target.value)
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    return (
        <div className="auth-form-container">
            <h2 className="register-header">Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Full Name</label>
                <input value={name} onChange={handleChangeName} id="name" placeholder="Full Name"/>
                <label htmlFor="email">Email</label>
                <input value={email} onChange={handleChangeEmail} type="email" placeholder="youremail@email.com" id="email" name="email"/>
                <label htmlFor="password">Password</label>
                <input value={pass} onChange={handleChangePass} type="password" placeholder="*******" id="password" name="password"/>
                <Link className="submit-reg" type="submit" to={email !== '' && pass !== '' ? '/cars' : '/'}>Register</Link>
            </form>
            <button className="register-switch" onClick={() => props.onFormSwitch('login')}>Already have an account? Login here.</button>
        </div>
    )
}