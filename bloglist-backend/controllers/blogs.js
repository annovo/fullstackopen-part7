const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blogs = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const comments = blog.comments
  response.json(comments)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if(!request.token || !decodedToken.id){
    return response.status(401).json({ error: 'token is missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const result = await blog.save()
  await result.populate('user', { username: 1, name: 1, id: 1 }).execPopulate()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if(!blog){
    return response.status(400).send({ error: 'already deleted or invalid id' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!request.token || !decodedToken.id || decodedToken.id.toString() !== blog.user.toString()){
    return response.status(401).json({ error: 'token is missing or invalid' })
  }
  await blog.delete()
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }
  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  await result.populate('user', { username: 1, name: 1, id: 1 }).execPopulate()
  response.json(result)
})

blogRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById((request.params.id))

  blog.comments = blog.comments.concat(body.comment)

  const newBlog = await blog.save()
  response.json(newBlog)
})

module.exports = blogRouter