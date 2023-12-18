'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Post = use('App/Models/Post')
/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    const user = auth.user
    if (user.role == "admin")
      return Post.all()
    return Post.query().where("user_id", user.id).fetch()
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  // async create ({ request }) {
  //     const data = request.only(["user_id", "title", "content"])

  //     const post = await Post.create(data)

  //     return post
  //   }

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'content'
    ])

    const post = await Post.create({ ...data, user_id: id })

    return post
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {

    const post = await Post.findOrFail(params.id)
    if (user.role != "admin" && user.id != post.user_id)
      return response.status(401).send({ error: 'Not authorized' })
    return post
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    const user = auth.user
    const post = await Post.findOrFail(params.id)
    if (user.role != "admin" && user.id != post.user_id)
      return response.status(401).send({ error: 'Not authorized' })

    const data = request.only([
      'title',
      'content'
    ])

    post.merge(data)

    await post.save()

    return post
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    const post = await Post.findOrFail(params.id)

    if (post.user_id !== auth.user.id && user.role != "admin") {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await post.delete()
  }
}

module.exports = PostController
