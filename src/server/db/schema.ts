import { relations, sql } from "drizzle-orm";
import { index, sqliteTable } from "drizzle-orm/sqlite-core";

/**
 * Multi-project schema prefix helper
 */

// Posts example table
export const posts = sqliteTable(
  "post",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: d.text({ length: 256 }),
    createdById: d
      .text({ length: 255 })
      .notNull()
      .references(() => user.id),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("created_by_idx").on(t.createdById),
    index("name_idx").on(t.name),
  ],
);

// Better Auth core tables
export const user = sqliteTable("user", (d) => ({
  id: d
    .text({ length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: d.text({ length: 255 }),
  email: d.text({ length: 255 }).notNull().unique(),
  emailVerified: d.integer({ mode: "boolean" }).default(false),
  image: d.text({ length: 255 }),
  createdAt: d
    .integer({ mode: "timestamp" })
    .default(sql`(unixepoch())`)
    .notNull(),
  updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
}));

export const account = sqliteTable(
  "account",
  (d) => ({
    id: d
      .text({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => user.id),
    accountId: d.text({ length: 255 }).notNull(),
    providerId: d.text({ length: 255 }).notNull(),
    accessToken: d.text(),
    refreshToken: d.text(),
    accessTokenExpiresAt: d.integer({ mode: "timestamp" }),
    refreshTokenExpiresAt: d.integer({ mode: "timestamp" }),
    scope: d.text({ length: 255 }),
    idToken: d.text(),
    password: d.text(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("account_user_id_idx").on(t.userId)],
);

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const session = sqliteTable(
  "session",
  (d) => ({
    id: d
      .text({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => user.id),
    token: d.text({ length: 255 }).notNull().unique(),
    expiresAt: d.integer({ mode: "timestamp" }).notNull(),
    ipAddress: d.text({ length: 255 }),
    userAgent: d.text({ length: 255 }),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("session_user_id_idx").on(t.userId)],
);

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, { fields: [session.userId], references: [user.id] }),
}));

export const verification = sqliteTable(
  "verification",
  (d) => ({
    id: d
      .text({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    identifier: d.text({ length: 255 }).notNull(),
    value: d.text({ length: 255 }).notNull(),
    expiresAt: d.integer({ mode: "timestamp" }).notNull(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("verification_identifier_idx").on(t.identifier)],
);

/**
 * tabel kendaraan pengguna (Page 3: My Vehicles)
 */
export const vehicles = sqliteTable(
  "vehicle",
  (d) => ({
    id: d
      .text({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: d.text({ length: 100 }).notNull(), // misal: "Honda Beat"
    subtitle: d.text({ length: 100 }), // misal: "Daily ride" / "Weekend ride"
    efficiencyKmPerLiter: d.real().notNull(), // misal: 45.0 (km/L)
    fuelType: d.text({ length: 50 }).notNull(), // misal: "Pertalite", "Pertamax"
    fuelPricePerLiter: d.integer({ mode: "number" }).notNull(), // misal: 10000 (Rp)
    idleFuelRateLiterPerMin: d.real().default(0.015).notNull(), // koefisien boros saat macet (beta_t)
    isActive: d.integer({ mode: "boolean" }).default(false).notNull(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("vehicle_user_id_idx").on(t.userId)],
);

/**
 * tabel rute perjalanan rutin (Page 3: Saved Commute Routes)
 */
export const routes = sqliteTable(
  "route",
  (d) => ({
    id: d
      .text({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    name: d.text({ length: 150 }).notNull(), // misal: "Cileunyi – Kampus UPI"
    roundTripDistanceKm: d.real().notNull(), // jarak pulang-pergi (km)
    avgTrafficMinutes: d.real().notNull(), // parameter mean kemacetan (mu_t)
    stdDevTrafficMinutes: d.real().notNull(), // parameter standar deviasi kemacetan (sigma_t)
    isActive: d.integer({ mode: "boolean" }).default(false).notNull(), // rute aktif di simulator
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("route_user_id_idx").on(t.userId)],
);

/**
 * tabel skenario simulasi tersimpan (Page 2: Save Scenario & Page 5: Analytics Cache)
 */
export const commuteScenarios = sqliteTable(
  "commute_scenario",
  (d) => ({
    id: d
      .text({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    vehicleId: d
      .text({ length: 255 })
      .references(() => vehicles.id, { onDelete: "set null" }),
    routeId: d
      .text({ length: 255 })
      .references(() => routes.id, { onDelete: "set null" }),
    scenarioName: d.text({ length: 150 }).notNull(), // misal: "Skenario Kuliah November"
    isCurrentActive: d.integer({ mode: "boolean" }).default(true).notNull(), // acuan untuk Daily Log

    // snapshot parameter input (disimpan agar historis tidak rusak jika master berubah)
    distanceKm: d.real().notNull(),
    commuteDaysPerMonth: d.integer({ mode: "number" }).notNull(), // misal: 22 hari
    avgTrafficMinutes: d.real().notNull(),
    stdDevTrafficMinutes: d.real().notNull(),
    variabilityLevel: d.text({ length: 20 }).notNull(), // "LOW" | "MEDIUM" | "HIGH"
    targetMonthlyBudget: d.integer({ mode: "number" }).notNull(), // misal: 300000
    simulationRuns: d.integer({ mode: "number" }).default(5000).notNull(),

    // ringkasan output statistik monte carlo (untuk KPI Cards & Perbandingan)
    expectedMonthlyCost: d.real().notNull(), // mean E[X]
    medianMonthlyCost: d.real().notNull(), // P50
    stdDevMonthlyCost: d.real().notNull(), // sigma biaya
    p05MonthlyCost: d.real().notNull(), // best case (5th percentile)
    p95MonthlyCost: d.real().notNull(), // worst case (95th percentile)
    trafficPenaltyCost: d.real().notNull(), // biaya khusus akibat macet
    budgetSafetyProbability: d.real().notNull(), // P(Cost <= Budget) dalam % (0-100)
    skewness: d.real(), // kemencengan distribusi
    rSquared: d.real(), // goodness-of-fit model regresi

    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("scenario_user_id_idx").on(t.userId),
    index("scenario_active_idx").on(t.userId, t.isCurrentActive),
  ],
);

/**
 * tabel catatan perjalanan harian (Page 4: Daily Commute Log & Bayesian Calibration)
 */
export const dailyLogs = sqliteTable(
  "daily_log",
  (d) => ({
    id: d
      .text({ length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    userId: d
      .text({ length: 255 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    scenarioId: d
      .text({ length: 255 })
      .references(() => commuteScenarios.id, { onDelete: "set null" }),
    routeId: d
      .text({ length: 255 })
      .references(() => routes.id, { onDelete: "set null" }),
    vehicleId: d
      .text({ length: 255 })
      .references(() => vehicles.id, { onDelete: "set null" }),

    commuteDate: d.integer({ mode: "timestamp" }).notNull(), // tanggal perjalanan
    actualDistanceKm: d.real().notNull(), // jarak aktual ditempuh hari itu
    actualTrafficMinutes: d.real().notNull(), // durasi macet aktual (menit)
    estimatedFuelUsedLiters: d.real().notNull(), // hasil hitung bensin terpakai hari itu
    actualCostRp: d.real().notNull(), // estimasi biaya perjalanan hari itu / aktual isi BBM
    actualRefuelCostRp: d.integer({ mode: "number" }), // opsional: jika hari itu isi bensin di SPBU
    statusBadge: d.text({ length: 30 }).default("ON_TRACK").notNull(), // "ON_TRACK" | "TRAFFIC_SPIKE"
    notes: d.text({ length: 255 }),

    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("daily_log_user_date_idx").on(t.userId, t.commuteDate),
    index("daily_log_scenario_idx").on(t.scenarioId),
  ],
);

// relations
export const userRelations = relations(user, ({ many }) => ({
  account: many(account),
  session: many(session),
  vehicles: many(vehicles),
  routes: many(routes),
  commuteScenarios: many(commuteScenarios),
  dailyLogs: many(dailyLogs),
}));

export const vehiclesRelations = relations(vehicles, ({ one, many }) => ({
  user: one(user, { fields: [vehicles.userId], references: [user.id] }),
  scenarios: many(commuteScenarios),
  dailyLogs: many(dailyLogs),
}));

export const routesRelations = relations(routes, ({ one, many }) => ({
  user: one(user, { fields: [routes.userId], references: [user.id] }),
  scenarios: many(commuteScenarios),
  dailyLogs: many(dailyLogs),
}));

export const commuteScenariosRelations = relations(
  commuteScenarios,
  ({ one, many }) => ({
    user: one(user, {
      fields: [commuteScenarios.userId],
      references: [user.id],
    }),
    vehicle: one(vehicles, {
      fields: [commuteScenarios.vehicleId],
      references: [vehicles.id],
    }),
    route: one(routes, {
      fields: [commuteScenarios.routeId],
      references: [routes.id],
    }),
    dailyLogs: many(dailyLogs),
  }),
);

export const dailyLogsRelations = relations(dailyLogs, ({ one }) => ({
  user: one(user, { fields: [dailyLogs.userId], references: [user.id] }),
  scenario: one(commuteScenarios, {
    fields: [dailyLogs.scenarioId],
    references: [commuteScenarios.id],
  }),
  route: one(routes, { fields: [dailyLogs.routeId], references: [routes.id] }),
  vehicle: one(vehicles, {
    fields: [dailyLogs.vehicleId],
    references: [vehicles.id],
  }),
}));
