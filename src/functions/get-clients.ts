import { and, desc, eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { reviews } from '../db/schema'

export async function getClients(idClient: string) {
  const totalReviews = await db
    .select({
      id: reviews.id,
      name: reviews.name,
      review_note: reviews.review_note,
      message: reviews.message,
    })
    .from(reviews)
    .where(
      and(
        eq(reviews.id_client, idClient),
        sql /*sql */`reviews.created_at >= NOW() - INTERVAL '24 hours'`
      )
    )
    .orderBy(desc(reviews.created_at))
    .limit(5)

  return totalReviews
}
