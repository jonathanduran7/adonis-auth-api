import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user'
import User from '#models/user.model'

export default class UsersController {
  public async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    await User.create(payload)
    response.ok({ message: 'User created successfully' })
  }
}
