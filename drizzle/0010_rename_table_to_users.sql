ALTER TABLE "user" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_author_id_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "userPrefereces" DROP CONSTRAINT "userPrefereces_user_ref_id_user_user_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_user_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userPrefereces" ADD CONSTRAINT "userPrefereces_user_ref_id_users_user_id_fk" FOREIGN KEY ("user_ref_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");