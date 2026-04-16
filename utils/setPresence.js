import { ActivityType, PresenceUpdateStatus } from "discord.js";
import fs from "fs";
import client from "./client.js";

/* utils/setPresence.js */

async function setPresence() {
    if (!client.user) return;
    try {
        const { version } = JSON.parse(await fs.promises.readFile("./package.json", "utf-8"));

        client.user.setPresence({
            activities: [
                { name: `🚧 Version ${version}`, type: ActivityType.Custom },
            ],
            status: PresenceUpdateStatus.Idle,
        });

        console.log("✅ Presence set!");
    } catch (error) {
        console.error(error);
    }
}

export default setPresence;