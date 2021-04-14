const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () =>{
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

})

describe('favorite blogs', () => {
  const blogsList = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    },   
    {
      title: "Test string reduction",
      author: "Nicolas Cage",
      likes: 2
    },    
    {
      title: "The Simpsons",
      author: "Homer Simpson",
      likes: 5
    }
  ]

  test('Should return the highest voted blog', () =>{
    const result = listHelper.favoriteBlog(blogsList)
    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })

})


