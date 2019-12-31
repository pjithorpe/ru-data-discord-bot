/* eslint-disable max-nested-callbacks */
const fs = require('fs');
const path = require('path');
// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
const puppeteer = require('puppeteer');
const settings = require('../settings');
const sheet = require('../libs/sheet');
const resizeLogos = require('../table_scripts/resizeLogos');


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
                    let html = `
                    <head>
                        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
                    </head>
                    <body>
                        <div>
                            <table class="tg" id="capture">
                            <tr>
                                <th class="tg-v5nu"></th>
                                <th class="tg-0pky" colspan="2">Team</th>
                                <th class="tg-c3ow">Pld.</th>
                                <th class="tg-c3ow">W</th>
                                <th class="tg-c3ow">D</th>
                                <th class="tg-c3ow">L</th>
                                <th class="tg-c3ow">PD</th>
                                <th class="tg-c3ow">BP</th>
                                <th class="tg-c3ow">Pts.</th>
                            </tr>`;

                    rows.forEach((row, index) => {
                        // Add first column - the table positions
                        html += `
                            <tr>
                                <td class="tg-v5nu">` + (index + 1).toString() + '</td>';
                        let team = row.team.toLowerCase();
                        team = team.replace(/ /g, '_');
                        if (team in settings.team_aliases) team = settings.team_aliases[team];
                        // If the team has a logo, add it to the table
                        if (team in settings.team_logos) {
                            const logoLocation = settings.team_logos[team];
                            html += `
                                <td class="tg-c3ow">
                                    <div class="logo-container">
                                        <img class="logo-img" src="` + logoLocation + `" />
                                    </div>
                                </td>
                                <td class="tg-0pky">` + row.team + '</td>';
                        }
                        // Otherwise, just spread the team name over both fields
                        else {
                            html += `
                                <td class="tg-0pky" colspan="2">` + row.team + '</td>';
                        }

                        // Add the rest of the fields
                        html += `
                                <td class="tg-c3ow">` + row.played + `</td>
                                <td class="tg-c3ow">` + row.w + `</td>
                                <td class="tg-c3ow">` + row.d + `</td>
                                <td class="tg-c3ow">` + row.l + `</td>
                                <td class="tg-c3ow">` + row.pd + `</td>
                                <td class="tg-c3ow">` + row.bp + `</td>
                                <td class="tg-c3ow">` + row.points + `</td>
                            </tr>
                        `;
                    });

                    html +=
                        `</table>
                        </div>
                    </body>`;

                    // Create image from html and send to discord
                    return puppeteer.launch({ defaultViewport: { width: 800, height: 800 } }).then(browser => {
                        return browser.newPage().then(page => {
                            return page.setContent(html, { waitUntil: 'load', timeout: 0 }).then(() => {
                                // Apply styling
                                return page.addStyleTag({ path: 'src/table_scripts/table.css' }).then(() => {
                                    // Run javascript for resizing logos
                                    return page.evaluate(resizeLogos).then(() => {
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
                                                            fs.unlink(imgLocation, err => { console.log(err); });
                                                        });
                                                    });
                                                });
                                            }, err => { console.log(err); });
                                        });
                                    }, err => { console.log(err); });
                                });
                            });
                        });
                    });
                },
                (err) => { console.log(err); });
    },
};