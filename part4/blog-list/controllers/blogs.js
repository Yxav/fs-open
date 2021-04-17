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
    title,
    author,
    url,
    likes
  })
  blog
    .save()
    .then(result => {
      response.status(200).json(result)
    })
}

const update = async (request, response) => {
  const { id } = request.params
  let { likes } = request.body

  if (!id) return response.status(400).json({ error: 'Missing id' })
  if (!likes) likes = 0


  const blog = {
    likes
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true })
    updatedBlog ? response.status(200).json(updatedBlog.toJSON()) : response.status(400).end()

  } catch (error) {
    return response.status(400).json({ error })
  }

}
const destroy = async (request, response) => {
  const { id } = request.params
  if (!id) return response.status(400).json({ error: 'Missing id' })
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
  update,
  destroy
}