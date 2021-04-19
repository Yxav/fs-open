const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog))
  const promiseArray = blogObjects.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

afterAll(() => {
  mongoose.connection.close()
})


describe('When there is initially some blogs in BD', () => {

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

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titlesBlog = response.body.map((res) => res.title)

    expect(titlesBlog).toContain('Skynet is real?')
  })
})

describe('When show a specific blog', () => {
  test('a specific blog can be viewed using valid id', async () => {
    const blogsAtStart = await helper.BlogsInDb()

    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('fails with statuscode 404 if blog does not exist', async () => {
    const idValid = mongoose.Types.ObjectId()

    await api.get(`/api/blogs/${idValid}`).expect(404)
  })

  test('fails with statuscode 400 id is invalid', async () => {
    const invalidId = '5e8cae887f883f27e06f54a66'

    await api.get(`/api/blogs/${invalidId}`).expect(400)
  })
})



describe('When create a blog post', () => {

  let token = null

  beforeAll(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'Joe', passwordHash })
    await user.save()

    await api
      .post('/api/login')
      .send({ username: 'Joe', password: 'password' })
      .then(res => token = res.body.token)
    return token
  })

  test('A valid post blog can be added', async () => {
    const postBlog = {
      title: 'IA is dummy?',
      author: 'Morgan Freeman',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 550,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer "${token}"`)
      .send(postBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.BlogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const postContent = blogsAtEnd.map(post => post.title)

    expect(postContent).toContain('IA is dummy?')

  })

  test('When no likes property ', async () => {
    const postBlog = {
      title: 'IA is dummy?',
      author: 'Morgan Freeman',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    }
    await api
      .post('/api/blogs')
      .send(postBlog)
      .set('Authorization', `Bearer "${token}"`)
      .send(postBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.BlogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  })

  test('When no title and url properties ', async () => {
    const postBlog = {
      author: 'Morgan Freeman',
      likes: 15
    }
    await api
      .post('/api/blogs')
      .send(postBlog)
      .set('Authorization', `Bearer "${token}"`)
      .send(postBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.BlogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
  test('When invalid user try add a blog ', async () => {
    const postBlog = {
      author: 'Morgan Freeman',
      likes: 15
    }

    token = null
    await api
      .post('/api/blogs')
      .send(postBlog)
      .set('Authorization', `Bearer "${token}"`)
      .send(postBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.BlogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })


})

describe('When delete a blog post', () => {

  let token = null

  beforeEach(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'Joe', passwordHash })
    await user.save()

    await api
      .post('/api/login')
      .send({ username: 'Joe', password: 'password' })
      .then(res => token = res.body.token)

    const postBlog = {
      title: 'IA is dummy?',
      author: 'Morgan Freeman',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 550,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer "${token}"`)
      .send(postBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    return token
  })

  test('A blog post can be deleted ', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const blogDelete = blogsAtStart[0].id.toString()

    await api
      .delete(`/api/blogs/${blogDelete}`)
      .set('Authorization', `Bearer "${token}"`)
      .expect(204)

    const blogsAtEnd = await Blog.find({}).populate('user')

    expect(blogsAtStart).toHaveLength(1)
    expect(blogsAtEnd).toHaveLength(0)
    expect(blogsAtEnd).toEqual([])
  })

  test('Should return an error if missing id ', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')

    await api
      .delete(`/api/blogs/`)
      .set('Authorization', `Bearer "${token}"`)
      .expect(404)

    const blogsAtEnd = await Blog.find({}).populate('user')

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
  test('Should return an error if blog no exists', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')

    await api
      .delete(`/api/blogs/607d8c5c70a09c89225b3387`)
      .set('Authorization', `Bearer "${token}"`)
      .expect(404)

    const blogsAtEnd = await helper.BlogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })  
  
  test('Should return an error if invalid user try delete blog', async () => {
    const blogsAtStart = await Blog.find({}).populate('user')
    const blogDelete = blogsAtStart[0]

    token = null

    await api
      .delete(`/api/blogs/${blogDelete.id}`)
      .set('Authorization', `Bearer "${token}"`)
      .expect(401)

    const blogsAtEnd = await Blog.find({}).populate('user')

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })


})

describe('When update a blog post', () => {

  test('A blog post can be updated ', async () => {
    const blogsAtStart = await helper.BlogsInDb()

    const postBlog = {
      likes: 100,
    }

    console.log(blogsAtStart)

    await api
      .put(`/api/blogs/${blogsAtStart[0].id}`)
      .send(postBlog)
      .expect(200)

    const blogsAtEnd = await helper.BlogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const postContent = blogsAtEnd.map(post => post.likes)

    expect(postContent).toContain(100)

  })

    test('Should return an error if blog no exists', async () => {
    await api
      .put(`/api/blogs/607d8c5c70a09c89225b3387`)
      .expect(404)

    const blogsAtEnd = await helper.BlogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})


