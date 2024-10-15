import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { postReviews } from '../../functions/post-reviews'

export const postReviewsRoute: FastifyPluginAsyncZod = async app => {
  app.post('/postReviews', async () => {
    await postReviews()
  })
}
