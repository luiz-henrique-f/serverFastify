import { eq } from 'drizzle-orm'
import { db } from '../db'
import { client, reviews, tmp_reviews } from '../db/schema'

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
    })
    .from(client)

  const clientId = clientRecord[0].id

  // Criar um array para armazenar os valores a serem inseridos
  const reviewsToInsert = new Array(10).fill(null).map(() => ({
    id_client: clientId,
    name: getRandomName(),
    review_note: getRandomInteger(1, 5),
  }))

  // Inserir as avaliações
  await db.insert(tmp_reviews).values(reviewsToInsert)
}

// import { eq } from 'drizzle-orm'
// import { db } from '../db'
// import { client, reviews, tmp_reviews } from '../db/schema'

// export async function postReviews(idClient: string) {
//   function getRandomName(): string {
//     const names = [
//       'Alice',
//       'Bob',
//       'Charlie',
//       'David',
//       'Eve',
//       'Frank',
//       'Grace',
//       'Heidi',
//       'Ivan',
//       'Judy',
//     ]

//     const randomIndex = Math.floor(Math.random() * names.length)
//     return names[randomIndex]
//   }

//   const times = new Array(10).fill(null)
//   times.forEach((_, i) => {
//     const idClient = db
//     .select({
//         id: client.id,
//       })
//       .from(client)

//     await db.insert(tmp_reviews).values([
//         { id_client: idClient, name: getRandomName(), review_note: 5},
//     ])
//   })

//   const [review] = await db
//     .select({
//       id: reviews.id,
//     })
//     .from(reviews)
//     .where(eq(reviews.id_client, idClient))

//   return { review }
// }
