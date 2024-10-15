import { sql } from 'drizzle-orm'
import { db } from '../db'
import { client } from '../db/schema'

export async function getIdClient(name: string) {
  const [idClient] = await db
    .select({
      id: client.id,
    })
    .from(client)
    .where(
      sql /* sql */`upper(unaccent(${client.name})) = upper(unaccent(${name}))`
    )

  return { idClient }
}
