const Blog = require('../models/blog')
const User = require('../models/user')
const blogRouter = require('express').Router()
const middleware = require('../utils/middlewares')



blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const { id } = request.params
  if (!id) return response.status(400).end()

  try {
    const blog = await Blog.findById({ _id: id })
    if (!blog) return response.status(404).end()
    return response.status(200).json(blog)

  } catch (error) {
    return response.status(400).end()
  }
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { author, title, url, userId } = request.body
  let { likes } = request.body


  if (!likes) likes = 0
  if (!title || !url) return response.status(400).json({ error: 'invalid info' })


  const user = request.user

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id
  })
  const blogSaved = await blog.save()
  user.blogs = user.blogs.concat(blogSaved._id)
  await user.save()

  return response.status(201).json(blogSaved)
})

blogRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  let { likes } = request.body

  if (!likes) likes = 0


  const blog = {
    likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate({ _id: id }, blog, { new: true })
    if (updatedBlog) return response.status(200).json(updatedBlog.toJSON())
    return response.status(404).end()

  } catch (error) {
    return response.status(400).json({ error })
  }

})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const { id } = request.params
  if (!id) return response.status(400).json({ error: 'Missing id' })
  const blog = await Blog.findById(id)
  if (!blog) return response.status(404).end()
  try {
    if (blog.user.toString() === request.user.id) {
      await blog.delete()
      return response.status(204).end()
    }

  } catch (error) {
    return response.status(400).end()
  }
})

module.exports = blogRouter