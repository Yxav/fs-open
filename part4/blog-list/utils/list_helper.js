const _ = require('lodash')


const dummy = (blogs) => {
  return 1
}

const totalLikes = (posts) => posts.length === 1 ? posts[0].likes : posts.map(post => post.likes)

const favoriteBlog = (blogs) => {
  if (!blogs || blogs.length === 0) return null

  return blogs.reduce((a, b) => a.likes > b.likes ? a : b)

}

const mostBlogs = (blogList) => {
  const mostBlog = _
    .chain(_.map(blogList, 'author'))
    .countBy()
    .toPairs()
    .maxBy(_.last)
    .value()

  return {
    author: mostBlog[0],
    blogs: mostBlog[1]
  }
}

const mostLikes = (blogList) => {
  if (blogList.length === 0) return null

  const groupBlogs = _.groupBy(blogList, 'author')
  const authorsKeyArray = Object.keys(groupBlogs)
    .map(author => {
      return {author, likes: totalLikes(groupBlogs[author])}
    })
    .sort((a,b) => b.likes - a.likes)

  return {
    author: authorsKeyArray[0].author,
    likes: authorsKeyArray[0].likes
  }

}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }