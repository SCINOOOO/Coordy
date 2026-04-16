import { Colors, ContainerBuilder, MessageFlags, TextDisplayBuilder } from "discord.js";
import client from "./client.js";

/* utils/runCommand.js */

async function runCommand(interaction) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (!command) return console.error(`❌ No command matching ${interaction.commandName} was found!`);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        const interactionFailedReply = new ContainerBuilder()
            .setAccentColor(Colors.Red)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent("-# ❌ There was an error while executing this command!"),
            );
        if (interaction.replied || interaction.deferred) 
            await interaction.followUp({ components: [interactionFailedReply], flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2 });
        else 
            await interaction.reply({ components: [interactionFailedReply], flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2 });
    }
}

export default runCommand;