import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

/**
 * Modèle représentant les news crypto.
 */
export default class News extends BaseModel {
  /**
   * ID
   */
  @column({ isPrimary: true })
  public declare id: number

  /**
   * Titre de la news
   */
  @column()
  public declare title: string

  /**
   * Contenu de la news
   */
  @column()
  public declare content: string

  /**
   * Lien de la news
   */
  @column()
  public declare link: string | null

  /**
   * Image de la news
   */
  @column()
  public declare image: string | null

  /**
   * Date de création
   */
  @column.dateTime({ autoCreate: true })
  public declare createdAt: DateTime

  /**
   * Date de mise à jour
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public declare updatedAt: DateTime | null
}
