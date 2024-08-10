import type { HttpContext } from '@adonisjs/core/http'
import { createUserValidator } from '#validators/user'

export default class UsersController {
  public async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createUserValidator)
    return {
      'message': 'User created successfully',
    }
  }
}
