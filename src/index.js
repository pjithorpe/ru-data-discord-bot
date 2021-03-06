const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');

const config = require('./config');


const client = new Discord.Client();
// Commands store
client.commands = new Discord.Collection();
// Cooldowns store
client.cooldowns = new Discord.Collection();
// Bot muted toggle
client.silence = false;


function fetchCommands(commands, directory) {
    try {
        const commandFiles = fs.readdirSync(path.join(__dirname, directory)).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            delete require.cache[require.resolve(path.join(__dirname, directory, file))];
            const command = require(path.join(__dirname, directory, file));
            commands.set(command.name, command);
        }
        return commands;
    }
    catch (e) {
        throw new Error('Failed to get command files!\n' + e);
    }
}

function handleMessage(message) {

    if (client.silence || !message.content.startsWith('!') || message.author.bot) return;

    // Remove ! and split into args
    const args = message.content.slice(1).split(/ +/);
    // Get main command and remove from start of args
    const commandName = args.shift().toLowerCase();

    // Check for command aliases
    const command = client.commands.get(commandName) || client.commands.find(c => c.aliases && c.aliases.includes(commandName));

    // If command unrecognised, exit
    if (!command || !command.enabled) return;

    // Check for missing args
    if (command.args && !args.length) {
        let reply = 'You didn\'t provide any arguments, ' + message.author + '.';

        if (command.usage) {
            reply += '\nThe proper usage would be: \'!' + command.name + ' ' + command.usage + '\'';
        }
        return message.channel.send(reply);
    }

    // Check for command cooldown
    if (!client.cooldowns.has(command.name)) {
        client.cooldowns.set(command.name, new Discord.Collection());
    }
    // Get cooldown info for this command
    const now = Date.now();
    const timestamps = client.cooldowns.get(command.name);
    const cooldownDuration = (command.cooldown || 10) * 1000;

    // Make cooldown check
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownDuration;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply('Please wait ' + timeLeft.toFixed(1) + ' more second(s) before reusing the ' + command.name + ' command.');
        }
    }

    // Add author to timestamps, and remove them after cooldown has expired
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownDuration);

    try {
        return command.execute(message, args);
    }
    catch (e) {
        console.error(e);
        return message.reply('Error in executing command.');
    }
}


client.commands = fetchCommands(client.commands, '/commands');

// Event listeners
client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    handleMessage(message);
});

client.on('error', console.error);

client.login(config.discord.bot_token);

// Export for testing purposes
module.exports = {
    client: client,
    fetchCommands,
    handleMessage,
};