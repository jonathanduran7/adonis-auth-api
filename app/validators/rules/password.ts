import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

const rule = (value: unknown, options: undefined, field: FieldContext) => {
  if (typeof value !== 'string') {
    return field.report('password must be a string', 'type', field)
  }

  if (value.length < 6) {
    return field.report('password must be at least 6 characters long', 'minLength', field)
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)) {
    return field.report('password must contain at least one letter and one number', 'regex', field)
  }
}

export const passwordRule = vine.createRule(rule)


