import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number
 // serializeAs : Column name.
  @column({ serializeAs: "first_name" })
  public firstName: String

  @column({ serializeAs: "last_name" })
  public lastName: String

  @column({ serializeAs: "password" })
  public password: String

  @column({ serializeAs: "email_address" })
  public emailAddress: String

  @column({ serializeAs: "status_id" })
  public statusId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime()
  public deletedAt: DateTime

}
