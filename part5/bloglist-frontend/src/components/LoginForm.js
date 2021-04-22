import React, { useState } from 'react'


const LoginForm = ({handleLogin}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  
  const handleLoginForm = event => {
    event.preventDefault()
    handleLogin(username, password)
    setUsername('')
    setPassword('')
    
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLoginForm} method="post">
        <p>Username<input value={username} onChange={({ target }) => setUsername(target.value)} type="text" name="username" /></p>
        <p>Password<input value={password} onChange={({ target }) => setPassword(target.value)} type="password" name="password" /></p>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginForm