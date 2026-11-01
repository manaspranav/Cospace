import pg from "pg";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is missing. Check your .env.local file.");
  process.exit(1);
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

try {
  await client.connect();
  const result = await client.query(
    "SELECT current_user, current_database(), now()"
  );
  console.log("Connected!", result.rows[0]);
  await client.end();
} catch (error) {
  console.error("Connection failed:", error.message);
  process.exitCode = 1;
}