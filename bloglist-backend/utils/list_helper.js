const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  let maxLikes = 0
  let favorite = {}

  blogs.forEach(blog => {
    if(blog.likes >= maxLikes) {
      favorite = blog
      maxLikes = blog.likes
    }
  })
  return favorite
}

const mostBlogs = (blogs) => {
  let filtered = []
  return  _.reduce(blogs, (result, blog) => {
    const index  = _.findIndex(filtered, { author: blog.author })

    if(index !== -1){
      filtered[index].blogs++
    } else {
      filtered = _.concat(filtered, { author: blog.author, blogs: 1 })
    }

    return result = _.maxBy(filtered, 'blogs')
  }, {})
}

const mostLikes = (blogs) => {
  const resultedBlog = _.maxBy(blogs, 'likes')
  return resultedBlog
    ? { author: resultedBlog.author, likes: resultedBlog.likes }
    : {}
}

module.exports ={
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}