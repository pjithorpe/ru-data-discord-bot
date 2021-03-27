const settings = require('../settings');
const cp = require('child_process');

module.exports = {
    name: 'restart',
    aliases: ['reboot', 'reset'],
    description: 'Restarts the bot in a new process and kills the current process.',
    cooldown: 600,
    args: false,
    enabled: true,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        // If not a mod, exit
        if (message.member == null || !message.member.roles.size || !message.member.roles.some(r => r.name === settings.admin_role)) {
            return message.reply('You don\'t have the permission to use that command.');
        }

        // start up a new bot
        return message.reply('Launching new client process...')
            .then(() => {
                console.log('Creating new process...');
                const newProcess = cp.spawn(process.argv0, ['index'], {
                    detached: true,
                    shell: true,
                    stdio: 'inherit',
                });
                newProcess.unref();
                console.log('Launched new detached process.');

                // kill this bot
                return message.reply('Closing current client process...')
                    .then(() => {
                        console.log('Exiting current process...');
                        process.exit();
                    });
            });
    },
};