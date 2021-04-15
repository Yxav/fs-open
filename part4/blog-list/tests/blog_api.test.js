const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[3])
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

test('A valid post blog can be added', async ()=> {
  const postBlog =   {
    title: 'IA is dummy?',
    author: 'Morgan Freeman',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 550,
  }
  await api
          .post('/api/blogs')
          .send(postBlog)
          .expect(200)
          .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.BlogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const postContent = blogsAtEnd.map(post => post.title)

  expect(postContent).toContain('IA is dummy?')

})