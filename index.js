const { Client, GatewayIntentBits, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const config = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ],
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('guildMemberAdd', async (member) => {
    const channel = member.guild.channels.cache.get(config.verificationChannelId);
    if (!channel || channel.type !== 'GUILD_TEXT') return;

    // Remover mensagens antigas do bot
    const fetchedMessages = await channel.messages.fetch({ limit: 10 });
    fetchedMessages.forEach(msg => {
        if (msg.author.id === client.user.id) msg.delete();
    });

    const embed = new EmbedBuilder()
        .setTitle('🔒 **Verificação Necessária**')
        .setDescription(
            `👋 **Bem-vindo(a) ao nosso servidor!**\n\n` +
            `Para garantir a segurança da nossa comunidade e melhorar a experiência de todos, precisamos que você se verifique.\n\n` +
            `**Como proceder?**\n` +
            `- Clique no botão abaixo para iniciar o processo de verificação.\n` +
            `- Você será redirecionado para um site onde poderá autorizar sua conta do Discord e receber o acesso completo ao servidor!`
        )
        .setColor('#00BFFF')
        .setThumbnail('https://example.com/icone_de_verificacao.png')
        .setFooter({ text: 'Estamos felizes em tê-lo(a) aqui! 😊', iconURL: 'https://example.com/icone_de_footer.png' })
        .setTimestamp();

    const button = new ButtonBuilder()
        .setLabel('Verificar Agora')
        .setStyle(ButtonStyle.Link)
        .setURL(`https://discord.com/oauth2/authorize?client_id=${config.clientId}&response_type=code&redirect_uri=${encodeURIComponent(config.redirectUri)}&scope=identify%20guilds.join`);

    const row = new ActionRowBuilder().addComponents(button);

    try {
        await channel.send({ embeds: [embed], components: [row] });
        console.log('Mensagem de verificação enviada com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar a mensagem de verificação:', error);
    }
});

client.login(config.token);
