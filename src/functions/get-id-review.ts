import { eq } from 'drizzle-orm'
import { db } from '../db'
import { reviews } from '../db/schema'

export async function getIdReview(idClient: string) {
  const [review] = await db
    .select({
      id: reviews.id,
    })
    .from(reviews)
    .where(eq(reviews.id_client, idClient))

  return { review }
}
