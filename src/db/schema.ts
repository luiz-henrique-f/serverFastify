// schema.ts
import { pgTable, uuid, text, timestamp, integer } from 'drizzle-orm/pg-core'
// import { relations } from 'drizzle-orm'

// Tabela `client`
export const client = pgTable('client', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  address_number: text('address_number').notNull(),
  city: text('city').notNull(),
  uf: text('uf').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
})

// Tabela `reviews`
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  id_client: uuid('id_client').notNull(),
  name: text('name').notNull(),
  review_note: integer('review_note').notNull(),
  message: text('message').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
})

// Tabela `tmp_reviews`
export const tmp_reviews = pgTable('tmp_reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  id_client: uuid('id_client').notNull(),
  name: text('name').notNull(),
  review_note: integer('review_note').notNull(),
  message: text('message').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
})
