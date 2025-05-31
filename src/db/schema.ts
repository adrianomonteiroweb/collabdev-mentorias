import { relations } from "drizzle-orm";
import {
  pgSchema,
  serial,
  varchar,
  jsonb,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

export const collabdevmentoring = pgSchema("collabdevmentoring");

export const roles = collabdevmentoring.table("roles", {
  id: serial("id").primaryKey().notNull(),
  name: varchar("name", { length: 255 }).notNull(),

  metadata: jsonb("metadata"),

  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
});

export const users = collabdevmentoring.table("users", {
  id: serial("id").primaryKey().notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),

  role_id: integer("role_id")
    .notNull()
    .references(() => roles.id),

  password: varchar("password", { length: 255 }).notNull(),

  metadata: jsonb("metadata"),

  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  deleted_at: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
});

export const mentorships = collabdevmentoring.table("mentorships", {
  id: serial("id").primaryKey().notNull(),

  title: varchar("title", { length: 255 }).notNull(),
  description: varchar("description").notNull(),
  full_description: varchar("full_description").notNull(),

  mentor_id: integer("mentor_id")
    .notNull()
    .references(() => users.id),

  tags: jsonb("tags").notNull(),

  date: varchar("date", { length: 10 }).notNull(), // formato ISO yyyy-mm-dd
  time: varchar("time", { length: 5 }).notNull(), // formato HH:mm
  duration: varchar("duration", { length: 20 }).notNull(), // ex: "60 min"

  current_participants: integer("current_participants").default(0).notNull(),
  min_participants: integer("min_participants").notNull(),
  max_participants: integer("max_participants").notNull(),

  status: varchar("status", { length: 20 }).notNull(), // ex: "confirmed", "open"
  meet_link: varchar("meet_link", { length: 255 }),

  created_at: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  deleted_at: timestamp("deleted_at", { withTimezone: true, mode: "string" }),
});

export const user_mentorships = collabdevmentoring.table("user_mentorships", {
  id: serial("id").primaryKey().notNull(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  mentorship_id: integer("mentorship_id")
    .notNull()
    .references(() => mentorships.id),
  status: varchar("status", { length: 20 }).notNull(), // ex: "confirmed", "pending", "cancelled"
});

export const usersRelations = relations(users, ({ one }) => ({
  role: one(roles, {
    fields: [users.role_id],
    references: [roles.id],
  }),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const mentorshipsRelations = relations(mentorships, ({ one }) => ({
  mentor: one(users, {
    fields: [mentorships.mentor_id],
    references: [users.id],
  }),
}));

export const userMentorshipsRelations = relations(
  user_mentorships,
  ({ one }) => ({
    user: one(users, {
      fields: [user_mentorships.user_id],
      references: [users.id],
    }),
    mentorship: one(mentorships, {
      fields: [user_mentorships.mentorship_id],
      references: [mentorships.id],
    }),
  })
);
