import { Liveblocks } from "@liveblocks/node";
import { NextRequest } from "next/server";

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  // Get the current user's unique id from your database
  const userId = Math.floor(Math.random() * 10) % USER_INFO.length;

  // Create a session for the current user
  // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
  const session = liveblocks.prepareSession(`user-${userId}`, {
    userInfo: USER_INFO[userId],
  });

  // Use a naming pattern to allow access to rooms with a wildcard
  session.allow(`liveblocks:examples:*`, session.FULL_ACCESS);

  // Authorize the user and return the result
  const { body, status } = await session.authorize();
  return new Response(body, { status });
}

const USER_INFO = [
  {
    name: "User 1",
    color: "#D583F0",
    picture: "https://liveblocks.io/avatars/avatar-1.png",
  },
  {
    name: "User 2",
    color: "#F08385",
    picture: "https://liveblocks.io/avatars/avatar-2.png",
  },
  {
    name: "User 3",
    color: "#F0D885",
    picture: "https://liveblocks.io/avatars/avatar-3.png",
  },
  {
    name: "User 4",
    color: "#85EED6",
    picture: "https://liveblocks.io/avatars/avatar-4.png",
  },
];
