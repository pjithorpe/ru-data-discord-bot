module.exports = {
    name: 'shut-up',
    aliases: ['fuck-off', 'zip-it', 'die'],
    description: 'Temporarily disables the bot.',
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
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