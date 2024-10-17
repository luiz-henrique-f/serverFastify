import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from '../env'
import fastifyCors from '@fastify/cors'
import { getIdReviewRoute } from './routes/get-id-review'
import { getIdClientRoute } from './routes/get-id-client'
import { postReviews } from '../functions/post-reviews'
import { postReviewsTable } from '../functions/post-reviews-table'
import { getTotalReviewsClientRoute } from './routes/get-total-reviews-client'
import { getTotalReviews30DaysRoute } from './routes/get-reviews-30-days'
import { getReviewsToday } from '../functions/get-reviews-today'
import { getReviewsTodayRoute } from './routes/get-reviews-today'
import { getReviewsMonthRoute } from './routes/get-reviews-month'
import { getClientsRoute } from './routes/get-client'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getIdReviewRoute)
app.register(getIdClientRoute)
app.register(getTotalReviewsClientRoute)
app.register(getTotalReviews30DaysRoute)
app.register(getReviewsTodayRoute)
app.register(getReviewsMonthRoute)
app.register(getClientsRoute)

const schedulePostReviews = async () => {
  try {
    await postReviews()
    console.log('Executando inserção de avaliações...')
  } catch (error) {
    console.error('Erro ao executar inserção de avaliações:', error)
  }
}

const schedulePostReviewsTable = async () => {
  try {
    await postReviewsTable()
    console.log('Executando inserção de avaliações na tabela principal...')
  } catch (error) {
    console.error('Erro ao executar inserção de avaliações:', error)
  }
}

// setInterval(schedulePostReviews, 10 * 60 * 1000) // 10 minutos
setInterval(schedulePostReviews, 10 * 60 * 1000) // 1 minuto
setInterval(schedulePostReviewsTable, 10 * 90 * 1000) // 1 min e 30 seg

app.get('/', (request, reply) => {
  return reply.send(JSON.stringify({ nome: 'Luiz' }))
})

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT ?? 3333,
  })
  .then(() => {
    console.log('Server Running')
  })
