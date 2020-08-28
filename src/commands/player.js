/* eslint-disable max-nested-callbacks */
const fs = require('fs');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const puppeteer = require('puppeteer');
const settings = require('../settings');
const messageBuilder = require('../libs/messageBuilder');


module.exports = {
    name: 'player',
    aliases: ['pro', 'players'],
    description: 'Returns a bio for a player.',
    args: true,
    usage: '<firstname> <lastname>',
    cooldown: 10,
    enabled: true,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        // Get the inputted name
        if (args.length < 2 || args[0].length < 2 || args[1].length < 2) return message.reply('Please specify both first and last name. !' + this.name + ' ' + this.usage);

        const firstLower = args[0].toLowerCase();
        const lastLower = args[1].toLowerCase();
        const firstname = firstLower[0].toUpperCase() + firstLower.substring(1);
        const lastname = lastLower[0].toUpperCase() + lastLower.substring(1);
        const name = firstname + lastname;

        const url = settings.players_url + firstLower + '-' + lastLower;

        // Take screenshot of table and send to discord
        return puppeteer.launch({ defaultViewport: { width: 600, height: 2000 } }).then(browser => {
            return browser.newPage().then(page => {
                return page.goto(url, { waitUntil: 'load', timeout: 0 }).then(() => {
                    // eslint-disable-next-line no-undef
                    return page.evaluate(() => document.body.innerHTML).then(body => {

                        // regex searches
                        let regex = new RegExp('images/entities/[a-z0-9\-]*/' + name + 'rugbyplayer.jpg');
                        const imgURL = settings.players_url + body.match(regex)[0].trim();

                        regex = new RegExp('<span>[0-9]{1,2}(st|rd|th)\\s*[A-Z][a-z]{2}\\s*(19|20)[0-9]{2}</span>');
                        const dob = body.match(regex)[0].replace(/<\/?span>/g, '');

                        regex = new RegExp('[0-9].[0-9]{2}m');
                        const height = body.match(regex)[0];

                        regex = new RegExp('[0-9]{2,3}kg');
                        const weight = body.match(regex)[0];

                        const positions = [];
                        settings.positions.forEach(pos => {
                            if (body.includes(pos)) positions.push(pos);
                        });

                        return page.$$('td:nth-child(2) > b > a').then(async elements => {
                            const teams = [];
                            for (const element of elements) {
                                teams.push(await element.evaluate(el => el.textContent));
                            }
                            return browser.close().then(() => {
                                return message.reply(messageBuilder.formatPlayer(firstname, lastname, imgURL, dob, height, weight, teams, positions));
                            }, err => { console.log(err); });
                        }, err => { console.log(err); });
                    }, err => { console.log(err); });
                }, err => { console.log(err); });
            }, err => { console.log(err); });
        }, err => { console.log(err); });
    },
};