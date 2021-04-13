const Blog = require('../models/blog.js')

const index = (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
}

const store = (request, response) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
}

module.exports = {
  index,
  store
}