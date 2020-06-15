const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await helper.createUser()

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is some initially saved blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

})

describe('addition of a new blog', () => {
  test('blog added to list with valid token', async () => {
    const token = await helper.loginUser(api)

    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .set({ Authorization: token })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const totalBlogs = await helper.blogsInDb()
    expect(totalBlogs).toHaveLength(helper.initialBlogs.length + 1)

    const authors = totalBlogs.map(b => b.author)
    expect(authors).toContain(helper.newBlog.author)
  })

  test('blog without likes will have 0 likes', async () => {
    const token = await helper.loginUser(api)

    const posted = await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(helper.blogWithoutLikes)

    expect(posted.status).toBe(201)
    expect(posted.body.likes).toBe(0)
  })

  test('blog without title or url is not posted', async () => {
    const token = await helper.loginUser(api)
    await api
      .post('/api/blogs')
      .set({ Authorization: token })
      .send(helper.blogWithoutTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(helper.blogWithoutUrl)
      .set({ Authorization: token })
      .expect(400)
  })

  test('blog without token will respond with status 401', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(401)
  })
})

describe('deleting a blog', () => {
  test('blog deleted with status code 204 if id is valid and 400 if already deleted', async () => {
    const token = await helper.loginUser(api)
    const result = await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .set({ Authorization: token })
    const toDelete = result.body
    const allBlogs = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .set({ Authorization: token })
      .expect(204)

    const blogsWithoutOne = await helper.blogsInDb()
    expect(blogsWithoutOne).toHaveLength(allBlogs.length - 1)

    const titles = blogsWithoutOne.map(b => b.title)

    expect(titles).not.toContain(toDelete.title)

    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .set({ Authorization: token })
      .expect(400)
  })
  test('blog without token wont be deleted', async () => {
    const allBlogs = await helper.blogsInDb()
    const toDelete = allBlogs[0]

    await api
      .delete(`/api/blogs/${toDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(allBlogs.length)
  })
})

describe('updating a blog', () => {
  test('likes set to new value and the length of blogs the same', async () => {
    const blogs = await helper.blogsInDb()
    const newBlog = blogs[0]
    newBlog.likes = 24

    await api
      .put(`/api/blogs/${newBlog.id}`)
      .send(newBlog)
      .expect(200)

    const updatedBlogs = await helper.blogsInDb()
    expect(updatedBlogs).toHaveLength(blogs.length)
    expect(updatedBlogs[0].likes).toBe(24)
  })
})

describe('commenting on blog', () => {
  test('adding a new comment update comments of current blog', async () => {
    const blogs = await helper.blogsInDb()
    const comment = 'new comment'
    const secondComment = 'another comment'
    const blogId = blogs[0].id

    await api
      .post(`/api/blogs/${blogId}/comments`)
      .send({ comment })

    await api
      .post(`/api/blogs/${blogId}/comments`)
      .send({ comment: secondComment })
      .expect(200)

    const updatedBlogs = await helper.blogsInDb()
    expect(updatedBlogs).toHaveLength(blogs.length)
    expect(updatedBlogs[0].comments.length).toBe(2)
    expect(updatedBlogs[0].comments).toContain(comment)
  })

  test.only('you can get all comments of the blog', async () => {
    const blogs = await helper.blogsInDb()
    const commentOne = 'new comment'
    const commentTwo = 'another comment'
    const blogId = blogs[0].id

    await api
      .post(`/api/blogs/${blogId}/comments`)
      .send({ comment: commentOne })

    await api
      .post(`/api/blogs/${blogId}/comments`)
      .send({ comment: commentTwo })

    const comments = await api
      .get(`/api/blogs/${blogId}/comments`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(comments.body).toHaveLength(2)
    expect(comments.body).toContain(commentTwo)
  })
})

test('unique identifier is named id', async () => {
  const blogs = await helper.blogsInDb()
  expect(blogs[0].id).toBeDefined()
})


afterAll(() => {
  mongoose.connection.close()
})
