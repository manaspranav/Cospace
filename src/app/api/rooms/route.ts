import { headers } from "next/headers";
import { randomBytes } from "node:crypto";
import { auth } from "@/lib/auth";
import { pool } from "@/lib/db";

export async function POST(request: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return Response.json(
      { error: "Please log in to create a room." },
      { status: 401 }
    );
  }

  const body = await request.json().catch(() => null);
  const roomName = typeof body?.roomName === "string" ? body.roomName.trim() : "";
  const visibility = body?.visibility === "public" ? "public" : "private";

  if (roomName.length < 3 || roomName.length > 80) {
    return Response.json(
      { error: "Room name must be 3 to 80 characters." },
      { status: 400 }
    );
  }

  const roomId = randomBytes(6).toString("hex");
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(
      "INSERT INTO workspace (id, name, visibility, owner_id) VALUES ($1, $2, $3, $4)",
      [roomId, roomName, visibility, session.user.id]
    );
    await client.query(
      "INSERT INTO workspace_member (workspace_id, user_id, role) VALUES ($1, $2, 'owner')",
      [roomId, session.user.id]
    );
    await client.query("COMMIT");
  } catch {
    await client.query("ROLLBACK");
    return Response.json({ error: "Could not create the room." }, { status: 500 });
  } finally {
    client.release();
  }

  return Response.json({ roomId });
}