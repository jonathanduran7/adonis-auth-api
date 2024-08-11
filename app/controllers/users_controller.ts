import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator, loginValidator } from '#validators/user'
import User from '#models/user.model'

export default class UsersController {
  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    await User.create(payload)
    response.ok({ message: 'User created successfully' })
  }

  async login({ request, response }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)

    const user = await User.query().where('email', payload.email).first()
    if (!user) {
      response.badRequest({ message: 'Password or email wrong' })
      return
    }

    const passwordVerified = await User.verifyPassword(payload.password, user?.password)

    if (!passwordVerified) {
      response.badRequest({ message: 'Password or email wrong' })
      return
    }

    response.ok({ message: 'Logged in successfully' })
  }
}
