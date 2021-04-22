import React, { useState, useEffect } from 'react'
import './index.css'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)




  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
    } catch (error) {
      setNotification({
        error: `Wrong username or password`,
        type: 'error'
      })
  
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }

  }

  const handleBlogCreate = async (title, url, author) => {
    try {
      const blog = await blogService.create({ title, url, author }, user)
        setNotification({
          success: `a new blog ${blog.title} by ${blog.author} added`,
          type: 'success'
        })
  
        setTimeout(() => {
          setNotification(null)
        }, 4000)
        setBlogs(blogs.concat(blog))

    } catch (error) {
      setNotification({
        error: `Something went wrong`,
        type: 'error'
      })
  
      setTimeout(() => {
        setNotification(null)
      }, 4000)
    }

  }

  return (
    <div>
          <Notification message={notification?.success || notification?.error} type={notification ? notification.type : 'null'} />

      {user === null && <LoginForm handleLogin={handleLogin} />}
      {
        user !== null && <>
          <h2>blogs</h2>
          {/* <Notification message={notification?.success || notification?.error} type={notification ? notification.type : 'null'} /> */}

          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

          <BlogForm handleBlogCreate={handleBlogCreate} />
          <br/>
          <BlogList user={user} blogs={blogs} />
        </>
      }
    </div>
  )
}

export default App