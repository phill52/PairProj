"use client"

import { Room } from "./room.tsx";
import { CollaborativeEditor } from "./editor.tsx";
// import ThemeToggle from "./components/theme-switch.tsx";
// import Header from './components/header.tsx';
// import Git from "./components/github.tsx";
// import Key from "./components/key.tsx";
import File_Upload from "./components/file_uploader.tsx";
import { SetStateAction, useCallback, useState } from "react";
import EditorSidebar from "./editor-sidebar.tsx";

export default function Page() {
  const [fileData, setFileData] = useState<string>();
  
  const handleFileUpload = (data: SetStateAction<string | undefined>) => {
    setFileData(data);
  };

  type NavBarProps = {
    user: {
      name: string;
      profilepicture: string;
    }
  };

  const SampleInput: NavBarProps = {
    user: {
      name: "Taeseo Um",
      profilepicture: "/images/profile.jpg",
    }}

  return (
    <div className="grid grid-cols-12 min-h-screen" suppressHydrationWarning>
                <div className="col-span-3 bg-gray-200 dark:bg-zinc-900 text-black dark:text-white w-full">
                    <EditorSidebar />
                    <div className="flex w-[17.5rem] flex-col items-start">
                      <File_Upload sendDataToParent={handleFileUpload}/>
                    </div>

                </div>

                <div className="col-span-8 bg-white dark:bg-black text-black dark:text-white w-full flex-none justify-center p-6">
                  <Room>
                    <CollaborativeEditor data={fileData}/>
                  </Room>
                </div>
            </div>
  );
}