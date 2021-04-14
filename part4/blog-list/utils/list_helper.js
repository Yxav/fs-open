const dummy = (blogs) => {
  return 1
}

const totalLikes = (posts) => posts.length === 1 ? posts[0].likes : posts.map(post => post.likes)

module.exports = { dummy, totalLikes}