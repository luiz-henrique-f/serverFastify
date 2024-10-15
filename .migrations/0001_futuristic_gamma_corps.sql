CREATE TABLE IF NOT EXISTS "reviews" (
	"id" uuid NOT NULL,
	"name" text NOT NULL,
	"review_note" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
