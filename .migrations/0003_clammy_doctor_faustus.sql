CREATE TABLE IF NOT EXISTS "tmp_reviews" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"id_client" uuid NOT NULL,
	"name" text NOT NULL,
	"review_note" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
