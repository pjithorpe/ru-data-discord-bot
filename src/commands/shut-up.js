const settings = require('../settings');

module.exports = {
    name: 'shut-up',
    aliases: ['fuck-off', 'zip-it', 'die'],
    description: 'Temporarily disables the bot.',
    args: false,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        // If not a mod, exit
        if (message.member == null || !message.member.roles.size || !message.member.roles.some(r => r.name === settings.admin_role)) {
            return message.reply('You don\'t have the permission to use that command.');
        }

        // Default duration 1 minute
        let duration = 60000;
        if(args.length) {
            // Convert minutes to ms
            duration = parseInt(args[0], 10) * 60000;
        }

        message.client.silence = true;
        setTimeout(() => { message.client.silence = false; }, duration);
        return message.reply('Okay, I\'ll be quiet for a little while 😔.');
    },
};