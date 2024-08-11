import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type Options = {
  table: string,
  column: string
}

const rule = async (value: unknown, options: Options, field: FieldContext) => {
  if (typeof value !== 'string') {
    return field.report('password must be a string', 'type', field)
  }

  const row = await db.query().from(options.table).where(options.column, value).first()

  if (row) {
    return field.report('The {{field}} fiet must be unique', 'unique', field)
  }
}

export const uniqueRule = vine.createRule(rule)


