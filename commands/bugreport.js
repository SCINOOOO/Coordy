import { SlashCommandBuilder, MessageFlags, ContainerBuilder, Colors, TextDisplayBuilder, ButtonStyle, ButtonBuilder, SectionBuilder } from "discord.js";

/* commands/bugreport.js */

export default {
    data: new SlashCommandBuilder()
        .setName("bugreport")
        .setDescription("Report a bug you found in the bot to the developer."),

    async execute(interaction) {
        const replyContainer = new ContainerBuilder()
            .setAccentColor(Colors.Blurple)
            .addSectionComponents(
                new SectionBuilder()
                    .setButtonAccessory(
                        new ButtonBuilder()
                            .setStyle(ButtonStyle.Link)
                            .setLabel("Report Bug")
                            .setURL("https://www.youtube.com/watch?v=y9PsBSY5uRA")
                    )
                    .addTextDisplayComponents(
                        new TextDisplayBuilder().setContent("-# FOUND A BUG?")
                    )
            )

        await interaction.reply({ components: [replyContainer], flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2 });
    }
};