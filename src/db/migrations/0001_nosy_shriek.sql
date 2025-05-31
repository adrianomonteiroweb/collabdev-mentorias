CREATE TABLE IF NOT EXISTS "collabdevmentoring"."mentorships" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" varchar NOT NULL,
	"full_description" varchar NOT NULL,
	"mentor_id" integer NOT NULL,
	"tags" jsonb NOT NULL,
	"date" varchar(10) NOT NULL,
	"time" varchar(5) NOT NULL,
	"duration" varchar(20) NOT NULL,
	"current_participants" integer DEFAULT 0 NOT NULL,
	"min_participants" integer NOT NULL,
	"max_participants" integer NOT NULL,
	"status" varchar(20) NOT NULL,
	"meet_link" varchar(255),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "collabdevmentoring"."users" DROP CONSTRAINT "users_email_key";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "collabdevmentoring"."mentorships" ADD CONSTRAINT "mentorships_mentor_id_users_id_fk" FOREIGN KEY ("mentor_id") REFERENCES "collabdevmentoring"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "collabdevmentoring"."users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");