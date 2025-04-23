"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";



export function Room({ children }: { children: ReactNode }) {
    const roomId = "temp id";
    return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}

