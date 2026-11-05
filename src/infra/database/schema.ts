import { integer, pgTable, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  pasword_hash: varchar({ length: 255 }).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
});

export const verificationCodesTable = pgTable("verification_codes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  code: varchar({ length: 255 }).notNull(),
  sender_email: varchar({ length: 255 }).notNull(),
  is_verificated: integer().default(0).notNull(),
  expires_at: timestamp().notNull(),
  created_at: timestamp().defaultNow().notNull(),
  user_id: integer().references(() => usersTable.id).notNull(),
});
