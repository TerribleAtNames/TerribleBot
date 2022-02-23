/* eslint-disable no-console */
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { token } from "./config.json";
import { readdirSync } from "fs";

const commands = [];
const commandFiles = readdirSync("./commands").filter(file => file.endsWith(".js"));

// Place your client and guild ids here
const clientId = "829380069109399572";
const guildId = "946070653314957372";

for (const file of commandFiles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(token);

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