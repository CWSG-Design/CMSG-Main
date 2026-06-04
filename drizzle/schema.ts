import { decimal, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Installer directory — sign companies that offer installation services.
 * Submitted via the /installer-sign-up form; geocoded on submission.
 */
export const installers = mysqlTable("installers", {
  id: int("id").autoincrement().primaryKey(),
  companyName: varchar("companyName", { length: 255 }).notNull(),
  contactName: varchar("contactName", { length: 255 }),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 64 }),
  website: varchar("website", { length: 512 }),
  // Full address fields
  address: varchar("address", { length: 512 }),
  city: varchar("city", { length: 128 }),
  province: varchar("province", { length: 64 }),
  postalCode: varchar("postalCode", { length: 32 }),
  country: varchar("country", { length: 64 }).default("Canada"),
  // Geocoded coordinates (populated on sign-up)
  lat: decimal("lat", { precision: 10, scale: 7 }),
  lng: decimal("lng", { precision: 10, scale: 7 }),
  // Service details
  capabilities: text("capabilities"),
  equipment: text("equipment"),
  areasServed: text("areasServed"),
  maxTravelDistance: varchar("maxTravelDistance", { length: 128 }),
  // Moderation
  approved: mysqlEnum("approved", ["pending", "approved", "rejected"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Installer = typeof installers.$inferSelect;
export type InsertInstaller = typeof installers.$inferInsert;
