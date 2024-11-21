import logger from '@adonisjs/core/services/logger'

/**
 * @type {object} - The object News for crypto news.
 * @property {string} title - The title of the news.
 * @property {string} content - The content of the news.
 * @property {string} link - The link to the news.
 */
export type News = {
  title: string
  content: string
  link: string
}

/**
 * @class CryptoNewsService
 * This class handles incoming news messages and saves the news.
 */
export class CryptoNewsService {
  /**
   * Handles incoming news messages and saves the news.
   * @param {string} message - The JSON string containing news data.
   * @returns {Promise<void>}
   */
  public static async callbackBrokerMessageForNews(message: string): Promise<News> {
    const news: News = JSON.parse(message)
    logger.info(`Received news: \n title: ${news.title} \n content: ${news.content} \n link: ${news.link}`)
    const filteredNews: News = this.filterNews(news)
    await this.saveNews(filteredNews)
    return filteredNews
  }

  /**
   * Filters the news object to only include the title, content, and link.
   * @param {News} news - The news object containing title, content, and link.
   * @returns {News} - The filtered news object.
   */
  private static filterNews(news: News): News {
    // Implémentez la logique de filtrage ici qui permet de nettoyer les données reçu du broker
    // pour avoir des données plus propre
    return {
      title: news.title,
      content: news.content,
      link: news.link,
    } as News
  }

  /**
   * Saves the news object to the database or performs other actions.
   * @param {News} _news - The news object containing title and content.
   * @returns {Promise<void>}
   */
  private static async saveNews(_news: News): Promise<void> {
    // Implémentez la logique de sauvegarde ici qui permet lorsqu'ont arrive sur le site de fetch tout les news crypto 
  }
}
