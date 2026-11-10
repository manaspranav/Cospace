import pg from "pg";

const client = new pg.Client({ connectionString: process.env.DATABASE_URL });

await client.connect();

await client.query(`
  CREATE TABLE IF NOT EXISTS workspace (
    id          text PRIMARY KEY,
    name        text NOT NULL,
    visibility  text NOT NULL DEFAULT 'private'
                CHECK (visibility IN ('public', 'private')),
    owner_id    text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    created_at  timestamptz NOT NULL DEFAULT now()
  )
`);

await client.query(`
  CREATE TABLE IF NOT EXISTS workspace_member (
    workspace_id text NOT NULL REFERENCES workspace(id) ON DELETE CASCADE,
    user_id      text NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    role         text NOT NULL DEFAULT 'member'
                 CHECK (role IN ('owner', 'member')),
    joined_at    timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (workspace_id, user_id)
  )
`);

console.log("Workspace tables are ready.");
await client.end();