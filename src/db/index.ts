import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { getServerEnv } from "#/server/env";
import * as schema from "./schema";

let database: NodePgDatabase<typeof schema> | undefined;

export function getDb(): NodePgDatabase<typeof schema> {
	if (!database) {
		const { DATABASE_URL } = getServerEnv();
		const pool = new Pool({
			connectionString: DATABASE_URL,
			max: 5,
			connectionTimeoutMillis: 10_000,
			idleTimeoutMillis: 30_000,
		});
		database = drizzle(pool, { schema });
	}

	return database;
}
