'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')
Route.resource('posts', 'PostController')
  .apiOnly()
  .middleware('auth')
Route.post('/login', 'SessionController.login')
