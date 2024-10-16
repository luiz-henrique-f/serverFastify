import { sql } from 'drizzle-orm'
import { db } from '../db'
import { reviews, tmp_reviews } from '../db/schema'

interface TmpReview {
  id: string
  id_client: string
  name: string
  review_note: number
}

export async function postReviewsTable() {
  const reviewsTmp: TmpReview[] = await db
    .select({
      id: tmp_reviews.id,
      id_client: tmp_reviews.id_client,
      name: tmp_reviews.name,
      review_note: tmp_reviews.review_note,
    })
    .from(tmp_reviews)
    .where(
      sql /* sql */`not exists(select 1 from ${reviews} where ${reviews.id} = ${tmp_reviews.id})`
    )

  if (reviewsTmp.length > 0) {
    await db.insert(reviews).values(reviewsTmp)
  }
}
