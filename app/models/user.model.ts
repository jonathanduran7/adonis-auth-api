import { afterFetch, afterFind, BaseModel, beforeFetch, beforeFind, beforeSave, column } from "@adonisjs/lucid/orm";
import hash from '@adonisjs/core/services/hash'
import { DateTime } from "luxon";

export default class User extends BaseModel {
  static table = "users";

  @column({ isPrimary: true })
  declare id: number;

  @column()
  declare username: string;

  @column()
  declare email: string;

  @column({ serializeAs: null })
  declare password: string;

  @column.dateTime({ autoCreate: true })
  declare created_at: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updated_at: DateTime;

  @column.dateTime()
  declare deleted_at: DateTime;

  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await hash.make(user.password)
    }
  }

  static async verifyPassword(plainPassword: string, hashedPassword: string) {
    return hash.verify(hashedPassword, plainPassword)
  }
}
