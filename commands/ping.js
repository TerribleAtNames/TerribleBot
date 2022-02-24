// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Receive \"Pong!\" back"),
    async execute(interaction) {
        interaction.reply("Pong!");
    }
};