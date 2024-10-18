import { and, eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { reviews } from '../db/schema'

export async function getReviewsToday(idClient: string) {
  const [totalReviews] = await db
    .select({
      qtd: sql /*sql */`COALESCE(count(1), 0)`.as('qtd'),
    })
    .from(reviews)
    .where(
      and(
        eq(reviews.id_client, idClient),
        sql /*sql */`TO_CHAR(reviews.created_at, 'DD/MM/YYYY') = TO_CHAR(NOW(), 'DD/MM/YYYY')`
      )
    )

  return { totalReviews }
}
