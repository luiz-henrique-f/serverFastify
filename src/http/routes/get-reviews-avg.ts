import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getIdReview } from '../../functions/get-id-review'
import z from 'zod'
import { getIdClient } from '../../functions/get-id-client'
import { getTotalReviewsClient } from '../../functions/get-total-reviews-client'
import { getReviews30Days } from '../../functions/get-reviews-30-days'
import { getReviewsAvg } from '../../functions/get-reviews-avg'

// Defina o esquema de validação da query string com Zod
const getIdReviewQuerySchema = z.object({
  idClient: z.string(),
})

export const getReviewsAvgRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/totalReviewsAvg',
    {
      schema: {
        querystring: getIdReviewQuerySchema, // Validação da query string
      },
    },
    async (request, reply) => {
      const { idClient } = request.query // Extrai idClient da query string
      const { totalReviews } = await getReviewsAvg(idClient)

      return { totalReviews }
    }
  )
}
