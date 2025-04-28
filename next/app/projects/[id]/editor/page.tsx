"use client";

import { useState } from "react";
import { Room } from "./room";
import { CollaborativeEditor } from "./editor";
import File_Upload from "./components/file_uploader"; // adjust path if needed
import Header from "./components/header"; // adjust path
import ThemeToggle from "./components/theme-switch"; // adjust path
import { CardTitle } from "@/components/ui/card"; // adjust path if needed

export default function Page() {
  const [fileData, setFileData] = useState<string>();

  function handleDataFromChild(data: string) {
    setFileData(data);
  }

  return (
    <div className="grid grid-cols-12 min-h-screen" suppressHydrationWarning>
      {/* Sidebar */}
      <div className="col-span-3 bg-gray-200 dark:bg-zinc-900 text-black dark:text-white w-full flex-none justify-center">
        <Header />
        <ThemeToggle />
      </div>

      {/* Main Editor */}
      <div className="col-span-6 bg-white dark:bg-black text-black dark:text-white w-full flex-none justify-center p-6">
        <Room>
          <CollaborativeEditor data={fileData} />
        </Room>
      </div>

      {/* Upload Section */}
      <div className="col-span-3 bg-gray-200 dark:bg-zinc-900 text-black dark:text-white w-full flex-none justify-center">
        <CardTitle className="text-2xl p-4">Upload a File</CardTitle>
        <File_Upload sendDataToParent={handleDataFromChild} />
      </div>
    </div>
  );
}


// import { Room } from "./room";
// import { CollaborativeEditor } from "./components/Editor";

// export default function Page() {
//   return (
//     <main>
//       <Room>
//         <CollaborativeEditor />
//       </Room>
//     </main>
//   );
// }
