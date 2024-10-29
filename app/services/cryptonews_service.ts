import logger from '@adonisjs/core/services/logger'

/**
 * @type {object} - The object News for crypto news.
 * @property {string} title - The title of the news.
 * @property {string} content - The content of the news.
 * @property {string} link - The link to the news.
 */
type News = {
  title: string
  content: string
  link: string
}

/**
 * @class CryptoNewsService
 * This class handles incoming news messages and saves the news.
 */
export default class CryptoNewsService {
  /**
   * Handles incoming news messages and saves the news.
   * @param {string} message - The JSON string containing news data.
   * @returns {Promise<void>}
   */
  public static async callbackBrokerMessageForNews(message: string): Promise<void> {
    const news: News = JSON.parse(message)
    logger.info(`Received news: \n title: ${news.title} \n content: ${news.content} \n link: ${news.link}`)
    await this.saveNews(news)
  }

  /**
   * Saves the news object to the database or performs other actions.
   * @param {News} _news - The news object containing title and content.
   * @returns {Promise<void>}
   */
  private static async saveNews(_news: News): Promise<void> {
    // Implémentez la logique de sauvegarde ici
  }
}
