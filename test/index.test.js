/* eslint-disable max-nested-callbacks */
/* eslint-disable no-undef */
const chai = require('chai');
const Discord = require('discord.js');

const should = chai.should();

const config = require('../src/config');
const index = require('../src/index');
let client;

describe('index', () => {
    before(() => {
        client = new Discord.Client();
    });

    describe('#fetchCommands', () => {
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
        it('should ignore unrecognised commands.', () => {
            setTimeout(() => {
                client.login(config.discord.test_bot_token)
                    .then(() => {
                        client.commands = new Discord.Collection();
                        client.cooldowns = new Discord.Collection();
                        client.silence = false;

                        client.commands.set(
                            'test',
                            {
                                name: 'test',
                                aliases: ['testing', 'test_command'],
                                description: 'A test command',
                                args: false,
                                execute(message, args) {},
                            }
                        );
                    })
                    .then(() => {
                        // Get specific test channel on dev server
                        client.guilds.find('id', '613663560870133780')
                            .channels.find('id', '616006952308441108')
                            .send('!nonsense_command')
                            .then((message) => {
                                message.author.bot = false;
                                index.handleMessage(message).should.be.null;
                            });
                    });
            }, 5000);
        });

        it('should send a usage assistance message when required arguments aren\'t provided.', () => {
            setTimeout(() => {
                client.login(config.discord.test_bot_token)
                    .then(() => {
                        client.commands = new Discord.Collection();
                        client.cooldowns = new Discord.Collection();
                        client.silence = false;

                        client.commands.set(
                            'test2',
                            {
                                name: 'test2',
                                aliases: ['testing2', 'test_command2'],
                                description: 'A test command with arguments',
                                args: true,
                                usage: 'arg1',
                                execute(message, args) {},
                            }
                        );
                    })
                    .then(() => {
                        // Get specific test channel on dev server
                        client.guilds.find('id', '613663560870133780')
                            .channels.find('id', '616006952308441108')
                            .send('!test2')
                            .then((message) => {
                                message.author.bot = false;
                                index.handleMessage(message)
                                    .then((replyMsg) => {
                                        replyMsg.content.should.include('usage').and.include('test2').and.include('arg1');
                                    });
                            });
                    });
            }, 5000);
        });

        it('should send an error message when a command causes an exception.', () => {
            setTimeout(() => {
                client.login(config.discord.test_bot_token)
                    .then(() => {
                        client.commands = new Discord.Collection();
                        client.cooldowns = new Discord.Collection();
                        client.silence = false;

                        client.commands.set(
                            'test3',
                            {
                                name: 'test3',
                                aliases: ['testing3', 'test_command3'],
                                description: 'A test command that throws an error',
                                args: false,
                                execute(message, args) { throw new Error(); },
                            }
                        );
                    })
                    .then(() => {
                        // Get specific test channel on dev server
                        client.guilds.find('id', '613663560870133780')
                            .channels.find('id', '616006952308441108')
                            .send('!test3')
                            .then((message) => {
                                message.author.bot = false;
                                index.handleMessage(message)
                                    .then((replyMsg) => {
                                        replyMsg.content.should.include('Error in executing command');
                                    });
                            });
                    });
            }, 5000);
        });
    });
});