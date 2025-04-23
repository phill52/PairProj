"use client"

import { Room } from "./room.tsx";
import { Button } from "@/components/ui/button";
import { CollaborativeEditor } from "./editor.tsx";
import ThemeToggle from "./components/theme-switch.tsx";
import Header from './components/header.tsx';
import Git from "./components/github.tsx";
import Key from "./components/key.tsx";
import File_Upload from "./components/file_uploader.tsx";
import { useState } from "react";
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
  //const [dataFromChild, setDataFromChild] = useState("");
  function handleDataFromChild(data: string) {
    //setDataFromChild(data);
    console.log('recieved data from child');
    
    setFileData(data);
    console.log(fileData);
  }
  return (
    <div className="grid grid-cols-12 min-h-screen" suppressHydrationWarning>
                <div className="col-span-3 bg-gray-200 dark:bg-zinc-900 text-black dark:text-white w-full flex-none justify-center">
                    <Header />
                    <ThemeToggle />
                </div>
                <div className="col-span-6 bg-white dark:bg-black text-black dark:text-white w-full flex-none justify-center p-6">
                  <Room>
                    <CollaborativeEditor data={fileData}/>
                  </Room>
                </div>
                <div className="col-span-3 bg-gray-200 dark:bg-zinc-900 text-black dark:text-white w-full flex-none justify-center">
                  <CardTitle className="text-2xl">Upload a File</CardTitle>
                  <File_Upload sendDataToParent={handleDataFromChild}/>
                </div>
            </div>
  );
}