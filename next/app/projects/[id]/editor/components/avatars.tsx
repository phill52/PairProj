import { useOthers, useSelf } from "@liveblocks/react/suspense";
import styles from "./Avatars.module.css";

export function Avatars() {
  const users = useOthers();
  const currentUser = useSelf();

  return (
    <div className={styles.avatars}>
      {users.map(({ connectionId, info }) => {
        const picture = typeof info?.picture === "string" ? info.picture : "";
        const name = typeof info?.name === "string" ? info.name : "";

        return (
          <Avatar key={connectionId} picture={picture} name={name} />
        );
      })}

      {currentUser && (
        <div className="relative ml-8 first:ml-0">
          <Avatar
            picture={typeof currentUser.info?.picture === "string" ? currentUser.info.picture : ""}
            name={currentUser.info?.name === "string" ? currentUser.info.name : ""}
          />
        </div>
      )}
    </div>
  );
}

export function Avatar({ picture, name }: { picture: string; name: string }) {
  return (
    <div className={styles.avatar} data-tooltip={name}>
      <img
        src={picture}
        className={styles.avatar_picture}
        data-tooltip={name}
      />
    </div>
  );
}
