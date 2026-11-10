import pg from "pg";

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

await client.connect();
const result = await client.query(
  `SELECT w.id, w.name, w.visibility, m.role
   FROM workspace w
   JOIN workspace_member m ON m.workspace_id = w.id`
);
console.log(result.rows);
await client.end();