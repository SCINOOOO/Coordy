import { ChannelType, Colors, ContainerBuilder, MessageFlags, PermissionsBitField, SeparatorBuilder, SeparatorSpacingSize, TextDisplayBuilder } from "discord.js";
import client from "./client.js";
import 'dotenv/config';

async function clearTempChannelsOnStartup() {
    const guild = await client.guilds.fetch(process.env.GUILD_ID);
    const category = await guild.channels.fetch(process.env.TEMP_CATEGORY_ID);

    if (!category || category.type !== ChannelType.GuildCategory) return;

    const channels = category.children.cache;

    for (const channel of channels.values()) {
        if (
            channel.type === ChannelType.GuildVoice &&
            channel.id !== process.env.TEMP_CREATOR_ID &&
            channel.members.size === 0
        ) {
            await channel.delete().catch(() => {});
            console.log(`🔊 Deleted Channel: "${channel.name}"(${channel.id})`);
        }
    }
}

async function createTempChannel(oldState, newState) {
    if (
        newState.channelId !== process.env.TEMP_CREATOR_ID ||
        oldState.channelId === process.env.TEMP_CREATOR_ID
    ) return;

    const member = newState.member;
    if (!member) return;

    const guild = await client.guilds.fetch(process.env.GUILD_ID);

    const channel = await guild.channels.create({
        name: `${member.displayName}'s Channel`,
        type: ChannelType.GuildVoice,
        parent: process.env.TEMP_CATEGORY_ID,
        userLimit: 2,
        permissionOverwrites: [
            {
                id: member.id,
                allow: [
                    PermissionsBitField.Flags.ManageChannels,
                    PermissionsBitField.Flags.MoveMembers,
                    PermissionsBitField.Flags.ManageRoles
                ],
            }
        ]
    });

    await member.voice.setChannel(channel);

    const replyContainer = new ContainerBuilder()
        .setAccentColor(Colors.Blurple)
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`-# TEMPORARY VOICE CHANNEL`)
        )
        .addSeparatorComponents(
            new SeparatorBuilder()
            .setSpacing(SeparatorSpacingSize.Small)
            .setDivider(true)
        )
        .addTextDisplayComponents(
            new TextDisplayBuilder().setContent(`-# Welcome to your temporary voice channel, <@${member.id}>!\n-# You can edit the channel name, limit and permissions in the channel settings.\n-# This channel will be automatically deleted when it's empty.`)
        )


    await channel.send({ components: [replyContainer], flags: MessageFlags.Ephemeral | MessageFlags.IsComponentsV2 });

    console.log(`🔊 Created Channel: "${channel.name}"(${channel.id}) for ${member.displayName}(${member.user.id})`);

    return channel;
}

async function deleteTempChannel(oldState) {
    if (!oldState.channelId) return;

    const channel = oldState.guild.channels.cache.get(oldState.channelId);

    if (
        channel &&
        channel.type === ChannelType.GuildVoice &&
        channel.parentId === process.env.TEMP_CATEGORY_ID &&
        channel.id !== process.env.TEMP_CREATOR_ID &&
        channel.members.size === 0
    ) {
        await channel.delete().catch(() => {});
        console.log(`🔊 Deleted Channel: "${channel.name}"(${channel.id})`);
    }
}

export { clearTempChannelsOnStartup, createTempChannel, deleteTempChannel };