/* eslint-disable max-nested-callbacks */
const fs = require('fs');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const puppeteer = require('puppeteer');
const settings = require('../settings');


module.exports = {
    name: 'table',
    aliases: ['league-table', 'tables'],
    description: 'Returns table for a given tournament.',
    args: true,
    usage: '<tournament> <?group|conference>',
    cooldown: 10,
    enabled: true,
    // eslint-disable-next-line no-unused-vars
    execute(message, args) {
        let groupIndex;
        // Get the inputted tournament
        let competition = args[0].toLowerCase();
        // Check if input is an alias
        if(competition in settings.competition_aliases) competition = settings.competition_aliases[competition];
        else return message.reply('No table found for competition \'' + competition + '\'.');

        // Get the number of groups in this competition
        const competitionPoolCount = settings.competition_pool_count[competition];

        // Get the group number (if inputted), otherwise default to the first group
        if (args.length === 2 && args[1].length === 1) {
            const groupArg = args[1].toLowerCase();
            if (groupArg === '1' || groupArg === 'a' || groupArg === 'n') groupIndex = 0;
            else if (groupArg === '2' || groupArg === 'b' || groupArg === 's') groupIndex = 1;
            else if (groupArg === '3' || groupArg === 'c') groupIndex = 2;
            else if (groupArg === '4' || groupArg === 'd') groupIndex = 3;
            else if (groupArg === '5' || groupArg === 'e') groupIndex = 4;
            else if (groupArg === '6' || groupArg === 'f') groupIndex = 5;
            else if (groupArg === '7' || groupArg === 'g') groupIndex = 6;
            else if (groupArg === '8' || groupArg === 'h') groupIndex = 7;
        }
        else {
            groupIndex = 0;
        }

        // Check group input is in range
        if (groupIndex < 0 || groupIndex >= competitionPoolCount) return message.reply('No table found for group \'' + groupIndex.toString() + '\'.');

        const padding = settings.table_padding;
        const url = settings.tables_url + settings.competition_table_names[competition];
        const regex = /data-reactid="(.*?)"/;

        // Take screenshot of table and send to discord
        return puppeteer.launch({ defaultViewport: { width: 600, height: 2000 } }).then(browser => {
            return browser.newPage().then(page => {
                return page.goto(url, { waitUntil: 'load', timeout: 0 }).then(() => {
                    // eslint-disable-next-line no-undef
                    return page.evaluate(() => document.body.innerHTML).then(body => {

                        // regex search for the constantly changing react id
                        const match = body.match(regex)[0].trim();
                        const idClass = match.substring(14, match.length - 1);

                        // select the table using the react component id
                        const dataReactID = idClass + '.2.0.0.0.0.$' + groupIndex.toString();

                        return page.$('[data-reactid=\'' + dataReactID + '\']').then(element => {
                            return element.boundingBox().then(box => {
                                const imgLocation = path.resolve(__dirname, 'img.png');
                                return page.screenshot({
                                    path: imgLocation,
                                    clip: {
                                        x: box.x - padding,
                                        y: box.y - padding,
                                        width: box.width + padding * 2,
                                        height: box.height + padding * 2,
                                    },
                                }).then(() => {
                                    // send table image to channel
                                    return message.channel.send({
                                        files: [{
                                            attachment: imgLocation,
                                            name: 'img.png',
                                        }],
                                    }).then(() => {
                                        // close temp browser
                                        return browser.close().then(() => {
                                            // delete temporary image file
                                            fs.unlink(imgLocation, err => { console.log(err); });
                                        }, err => { console.log(err); });
                                    }, err => { console.log(err); });
                                }, err => { console.log(err); });
                            }, err => { console.log(err); });
                        }, err => { console.log(err); });
                    }, err => { console.log(err); });
                }, err => { console.log(err); });
            }, err => { console.log(err); });
        }, err => { console.log(err); });
    },
};