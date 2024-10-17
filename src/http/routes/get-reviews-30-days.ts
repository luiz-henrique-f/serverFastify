import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getIdReview } from '../../functions/get-id-review'
import z from 'zod'
import { getIdClient } from '../../functions/get-id-client'
import { getTotalReviewsClient } from '../../functions/get-total-reviews-client'
import { getReviews30Days } from '../../functions/get-reviews-30-days'

// Defina o esquema de validação da query string com Zod
const getIdReviewQuerySchema = z.object({
  idClient: z.string(),
})

export const getTotalReviews30DaysRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/totalReviews30Days',
    {
      schema: {
        querystring: getIdReviewQuerySchema, // Validação da query string
      },
    },
    async (request, reply) => {
      const { idClient } = request.query // Extrai idClient da query string
      const { totalReviews } = await getReviews30Days(idClient)

      return { totalReviews }
    }
  )
}
