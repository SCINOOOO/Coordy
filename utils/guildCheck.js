import client from "./client.js";
import "dotenv/config";

/* utils/guildCheck.js */

async function guildCheck() {
    const guilds = await client.guilds.fetch();

    for (const [, guild] of guilds) {
        if (guild.id !== process.env.GUILD_ID) {
            try {
                await client.guilds.cache.get(guild.id)?.leave();
                console.log(`❌ Left unauthorized guild "${guild.name}" (${guild.id})`);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.log(`✅ Checked authorized guild "${guild.name}" (${guild.id})`);
        }
    }
}

export default guildCheck;