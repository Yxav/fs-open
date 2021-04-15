const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

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
beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(initialBlogs[3])
  await blogObject.save()
})

afterAll(() => {
  mongoose.connection.close()
})



test('Content type is json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/) 
})

test('ID unique identifier is defined', async () => {
  const result = await api.get('/api/blogs')
  expect(result.body[0].id).toBeDefined()
})

