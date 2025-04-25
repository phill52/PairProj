"use client";

import { FiSun, FiMoon } from "react-icons/fi"
import { useTheme } from "next-themes";
import { resolve } from "path";
import { useState, useEffect } from "react";

function ThemeToggle() {
    const { setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    // const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // const toggleTheme = () => {
    // setTheme(isDarkMode ? "light" : "dark");
    // setIsDarkMode(!isDarkMode);
    // };

    // if (!mounted) {
    // return null;
    // }
    // return (
    // <button onClick={toggleTheme}>
    //     {isDarkMode ? "Light Mode" : "Dark Mode"}
    // </button>
    // );
    // if (resolvedTheme === "dark") {
    //     return <FiSun onClick={() => setTheme("light")} />
    // }
    // if (resolvedTheme === "light") {
    //     return <FiMoon onClick={() => setTheme("dark")} />
    // }
    if (!mounted) {
        return <div className="w-12 h-12"></div>
    }

    return (
        <button 
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="fixed bottom-4 left-4 p-2 bg-gray-200 dark:bg-zinc-900 text-black dark:text-white"
        >
            {resolvedTheme === "dark" ? <FiSun size={26}/> : <FiMoon size={26}/>}
        </button>
    );
}
export default ThemeToggle;
