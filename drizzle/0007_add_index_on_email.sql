CREATE TYPE "public"."role_enum" AS ENUM('ADMIN', 'USER');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "role_enum" DEFAULT 'USER' NOT NULL;--> statement-breakpoint
CREATE INDEX "email_index" ON "user" USING btree ("email");