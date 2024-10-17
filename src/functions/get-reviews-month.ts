import { and, eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { reviews } from '../db/schema'

export async function getReviewsMonth(idClient: string) {
  const totalReviews = await db
    .select({
      qtd: sql /*sql */`COALESCE((SELECT count(1)
                      FROM ${reviews}
                      WHERE EXTRACT(MONTH FROM ${reviews}.created_at) = tmp.mes
                      AND ${reviews}.id_client = ${idClient}), 0)`,
      nome_mes: sql /*sql */`TRIM(tmp.nome_mes)`.as('nome_mes'),
    })
    .from(
      sql /*sql */`(
          SELECT 
              EXTRACT(MONTH FROM NOW() - INTERVAL '1 month' * s.mes) AS mes,
              TO_CHAR(NOW() - INTERVAL '1 month' * s.mes, 'Month') AS nome_mes
          FROM 
              GENERATE_SERIES(0, 5) AS s(mes)
          ORDER BY mes
        ) tmp`
    )

  console.log(totalReviews)

  return totalReviews
}
