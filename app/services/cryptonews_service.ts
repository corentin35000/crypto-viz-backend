import News from '#models/news'
import logger from '@adonisjs/core/services/logger'

/**
 * @type {object} - The object NewsReceived for crypto news.
 * @property {string} title - The title of the news.
 * @property {string} content - The content of the news.
 * @property {string} link - The link to the news.
 * @property {string} image - The image of the news.
 */
export type NewsReceived = {
  title: string
  content: string
  link?: string
  image?: string
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
    /*logger.info(
      `Received news: \n title: ${newsReceived.title} \n content: ${newsReceived.content} \n link: ${newsReceived.link} \n image: ${newsReceived.image}`,
    )*/
    return await this.saveNews(newsReceived)
  }

  /**
   * Fetches all crypto news.
   * @returns {Promise<News[]>} - The array of news objects.
   */
  public static async getAllNews(): Promise<News[]> {
    return await News.all()
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
      logger.info('News already exists')
      return {
        news: null,
        isExist: true,
      }
    } else {
      logger.info('News does not exist')
      const newsSaved: News = await News.create({
        title: news.title,
        content: news.content,
        link: news.link,
        image: news.image,
      })
      return {
        news: newsSaved,
        isExist: false,
      }
    }
  }
}
