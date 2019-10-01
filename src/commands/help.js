module.exports = {
    name: 'help',
    aliases: ['helpme', 'commands', 'assist'],
    description: 'Displays help for interacting with the bot.',
    cooldown: 20,
    args: false,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        const response = [];
        const commands = message.client.commands;

        if (!args.length) {
            // General response
            response.push('Commands: ');
            response.push(commands.map(c => c.name).join(', '));
            response.push('\n!help [command name] for more info.');
        }
        else {
            // Specific command response
            const name = args[0].toLowerCase();
            const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

            if (!command) return message.reply('Unrecognised command.');

            response.push('Name: ' + command.name);
            if (command.aliases) response.push('Aliases: ' + command.aliases.join(', '));
            if (command.description) response.push('Description: ' + command.description);
            if (command.usage) response.push('Usage: !' + command.name + ' ' + command.usage);
            response.push('Cooldown: ' + (command.cooldown || 3) + ' second(s)');
        }

        return message.author.send(response, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
                return message.reply('I\'ve sent you a DM with help info.');
            })
            .catch((err) => {
                console.error('Could not send help DM to ' + message.author.tag + '.\n', err);
                return message.reply('I can\'t DM you! Do you have DMs disabled?');
            });
    },
};