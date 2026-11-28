import { db } from "./index";
import { sql } from "drizzle-orm";

await db.run(sql`DROP TABLE IF EXISTS post`);
await db.run(sql`DROP TABLE IF EXISTS account`);
await db.run(sql`DROP TABLE IF EXISTS session`);
await db.run(sql`DROP TABLE IF EXISTS user`);
await db.run(sql`DROP TABLE IF EXISTS verification`);
await db.run(sql`DROP TABLE IF EXISTS daily_log`);
await db.run(sql`DROP TABLE IF EXISTS commute_scenario`);
await db.run(sql`DROP TABLE IF EXISTS route`);
await db.run(sql`DROP TABLE IF EXISTS vehicle`);