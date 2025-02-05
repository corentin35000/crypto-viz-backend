import type News from '#models/news'
import { CryptoNewsService } from '#services/cryptonews_service'
import type { HttpContext } from '@adonisjs/core/http'

/**
 * @class CryptoNewsController
 */
export default class CryptoNewsController {
  /**
   * Fetches all crypto news.
   * @param {HttpContext} ctx - The HTTP context containing the request and response.
   * @returns {Promise<void>} - The promise object representing the result of the operation.
   */
  public async getAllNews({ response }: HttpContext): Promise<void> {
    const news: News[] = await CryptoNewsService.getAllNews()
    response.status(200).json(news)
  }
}
