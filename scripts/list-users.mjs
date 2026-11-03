import pg from "pg";

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

await client.connect();
const result = await client.query(
  'SELECT name, email, "emailVerified" FROM "user"'
);
console.log(result.rows);
await client.end();