import { BaseModel, column } from "@adonisjs/lucid/orm";
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
}
