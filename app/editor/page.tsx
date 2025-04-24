"use client"

import { Room } from "./room.tsx";
import { Button } from "@/components/ui/button";
import ShareButton from "./components/share_button";
import { CollaborativeEditor } from "./editor.tsx";
import ThemeToggle from "./components/theme-switch.tsx";
import Header from './components/header.tsx';
import Git from "./components/github.tsx";
import Key from "./components/key.tsx";
import File_Upload from "./components/file_uploader.tsx";
import { useState } from "react";
import { RoomProvider } from "../../liveblocks.config.ts";
import { Avatars } from "./components/avatars.tsx";
//import React, { useState } from 'react';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

export default function Page() {
  const [fileData, setFileData] = useState<string>();
  const roomId = "lets-collab";
  //const [dataFromChild, setDataFromChild] = useState("");
  function handleDataFromChild(data: string) {
    //setDataFromChild(data);
    console.log('recieved data from child');
    
    setFileData(data);
    console.log(fileData);
  }
  return (
    <Room roomId={roomId}>
    <div className="grid grid-cols-12 min-h-screen" suppressHydrationWarning>
        <div className="col-span-3 bg-gray-200 dark:bg-zinc-900 text-black dark:text-white w-full p-4 flex flex-col gap-6">
          <Header />
          <div className="mt-16 flex flex-col gap-2">
            <CardTitle className="text-xl mb-2">Upload a File</CardTitle>
            <File_Upload sendDataToParent={handleDataFromChild} />
          </div>
          <ThemeToggle />
        </div>
        <div className="col-span-6 bg-white dark:bg-black text-black dark:text-white w-full p-6">
          <div className="flex justify-between items-center p-4">
            <h1 className="text-xl font-bold">Live Editor</h1>
            <ShareButton roomId={roomId} />
          </div>
            <CollaborativeEditor data={fileData}/>
        </div>
        <div className="col-span-3 bg-gray-200 dark:bg-zinc-900 text-black dark:text-white w-full p-4 flex flex-col items-start gap-4">
          <h1 className="text-2xl font-bold">Active Users</h1>
          <Avatars />
        </div>
    </div>
    </Room>
  );
}