const Blog = require('../models/blog')


const initialBlogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Nicolas Cage',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
  {
    title: 'Lero LEro',
    author: 'Nicolas August',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 550,
  }, 
  {
    title: 'Skynet is real?',
    author: 'Morgan Freeman',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 550,
  },   
]

const BlogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = { initialBlogs, BlogsInDb}