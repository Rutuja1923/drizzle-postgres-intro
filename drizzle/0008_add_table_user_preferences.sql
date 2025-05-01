CREATE TABLE "userPrefereces" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email_updates" boolean DEFAULT false NOT NULL,
	"user_ref_id" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "userPrefereces" ADD CONSTRAINT "userPrefereces_user_ref_id_user_user_id_fk" FOREIGN KEY ("user_ref_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;