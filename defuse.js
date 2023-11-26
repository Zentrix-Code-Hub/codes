.// DiscordBot/Commands/Games/defuse.js

// *Dependencies:
//  node, npm, discord.js, ms

const {
    Client,
    ChatInputCommandInteraction,
    EmbedBuilder,
    SlashCommandBuilder,
    PermissionsBitField,
} = require('discord.js');
const ms = require('ms');

const command = new SlashCommandBuilder()
    .setName('defuse')
    .setDescription('Defuse the bomb.')
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator)
    .addStringOption((option) =>
        option.setName('wire').setDescription('Provide the wire you would like to cut.').setRequired(true),
    );

// Add a custom 'variables' property to the command
command.path = 'Games/defuse.js';
command.developer = false;
command.cooldown = ms('5m');

module.exports = {
    data: command,

    /**
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    execute(interaction, client) {
        const sender = interaction.user.username;
        const args = interaction.options.getString('wire');

        const wires = ['blue', 'red', 'green', 'yellow', 'white'];
        const randomWire = wires[Math.floor(Math.random() * wires.length)];

        const cost = 10;
        const amount = cost * 2;
        const winnings = `${amount} points`;
        const losings = `${cost} points`;

        if (!args) {
            interaction.reply(
                `Defuse the bomb! Cut the correct wire, and you'll be showered in $2 and praise! Cut the wrong wire, and you lose $2. Type !defuse and one of the following colors to play: blue, red, green, yellow or white.`,
            );
        } else if (wires.includes(args.toLowerCase())) {
            interaction.reply(`${sender} is attempting to defuse the bomb by cutting the ${args} wire.`);
            setTimeout(() => {
                if (args.toLowerCase() === randomWire) {
                    interaction.editReply(
                        `You cut the correct wire and defused the bomb in time! and received ${winnings} as a reward!`,
                    );
                    // Handle adding points to the user here.
                } else {
                    interaction.editReply(`You cut the wrong wire and the bomb went KAPOW and you lost ${losings}.`);
                }
            }, ms('5s'));
        } else {
            interaction.reply(`You seem to be color blind, there is no wire of that color!.`);
        }
    },
};
