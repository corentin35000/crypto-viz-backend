/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

// Import the controller
const CryptoNewsController = () => import('#controllers/cryptonews_controller')

/**
 * A simple route that returns a JSON response.
 */
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

/**
 * Route to fetch all crypto news.
 */
router.get('/news', [CryptoNewsController, 'getAllNews'])
