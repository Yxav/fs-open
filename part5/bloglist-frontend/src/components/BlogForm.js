import React, { useState } from 'react'

const BlogForm = ({ handleBlogCreate }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

  const handleBlog = (event) => {
    event.preventDefault()
    handleBlogCreate(title, url, author)
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <div>
      <form onSubmit={handleBlog} method="post">
        Title<input value={title} onChange={({ target }) => setTitle(target.value)} type="text" name="title" />
        Url<input value={url} onChange={({ target }) => setUrl(target.value)} type="text" name="url" />
        Author<input value={author} onChange={({ target }) => setAuthor(target.value)} type="text" name="author" />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}


export default BlogForm
