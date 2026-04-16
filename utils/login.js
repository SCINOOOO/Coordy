import client from "./client.js";
import "dotenv/config";

/* utils/login.js */

async function login() {
    try {
        if (!process.env.TOKEN) throw new Error("❌ TOKEN is not defined in .env file!");
        if (!process.env.GUILD_ID) throw new Error("❌ GUILD_ID is not defined in .env file!");
        await client.login(process.env.TOKEN);
        console.log("✅ Bot logged in!");
    } catch (error) {
        console.error(error);
    }
}

export default login;