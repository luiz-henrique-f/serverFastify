CREATE TABLE IF NOT EXISTS "client" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"address_number" text NOT NULL,
	"city" text NOT NULL,
	"uf" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
