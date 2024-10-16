import { sql } from 'drizzle-orm'
import { db } from '../db'
import { client, tmp_reviews } from '../db/schema'

export async function postReviews() {
  function getRandomName(): string {
    const names = [
      'Alice',
      'Bob',
      'Charlie',
      'David',
      'Eve',
      'Frank',
      'Grace',
      'Heidi',
      'Ivan',
      'Judy',
    ]

    const randomIndex = Math.floor(Math.random() * names.length)
    return names[randomIndex]
  }

  function getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  // Obter o id do cliente
  const clientRecord = await db
    .select({
      id: client.id,
      qtd: sql`count(1) over()`.as('qtd'),
    })
    .from(client)

  const clientId =
    clientRecord[getRandomInteger(0, Number(clientRecord[0].qtd) - 1)].id

  // Criar um array para armazenar os valores a serem inseridos
  const reviewsToInsert = new Array(5).fill(null).map(() => ({
    id_client: clientId,
    name: getRandomName(),
    review_note: getRandomInteger(1, 5),
  }))

  // Inserir as avaliações
  await db.insert(tmp_reviews).values(reviewsToInsert)
}
