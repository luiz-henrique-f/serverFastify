import { getReviews30Days } from './get-reviews-30-days'
import { getReviewsAvg } from './get-reviews-avg'
import { getReviewsToday } from './get-reviews-today'
import { getTotalReviewsClient } from './get-total-reviews-client'

export async function getDataDashboard(idClient: string) {
  const [reviewsToday, totalReviews, reviewsLast30Days, reviewsAvg] =
    await Promise.all([
      getReviewsToday(idClient),
      getTotalReviewsClient(idClient),
      getReviews30Days(idClient),
      getReviewsAvg(idClient),
    ])

  return { reviewsToday, totalReviews, reviewsLast30Days, reviewsAvg }
}
