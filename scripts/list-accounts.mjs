import pg from "pg";

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

await client.connect();
const result = await client.query(
  'SELECT "providerId", ("password" IS NOT NULL) AS has_password FROM "account"'
);
console.log(result.rows);
await client.end();