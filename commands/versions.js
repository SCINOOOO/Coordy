import { SlashCommandBuilder, MessageFlags, ContainerBuilder, Colors, TextDisplayBuilder } from "discord.js";
import { version } from "discord.js";
import fs from "fs";

/* commands/versions.js */

export default {
    data: new SlashCommandBuilder()
        .setName("versions")
        .setDescription("Shows the versions of the bot and its dependencies."),

    async execute(interaction) {
        const nodeVersion = process.versions.node;
        const djsVersion = version;
        const botVersion = JSON.parse(await fs.promises.readFile("./package.json", "utf-8")).version;

        const replyContainer = new ContainerBuilder()
            .setAccentColor(Colors.Blurple)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`-# VERSIONS`),
                new TextDisplayBuilder().setContent(`-# \`🚧 Coordy: ${botVersion}\`\n-# \`🚧 Node.JS: ${nodeVersion}\`\n-# \`🚧 Discord.JS: ${djsVersion}\``)
            )
        
        await interaction.reply({ components: [replyContainer], flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2 });
    }
};