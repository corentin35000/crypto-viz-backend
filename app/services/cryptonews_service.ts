import News from '#models/news'
import logger from '@adonisjs/core/services/logger'

/**
 * @type {object} - The object NewsReceived for crypto news.
 * @property {string} title - The title of the news.
 * @property {string} content - The content of the news.
 * @property {string} link - The link to the news.
 */
export type NewsReceived = {
  title: string
  content: string
  link: string
}

/**
 * @type {object} - The object News for crypto news.
 * @property {News | null} news - The news object containing title, content, and link.
 * @property {boolean} isExist - The boolean value indicating if the news exists.
 */
export type NewsFiltered = {
  news: News | null
  isExist: boolean
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
  public static async callbackBrokerMessageForNews(message: string): Promise<NewsFiltered> {
    const newsReceived: NewsReceived = JSON.parse(message)
    logger.info(
      `Received news: \n title: ${newsReceived.title} \n content: ${newsReceived.content} \n link: ${newsReceived.link}`,
    )
    const newsFiltered: NewsReceived = this.filterNews(newsReceived)
    return await this.saveNews(newsFiltered)
  }

  /**
   * Fetches all crypto news.
   * @returns {Promise<News[]>} - The array of news objects.
   */
  public static async getAllNews(): Promise<News[]> {
    return await News.all()
  }

  /**
   * Filters the news object to only include the title, content, and link.
   * @param {News} news - The news object containing title, content, and link.
   * @returns {News} - The filtered news object.
   */
  private static filterNews(news: NewsReceived): NewsReceived {
    // Implémentez la logique de filtrage ici qui permet de nettoyer les données reçu du broker pour avoir des données plus propre
    return {
      title: news.title,
      content: news.content,
      link: news.link,
    } as NewsReceived
  }

  /**
   * Saves the news object to the database or performs other actions.
   * @param {NewsReceived} news - The news object containing title and content.
   * @returns {Promise<News>} - The saved news object.
   */
  private static async saveNews(news: NewsReceived): Promise<NewsFiltered> {
    const contentExist: News | null = await News.findBy('content', news.content)
    const titleExist: News | null = await News.findBy('title', news.title)

    if (contentExist || titleExist) {
      return {
        news: null,
        isExist: true,
      }
    } else {
      return {
        news: await News.create({
          title: news.title,
          content: news.content,
          link: news.link,
        }),
        isExist: false,
      }
    }
  }
}
