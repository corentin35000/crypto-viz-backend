import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'

/**
 * Fonction de mixin pour la gestion de l'authentification.
 */
const AuthFinder: ReturnType<typeof withAuthFinder> = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

/**
 * Modèle représentant les utilisateurs de l'application.
 */
export default class User extends compose(BaseModel, AuthFinder) {
  /**
   * ID de l'utilisateur
   */
  @column({ isPrimary: true })
  public declare id: number

  /**
   * Nom complet de l'utilisateur
   */
  @column()
  public declare fullName: string | null

  /**
   * Adresse e-mail de l'utilisateur
   */
  @column()
  public declare email: string

  /**
   * Mot de passe (non sérialisé)
   */
  @column({ serializeAs: null })
  public declare password: string

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

  /**
   * Tokens d'accès pour l'utilisateur
   */
  public static accessTokens = DbAccessTokensProvider.forModel(User)
}
