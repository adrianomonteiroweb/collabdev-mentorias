CREATE TABLE IF NOT EXISTS "collabdevmentoring"."user_mentorships" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"mentorship_id" integer NOT NULL,
	"status" varchar(20) NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collabdevmentoring"."user_mentorships" ADD CONSTRAINT "user_mentorships_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "collabdevmentoring"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collabdevmentoring"."user_mentorships" ADD CONSTRAINT "user_mentorships_mentorship_id_mentorships_id_fk" FOREIGN KEY ("mentorship_id") REFERENCES "collabdevmentoring"."mentorships"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
