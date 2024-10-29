import type { ApplicationService } from '@adonisjs/core/types'
import NatsService from '#services/nats_service'

/**
 * NatsProvider registers and manages the NatsService lifecycle within the AdonisJS application.
 */
export default class NatsProvider {
  /**
   * Create a new instance of NatsProvider
   * @param {ApplicationService} app - The AdonisJS application service provider.
   */
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   * @returns {void}
   */
  public register(): void {
    this.app.container.singleton('#services/nats_service', () => {
      return new NatsService()
    })
  }

  /**
   * The container bindings have booted
   * @returns {Promise<void>}
   */
  public async boot(): Promise<void> {}

  /**
   * The application has been booted
   * @returns {Promise<void>}
   */
  public async start(): Promise<void> {}

  /**
   * The process has been started
   * @returns {Promise<void>}
   */
  public async ready(): Promise<void> {
    const natsService: NatsService = await this.app.container.make('#services/nats_service')
    await natsService.connect()
    
    natsService.subscribe('crypto.news', (message: string) => {
      console.log('Received message:', message)
    })
  }

  /**
   * Preparing to shutdown the app
   * @returns {Promise<void>}
   */
  public async shutdown(): Promise<void> {
    const natsService: NatsService = await this.app.container.make('#services/nats_service')
    await natsService.close()
  }
}
