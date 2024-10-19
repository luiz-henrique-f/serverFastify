import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getIdReview } from '../../functions/get-id-review'
import z from 'zod'
import { getIdClient } from '../../functions/get-id-client'
import { getTotalReviewsClient } from '../../functions/get-total-reviews-client'
import { getReviewsToday } from '../../functions/get-reviews-today'
import { getDataDashboard } from '../../functions/get-data-dashboard'

// Defina o esquema de validação da query string com Zod
const getIdReviewQuerySchema = z.object({
  idClient: z.string(),
})

export const getDataDashboardRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/dataDashboard',
    {
      schema: {
        querystring: getIdReviewQuerySchema, // Validação da query string
      },
    },
    async (request, reply) => {
      const { idClient } = request.query // Extrai idClient da query string
      const { reviewsToday, totalReviews, reviewsLast30Days, reviewsAvg } =
        await getDataDashboard(idClient)

      return { reviewsToday, totalReviews, reviewsLast30Days, reviewsAvg }
    }
  )
}
