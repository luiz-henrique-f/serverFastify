import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getIdReview } from '../../functions/get-id-review'
import z from 'zod'
import { getIdClient } from '../../functions/get-id-client'

// Defina o esquema de validação da query string com Zod
const getIdReviewQuerySchema = z.object({
  name: z.string(),
})

export const getIdClientRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/idClient',
    {
      schema: {
        querystring: getIdReviewQuerySchema, // Validação da query string
      },
    },
    async (request, reply) => {
      const { name } = request.query // Extrai idClient da query string
      const { idClient } = await getIdClient(name)

      return { idClient }
    }
  )
}
