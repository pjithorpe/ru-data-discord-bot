/* eslint-disable max-nested-callbacks */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Discord = require('discord.js');

chai.use(chaiAsPromised);
const should = chai.should();

const config = require('../src/config');
const index = require('../src/index');

describe('index', () => {
    let client;

    describe('#fetchCommands', () => {
        before(() => {
            client = new Discord.Client();
        });

        beforeEach(() => {
            client.commands = new Discord.Collection();
        });

        it('should throw an exception if the command file isn\'t found', () => {
            should.throw(() => { index.fetchCommands(client.commands, '/fake_directory'); }, /command/);
        });

        it('should return a collection of command names and command objects', () => {
            client.commands = index.fetchCommands(client.commands, '/commands');
            client.commands.should.be.an.instanceof(Discord.Collection);
            client.commands.firstKey().should.be.a('string');
            client.commands.first().should.be.an('object');
        });
    });

    describe('#handleMessage', () => {
        before(function() {
            this.timeout(10000);
            client = index.client;
            return client.login(config.discord.test_bot_token);
        });

        after(function() {
            this.timeout(10000);
            return client.destroy();
        });

        it('should ignore unrecognised commands', function() {
            this.timeout(10000);
            client.commands.set(
                'test',
                {
                    name: 'test',
                    aliases: ['testing', 'test_command'],
                    description: 'A test command',
                    args: false,
                    execute(message, args) {},
                },
            );

            // Get specific test channel on dev server
            return client.guilds.find(g => g.id === '613663560870133780')
                .channels.find(c => c.id === '616006952308441108')
                .send('!nonsense_command')
                .then((message) => {
                    message.author = new Discord.User();
                    message.author.id = '1234';
                    message.author.bot = false;
                    return should.equal(index.handleMessage(message), undefined);
                });
        });

        it('should send a usage assistance message when required arguments aren\'t provided', function() {
            this.timeout(10000);
            client.commands.set(
                'test2',
                {
                    name: 'test2',
                    aliases: ['testing2', 'test_command2'],
                    description: 'A test command with arguments',
                    args: true,
                    usage: 'arg1',
                    execute(message, args) {},
                },
            );

            // Get specific test channel on dev server
            return client.guilds.find(g => g.id === '613663560870133780')
                .channels.find(c => c.id === '616006952308441108')
                .send('!test2')
                .then((message) => {
                    message.author = new Discord.User();
                    message.author.id = '1234';
                    message.author.bot = false;
                    return index.handleMessage(message)
                        .then((replyMsg) => {
                            return replyMsg.content.should.include('usage').and.include('test2').and.include('arg1');
                        });
                });
        });

        it('should send an "error" message when a command causes an exception', function() {
            this.timeout(10000);
            client.commands.set(
                'test3',
                {
                    name: 'test3',
                    aliases: ['testing3', 'test_command3'],
                    description: 'A test command that throws an error',
                    args: false,
                    execute(message, args) { throw new Error(); },
                },
            );

            // Get specific test channel on dev server
            return client.guilds.find(g => g.id === '613663560870133780')
                .channels.find(c => c.id === '616006952308441108')
                .send('!test3')
                .then((message) => {
                    message.author = new Discord.User();
                    message.author.id = '1234';
                    message.author.bot = false;
                    return index.handleMessage(message)
                        .then((replyMsg) => {
                            return replyMsg.content.toLowerCase().should.include('error');
                        });
                });
        });

        it('should send a "please wait" message when a command is used while it\'s on cooldown', function() {
            this.timeout(10000);
            client.commands.set(
                'test4',
                {
                    name: 'test4',
                    aliases: ['testing4', 'test_command4'],
                    description: 'A test command with a 5 second cooldown',
                    args: false,
                    cooldown: 5,
                    execute(message, args) { return message.reply('Responding to test4.'); },
                },
            );

            // Get specific test channel on dev server
            return client.guilds.find(g => g.id === '613663560870133780')
                .channels.find(c => c.id === '616006952308441108')
                .send('!test4')
                .then((message) => {
                    message.author = new Discord.User();
                    message.author.id = '1234';
                    message.author.bot = false;
                    return index.handleMessage(message)
                        .then(() => {
                            return index.handleMessage(message)
                                .then((replyMsg) => {
                                    return replyMsg.content.toLowerCase().should.include('please').and.include('wait');
                                });
                        });
                });
        });
    });
});