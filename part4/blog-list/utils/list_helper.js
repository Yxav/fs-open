const dummy = (blogs) => {
  return 1
}

const totalLikes = (posts) => posts.length === 1 ? posts[0].likes : posts.map(post => post.likes)

const favoriteBlog = (blogs) =>{
  if (!blogs || blogs.length === 0) return null

  return blogs.reduce((a,b) => a.likes > b.likes ? a : b)

} 

module.exports = { dummy, totalLikes, favoriteBlog}