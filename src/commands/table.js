/* eslint-disable max-nested-callbacks */
const fs = require('fs');
const path = require('path');
const Discord = require('discord.js');
const puppeteer = require('puppeteer');
const settings = require('../settings');
const sheet = require('../libs/sheet');


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
        let tableID;
        let groupIndex;
        // Get the inputted tournament
        let competition = args[0].toLowerCase();
        // Check if input is an alias
        if(competition in settings.competition_aliases) competition = settings.competition_aliases[competition];
        else return message.reply('No table found for competition \'' + competition + '\'.');

        // Get the worksheet indexes of the tables for groups in this competition
        const competitionTableIDs = settings.competition_table_mapping[competition];

        // Get the group number (if inputted), otherwise default to the first group
        if (args.length === 2 && args[1].length === 1) {
            const groupArg = args[1].toLowerCase();
            if (groupArg === '1' || groupArg === 'a') groupIndex = 0;
            else if (groupArg === '2' || groupArg === 'b') groupIndex = 1;
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

        // Get the worksheet index for the specified group number
        if (groupIndex < competitionTableIDs.length) tableID = competitionTableIDs[groupIndex];
        else return message.reply('No table found for group \'' + groupIndex.toString() + '\'.');

        // Table padding
        const padding = 0;
        // Get google sheet
        return sheet.getTable(tableID)
            .then(
                (result) => {
                    const rows = result;

                    // Create table html from sheet rows
                    let html =
                    `<style type="text/css">
                    .tg  {border-collapse:collapse;border-spacing:0;}
                    .tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
                    .tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
                    .tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
                    .tg .tg-0lax{text-align:left;vertical-align:top}
                    </style>
                    <div id="capture">
                        <table class="tg">
                        <tr>
                            <th class="tg-0pky">Team</th>
                            <th class="tg-0pky">Played</th>
                            <th class="tg-0pky">W</th>
                            <th class="tg-0pky">D</th>
                            <th class="tg-0pky">L</th>
                            <th class="tg-0lax">PD</th>
                            <th class="tg-0lax">BP</th>
                            <th class="tg-0lax">Points</th>
                        </tr>
                    `;

                    rows.forEach(row => {
                        html +=
                        `<tr>
                            <td class="tg-0pky">` + row.team + `</td>
                            <td class="tg-0pky">` + row.played + `</td>
                            <td class="tg-0pky">` + row.w + `</td>
                            <td class="tg-0pky">` + row.d + `</td>
                            <td class="tg-0pky">` + row.l + `</td>
                            <td class="tg-0lax">` + row.pd + `</td>
                            <td class="tg-0lax">` + row.bp + `</td>
                            <td class="tg-0lax">` + row.points + `</td>
                        </tr>
                        `;
                    });

                    html +=
                    `</table>
                    </div>`;

                    // Create image from html and send to discord
                    return puppeteer.launch().then(browser => {
                        return browser.newPage().then(page => {
                            return page.setContent(html).then(() => {
                                return page.evaluate(async () => {
                                    return page.$('#capture').then(element => {
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
                                                        return fs.unlink(imgLocation);
                                                    });
                                                });
                                            });
                                        }, err => { console.log(err); });
                                    });
                                });
                            });
                        });
                    });
                },
                (err) => {
                    console.log(err);
                }
            );
    },
};