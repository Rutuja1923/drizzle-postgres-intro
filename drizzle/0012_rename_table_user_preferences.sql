ALTER TABLE "userPrefereces" RENAME TO "user_preferences";--> statement-breakpoint
ALTER TABLE "user_preferences" DROP CONSTRAINT "userPrefereces_user_ref_id_users_user_id_fk";
--> statement-breakpoint
ALTER TABLE "user_preferences" ADD CONSTRAINT "user_preferences_user_ref_id_users_user_id_fk" FOREIGN KEY ("user_ref_id") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE cascade;