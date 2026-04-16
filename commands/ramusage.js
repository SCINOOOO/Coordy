import { SlashCommandBuilder, MessageFlags, ContainerBuilder, Colors, TextDisplayBuilder } from "discord.js";
import os from "os";

/* commands/ramusage.js */

export default {
    data: new SlashCommandBuilder()
        .setName("ramusage")
        .setDescription("Shows the current and maximum available RAM usage of the bot."),

    async execute(interaction) {
        const heapUsed = process.memoryUsage().heapUsed;
        const totalMem = os.totalmem();

        const curUsage = `${(heapUsed / 1024 / 1024).toFixed(2)} MB`;
        const maxMem = `${(totalMem / 1024 / 1024).toFixed(2)} MB`;

        const ramUsagePercent = heapUsed / totalMem;
        const getRamEmoji = (ramUsagePercent) => {
            if (ramUsagePercent <= 0.2) return "🟢"; 
            if (ramUsagePercent <= 0.5) return "🟡"; 
            if (ramUsagePercent > 0.5) return "🔴"; 
            if (ramUsagePercent < 0 || ramUsagePercent > 0.9) return "⚠️"; 
            return "⚠️";
        };

        const replyContainer = new ContainerBuilder()
            .setAccentColor(Colors.Blurple)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`-# RAM USAGE`),
                new TextDisplayBuilder().setContent(`-# \`${getRamEmoji(ramUsagePercent)} CURRENT: ${curUsage}\`\n-# \`🔝 AVAILABLE: ${maxMem}\``)
            )
        
        await interaction.reply({ components: [replyContainer], flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2 });
    }
};