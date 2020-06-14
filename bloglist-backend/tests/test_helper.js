const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

const blogWithoutLikes = {
  title: 'Every Harmful Charm',
  author: 'Lucky Charms',
  url: 'http:/instagram.com'
}

const blogWithoutTitle = {
  author: 'Boom Boom',
  url: 'http://someurl.com'
}

const blogWithoutUrl = {
  title: 'Hey new blog',
  author: 'Boom Boom'
}

const newBlog =
{
  title: 'Every Harmful Charm',
  author: 'Lucky Charms',
  url: 'http:/instagram.com',
  likes: 5,
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const createUser = async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('somepassword', 10)
  const user = new User({ username: 'testuser', passwordHash })
  await user.save()

}

const loginUser = async (testApi) => {
  const result = await testApi.post('/api/login').send({ username: 'testuser', password: 'somepassword' })
  return 'bearer ' + result.body.token
}
module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  createUser,
  loginUser,
  newBlog,
  blogWithoutLikes,
  blogWithoutTitle,
  blogWithoutUrl
}