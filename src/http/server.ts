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

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(getIdReviewRoute)
app.register(getIdClientRoute)

const schedulePostReviews = async () => {
  try {
    await postReviews()
    // Exemplo: await postReviews(someIdClient);
    console.log('Executando inserção de avaliações...')
  } catch (error) {
    console.error('Erro ao executar inserção de avaliações:', error)
  }
}

// setInterval(schedulePostReviews, 10 * 60 * 1000)
setInterval(schedulePostReviews, 60 * 1000)

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
