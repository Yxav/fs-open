const Blog = require('../models/blog.js')

const index = (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
}

const store = (request, response) => {
  const { author, title, url } = request.body
  let { likes } = request.body

  if (!likes) likes = 0
  if (!title || !url) return response.status(400).json({ error: 'invalid info' })

  const blog = new Blog({
    author,
    title,
    url,
    likes
  })
  blog
    .save()
    .then(result => {
      response.status(200).json(result)
    })
}

const destroy = async (request, response) => {
  const { id } = request.params
  try {
    await Blog.findByIdAndDelete({ _id: id })
    return response.status(204).end()
  } catch (error) {
    return response.status(400).json({ error })
  }
}

module.exports = {
  index,
  store,
  destroy
}