// Define Liveblocks types for your application
// https://liveblocks.io/docs/api-reference/liveblocks-react#Typing-your-data
import { createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";


interface ClientConfig {
  // Each user's Presence, for useMyPresence, useOthers, etc.
  Presence: {
    // Example, real-time cursor coordinates
    cursor: { x: number; y: number } | null;
  };

  // The Storage tree for the room, for useMutation, useStorage, etc.
  Storage: {
    // Example, a conflict-free list
    // animals: LiveList<string>;
  };

  // Custom user info set when authenticating with a secret key
  UserMeta: {
    id: string;
    info: {
      // Example properties, for useSelf, useUser, useOthers, etc.
      name: string;
      color: string;
      picture: string;
    };
  };

  // Custom events, for useBroadcastEvent, useEventListener
  RoomEvent: {};
    // Example has two events, using a union
    // | { type: "PLAY" } 
    // | { type: "REACTION"; emoji: "🔥" };

  // Custom metadata set on threads, for useThreads, useCreateThread, etc.
  ThreadMetadata: {
    // Example, attaching coordinates to a thread
    // x: number;
    // y: number;
  };

  // Custom room info set with resolveRoomsInfo, for useRoomInfo
  RoomInfo: {
    // Example, rooms with a title and url
    // title: string;
    // url: string;
  };
}

declare global {
  interface Liveblocks extends ClientConfig {}
}

const client = createClient({
  authEndpoint: "/api/auth",
});

export const {
  RoomProvider,
  useRoom,
  useSelf,
  useOthers,
  useBroadcastEvent,
  useEventListener,
  useMutation,
  useStorage,
  useThreads,
  useRoomInfo,
} = createRoomContext(client);
