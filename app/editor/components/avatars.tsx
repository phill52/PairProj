import { useOthers, useSelf } from "../../../liveblocks.config.ts";
import styles from "./Avatars.module.css";

// Function to generate a random color based on the user's name
const generateColor = (name: string): string => {
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = (hash % 360); // Keep the hue within 360 degrees
    return `hsl(${color}, 70%, 50%)`;  // Use HSL for a more varied color palette
  };

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className={`${styles.avatars} flex flex-wrap gap-6`}>
      {users.map(({ connectionId, info }) => (
        <Avatar key={connectionId} name={info.name} />
      ))}

    {currentUser && <Avatar name={currentUser.info.name} />}
    </div>
  );
}

type AvatarProps = {
    name: string;
  };

export function Avatar({ name }: AvatarProps) {
    const initial = name?.charAt(0).toUpperCase();
    const backgroundColor = generateColor(name);  // Generate a unique background color

    return (
        <div className={`${styles.avatar} flex items-center justify-center`}>
            <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor }}  // Apply the generated color
            >
              {initial}
            </div>
            {/* Tooltip */}
            <div className={`${styles.tooltip} absolute bottom-12 left-1/2 transform -translate-x-1/2`}>
                {name}
            </div>
        </div>
    );
}