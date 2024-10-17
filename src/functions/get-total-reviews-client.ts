import { and, eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { reviews } from '../db/schema'

export async function getTotalReviewsClient(idClient: string) {
  const [totalReviews] = await db
    .select({
      qtd: sql /*sql */`COALESCE(count(1), 0)`.as('qtd'),
    })
    .from(reviews)
    .where(
      and(
        eq(reviews.id_client, idClient),
        sql /*sql */`reviews.created_at >= NOW() - INTERVAL '90 days'`
      )
    )

  return { totalReviews }
}
