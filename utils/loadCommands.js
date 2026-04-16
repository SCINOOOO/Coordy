import { REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import client from "./client.js";
import "dotenv/config";

/* utils/loadCommands.js */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commandsPath = path.join(__dirname, "../commands");

client.commands = new Map();

async function loadCommands() {
    const commands = [];
    const commandFiles = fs.readdirSync(commandsPath)
        .filter(file => file.endsWith(".js"));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const imported = await import(pathToFileURL(filePath).href);
        const command = imported.default;

        if (command?.data && command?.execute) {
            commands.push(command.data.toJSON());
            client.commands.set(command.data.name, command);
        } else {
            console.warn(`❌ The command at ${file} is missing "data" or "execute"`);
        }
    }

    const rest = new REST().setToken(process.env.TOKEN);

    await rest.put(
        Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID),
        { body: commands }
    );

    console.log("✅ Updated application commands!");
}

export default loadCommands;