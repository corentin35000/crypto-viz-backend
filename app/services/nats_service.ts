import {
    connect,
    NatsConnection,
    StringCodec,
    Subscription,
    ErrorCode,
    NatsError,
    Codec,
    nkeyAuthenticator,
  } from 'nats'
  import env from '#start/env'
  import logger from '@adonisjs/core/services/logger'
  
  export default class NatsService {
    private nc: NatsConnection | null = null
    private sc: Codec<string> = StringCodec()
    private subscriptions: Map<string, Subscription> = new Map()
  
    public async connect(): Promise<void> {
      try {
        const serversOptions: string[] = [env.get('NATS_SERVER_URL')]
        const seed: Uint8Array = new TextEncoder().encode(env.get('NATS_NKEY_PRIVATE_KEY'))
  
        this.nc = await connect({
          servers: serversOptions,
          authenticator: nkeyAuthenticator(seed),
        })
  
        logger.info(`Connected to Server NATS : ${this.nc.getServer()}`)
      } catch (error) {
        if (error instanceof NatsError) {
          logger.error(`Failed to connect to NATS server: [${error.code}] ${error.message}`)
        } else {
          logger.error('Failed to connect to NATS server:', error)
        }
        throw error
      }
    }
  
    public async publish(subject: string, message: string): Promise<void> {
      if (!this.nc) {
        throw new NatsError('Not connected to NATS server.', ErrorCode.ApiError)
      }
  
      try {
        this.nc.publish(subject, this.sc.encode(message))
        logger.info(`Published message to subject: ${subject}`)
      } catch (error) {
        if (error instanceof NatsError) {
          logger.error(`Failed to publish message: [${error.code}] ${error.message}`)
        } else {
          logger.error('Failed to publish message:', error)
        }
        throw error
      }
    }
  
    public async subscribe(subject: string, callback: (message: string) => void): Promise<void> {
      if (!this.nc) {
        throw new NatsError('Not connected to NATS server.', ErrorCode.ApiError)
      }
  
      try {
        const subscription: Subscription = this.nc.subscribe(subject)
        this.subscriptions.set(subject, subscription)
        logger.info(`Subscribed to ${subject}`)
  
        for await (const msg of subscription) {
          callback(this.sc.decode(msg.data))
        }
      } catch (error) {
        if (error instanceof NatsError) {
          logger.error(`Failed to subscribe : [${error.code}] ${error.message}`)
        } else {
          logger.error('Failed to subscribe :', error)
        }
        throw error
      }
    }
  
    public unsubscribe(subject: string): void {
      const subscription: Subscription | undefined = this.subscriptions.get(subject)
  
      if (subscription) {
        subscription.unsubscribe()
        this.subscriptions.delete(subject)
        logger.info(`Unsubscribed from ${subject}`)
      }
    }
  
    public async unsubscribeAll(): Promise<void> {
      if (this.subscriptions) {
        for (const [subject, subscription] of this.subscriptions) {
          if (subscription) {
            subscription.unsubscribe()
            logger.info(`Unsubscribed from ${subject}`)
          }
        }
        this.subscriptions.clear()
      }
    }
  
    public async close(): Promise<void> {
      if (!this.nc) {
        logger.info('Connection already closed or was never opened.')
        return
      }
  
      try {
        await this.unsubscribeAll()
        await this.nc.drain()
        logger.info('Connection drained and closed.')
      } catch (error) {
        if (error instanceof NatsError) {
          logger.error(`Failed to close connection: [${error.code}] ${error.message}`)
        } else {
          logger.error('Failed to close connection:', error)
        }
        throw error
      } finally {
        this.nc = null
      }
    }
  }