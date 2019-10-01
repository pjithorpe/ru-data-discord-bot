/* eslint-disable max-nested-callbacks */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Discord = require('discord.js');

chai.use(chaiAsPromised);
const should = chai.should();

const config = require('../../src/config');
const help = require('../../src/commands/help');

describe('help', () => {
    describe('#execute', () => {
        let client;
        before(() => {
            client = new Discord.Client();
            client.commands = new Discord.Collection();
            client.commands.set(
                'test1',
                {
                    name: 'test1',
                    aliases: ['testing1', 'test_command1'],
                    description: 'A test command',
                    args: false,
                    execute(message, args) {},
                }
            );
            client.commands.set(
                'test2',
                {
                    name: 'test2',
                    aliases: ['testing2', 'test_command2'],
                    description: 'A test command',
                    args: false,
                    execute(message, args) {},
                }
            );
            return client.login(config.discord.test_bot_token);
        });

        after(() => {
            return client.destroy();
        });

        it('should reply with a DM with a list of commands when no arguments are given', () => {
            return client.guilds.find(g => g.id === '613663560870133780')
                .channels.find(c => c.id === '616006952308441108')
                .send('!help')
                .then((message) => {
                    message.client = client;
                    return help.execute(message).content.should.include('test1').should.include('test2');
                })
                .catch(console.error);
        });
    });
});