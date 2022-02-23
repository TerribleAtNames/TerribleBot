/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
require("dotenv/config");
const { readdirSync } = require("fs");

const commands = [];
const commandFiles = readdirSync("./commands").filter(file => file.endsWith(".js"));

// Place your client and guild ids here
const clientId = "946070653314957372";
const guildId = "829380069109399572";

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log("Started refreshing application (/) commands.");

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log("Successfully reloaded application (/) commands.");
    } catch (error) {
        console.error(error);
    }
})();