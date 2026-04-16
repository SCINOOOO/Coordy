import { Events } from "discord.js";
import client from "./utils/client.js";
import setPresence from "./utils/setPresence.js";
import login from "./utils/login.js";
import guildCheck from "./utils/guildCheck.js";
import loadCommands from "./utils/loadCommands.js";
import runCommand from "./utils/runCommand.js";
import { clearTempChannelsOnStartup, createTempChannel, deleteTempChannel } from "./utils/tempVoice.js";

/* BOT.JS */

login();

client.once(Events.ClientReady, async () => {
    await guildCheck();
    await loadCommands();
    await setPresence();
    await clearTempChannelsOnStartup();
});

client.on(Events.InteractionCreate, async (interaction) => {
    await runCommand(interaction);
});

client.on(Events.VoiceStateUpdate, async (oldState, newState) => {
    await createTempChannel(oldState, newState);
    await deleteTempChannel(oldState);
});

client.on(Events.GuildCreate, async () => {
    await guildCheck();
});