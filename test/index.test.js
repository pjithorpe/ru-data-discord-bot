/* eslint-disable no-undef */
const chai = require('chai');
const Discord = require('discord.js');

const should = chai.should();

const index = require('../src/index');
describe('index', () => {
    const client = new Discord.Client();
    describe('#fetchCommands', () => {
        client.commands = new Discord.Collection();

        it('should throw an exception if the command file isn\'t found', () => {
            should.throw(() => { index.fetchCommands(client.commands, '/fake_directory'); }, /command/);
        });
    });

    describe('#handleMessage', () => {
        // pending test below
        it('should reply with error message if there is an exception.');
    });
});