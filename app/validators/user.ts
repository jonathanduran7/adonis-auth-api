import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { passwordRule } from './rules/password.js'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().minLength(4).maxLength(30),
    email: vine.string().email(),
    password: vine.string().use(passwordRule())
  })
)

createUserValidator.messagesProvider = new SimpleMessagesProvider({
  'required': 'The {{ field }} field is required',
  'string': 'The value of {{ field }} field must be a string',
  'email': 'The value is not a valid email address',
  'password.regex': 'The password must contain at least one letter and one number',
  'password.minLength': 'The password must be at least 6 characters long'
})
