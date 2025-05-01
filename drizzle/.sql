CREATE TYPE "public"."gender_enum" AS ENUM('male', 'female', 'other');--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "gender" "gender_enum" NOT NULL;