const fs = require('fs');
const Discord = require('discord.js');

const config = require('./config');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    delete require.cache[require.resolve('./commands/' + file)];
    const command = require('./commands/' + file);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    if (!message.content.startsWith('!') || message.author.bot) return;

    // Remove ! and split into args
    const args = message.content.slice(1).split(/ +/);
    // Get main command and remove from start of args
    const command = args.shift().toLowerCase();

    // If command not found, exit
    if (!client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(message, args);
    }
    catch (e) {
        console.error(e);
        message.reply('Error in executing command.');
    }
    return;
});

client.login(config.discord.bot_token);