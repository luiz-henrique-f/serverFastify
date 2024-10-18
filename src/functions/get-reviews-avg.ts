import { and, eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { reviews } from '../db/schema'

export async function getReviewsAvg(idClient: string) {
  const [totalReviews] = await db
    .select({
      qtd: sql /*sql */`round((sum(reviews.review_note) / COALESCE(count(1), 0)))`.as(
        'qtd'
      ),
    })
    .from(reviews)
    .where(
      and(
        eq(reviews.id_client, idClient),
        sql /*sql */`reviews.created_at >= NOW() - INTERVAL '5 days'`
      )
    )

  return { totalReviews }
}