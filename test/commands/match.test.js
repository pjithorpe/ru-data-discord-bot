/* eslint-disable max-nested-callbacks */
/* eslint-disable no-undef */
/*const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Discord = require('discord.js');

chai.use(chaiAsPromised);
const should = chai.should();

const config = require('../../src/config');
const help = require('../../src/commands/match');

describe('match', () => {
    describe('#execute', () => {
        let client;
        before(function() {
            this.timeout(10000);
            client = new Discord.Client();
            return client.login(config.discord.test_bot_token);
        });

        after(function() {
            this.timeout(10000);
            return client.destroy();
        });

        it('should return the next match when no arguments are given', function() {
            this.timeout(10000);
            return client.guilds.find(g => g.id === '613663560870133780')
                .channels.find(c => c.id === '616006952308441108')
                .send('!match')
                .then((message) => {
                    message.client = client;
                    return help.execute(message).content.should.include('test1').should.include('test2');
                })
                .catch(console.error);
        });
    });
});*/