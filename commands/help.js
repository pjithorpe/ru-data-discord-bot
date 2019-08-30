module.exports = {
    name: 'help',
    aliases: ['helpme', 'commands', 'assist'],
    description: 'Displays help for interacting with the bot.',
    cooldown: 20,
    args: false,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        message.reply('Not implemented.');
    },
};