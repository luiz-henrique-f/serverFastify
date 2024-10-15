ALTER TABLE "reviews" ADD PRIMARY KEY ("id");--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "reviews" ADD COLUMN "id_client" uuid NOT NULL;