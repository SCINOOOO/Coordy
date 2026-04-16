import { SlashCommandBuilder, MessageFlags, ContainerBuilder, Colors, TextDisplayBuilder, ChannelType } from "discord.js";
import "dotenv/config";

export default {
    data: new SlashCommandBuilder()
        .setName("sleep")
        .setDescription("Shuts down the bot and creates a backup voice channel."),

    async execute(interaction) {
        const replyContainer = new ContainerBuilder()
            .setAccentColor(Colors.Blurple)
            .addTextDisplayComponents(
                new TextDisplayBuilder().setContent(
                    "-# Bot shutting down... Created a backup Voice Channel while the bot is asleep."
                )
            );

        if (interaction.user.id !== process.env.ADMIN_ID) {
            return interaction.reply({
                content: "You don't have permission to use this command.",
                flags: MessageFlags.Ephemeral
            });
        }

        const guild = interaction.guild;

        if (!guild) {
            return interaction.reply({
                content: "Guild not found.",
                flags: MessageFlags.Ephemeral
            });
        }

        try {
            const category = await guild.channels.fetch(process.env.TEMP_CATEGORY_ID);

            if (!category || category.type !== ChannelType.GuildCategory) {
                throw new Error("Invalid category ID");
            }

            await guild.channels.create({
                name: "Backup Voice Channel",
                type: ChannelType.GuildVoice,
                parent: category.id,
                userLimit: 99
            });

            await interaction.reply({
                components: [replyContainer],
                flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2
            });

            setTimeout(async () => {
                console.log("⛔ Bot logged out!");

            await interaction.client.destroy();

            process.exit(0);
        }, 1000);

        } catch (error) {
            console.error(error);

            await interaction.reply({
                content: "Failed to create backup voice channel.",
                flags: MessageFlags.Ephemeral
            });
        }
    }
};