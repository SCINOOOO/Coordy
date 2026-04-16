import { SlashCommandBuilder, MessageFlags, ContainerBuilder, Colors, TextDisplayBuilder } from "discord.js";

/* commands/latency.js */

export default {
    data: new SlashCommandBuilder()
        .setName("latency")
        .setDescription("Shows the current Latency of the bot, including WebSocket and API latency."),

    async execute(interaction) {
        const wsPing = interaction.client.ws.ping;

        const getPingEmoji = (ping) => {
            if (ping <= 0) return "⚠️";
            if (ping <= 200) return "🟢";
            if (ping <= 400) return "🟡";
            return "🔴";
        };

        const startTime = Date.now();
        const replyContainer = new ContainerBuilder()
            .setAccentColor(Colors.Blurple)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`Pinging...`)
            )

        await interaction.reply({ components: [replyContainer], flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2 });

        const apiPing = Date.now() - startTime;

        const editContainer = new ContainerBuilder()
            .setAccentColor(Colors.Blurple)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(`-# LATENCY`),
                new TextDisplayBuilder().setContent(`-# \`${getPingEmoji(wsPing)} WEBSOCKET: ${wsPing}ms\`\n-# \`${getPingEmoji(apiPing)} API: ${apiPing}ms\``)
            )

        await new Promise(resolve => setTimeout(resolve, 2000));

        await interaction.editReply({ components: [editContainer] });
    }
};