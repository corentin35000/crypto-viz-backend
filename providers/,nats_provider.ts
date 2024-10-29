import type { ApplicationService } from '@adonisjs/core/types'
import NatsService from '#services/nats_service'

export default class NatsProvider {
  constructor(protected app: ApplicationService) {}

  /**
   * Register bindings to the container
   */
  register() {
    // Enregistrer NatsService en tant que singleton dans le conteneur IoC
    this.app.container.singleton('#services/nats_service', () => {
      return new NatsService()
    })
  }

  /**
   * The container bindings have booted
   */
  async boot() {}

  /**
   * The application has been booted
   */
  async start() {}

  /**
   * The process has been started
   */
  async ready() {
    // Résoudre NatsService lorsque le serveur HTTP est prêt à accepter des requêtes
    const natsService: NatsService = await this.app.container.make('#services/nats_service')
    await natsService.connect()
  }

  /**
   * Preparing to shutdown the app
   */
  async shutdown() {
    // Résoudre NatsService lorsque AdonisJS est en train de fermer l'application de manière gracieuse
    const natsService: NatsService = await this.app.container.make('#services/nats_service')
    await natsService.close()
  }
}
