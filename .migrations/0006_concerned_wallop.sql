ALTER TABLE "reviews" ALTER COLUMN "message" SET DEFAULT 'Excelente';--> statement-breakpoint
ALTER TABLE "reviews" ALTER COLUMN "message" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tmp_reviews" ALTER COLUMN "message" SET DEFAULT 'Excelente';--> statement-breakpoint
ALTER TABLE "tmp_reviews" ALTER COLUMN "message" SET NOT NULL;