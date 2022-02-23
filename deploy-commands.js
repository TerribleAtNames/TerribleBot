/* eslint-disable no-console */
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import "dotenv/config";
import { readdirSync } from "fs";

const commands = [];
const commandFiles = readdirSync("./commands").filter(file => file.endsWith(".js"));

// Place your client and guild ids here
const clientId = "946070653314957372";
const guildId = "829380069109399572";

for (const file of commandFiles) {
    const command = await import(`./commands/${file}`);
    commands.push(command.default.data.toJSON());
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