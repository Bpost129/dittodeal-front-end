// npm modules
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// css
import styles from './Login.module.css'

const LoginPage = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  const { email, password } = formData

  const isFormInvalid = () => {
    return !(email && password)
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.logInContainer}>
        <h1>Log In</h1>
        <p className={styles.message}>{message}</p>
        <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Email
            <input className={styles.input}
              type="text"
              value={email}
              name="email"
              onChange={handleChange}
            />
          </label>
          <label className={styles.label}>
            Password
            <input className={styles.input}
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
            />
          </label>
          <div className={styles.buttonContainer}>
            <NavLink to={`/`} className={styles.cancel}>Cancel</NavLink>
            <button className={styles.logIn} disabled={isFormInvalid()}>Log In</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
