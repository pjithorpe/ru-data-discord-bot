/* eslint-disable no-undef */
const chai = require('chai');
const Discord = require('discord.js');

const should = chai.should();

const index = require('../src/index');
describe('index', () => {
    const client = new Discord.Client();
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
        // pending test below
        it('should reply with error message if there is an exception.');
    });
});