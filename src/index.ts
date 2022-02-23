import { Client, Collection, CommandInteraction, Intents } from "discord.js";
import { readdirSync } from "fs";

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});
const commands: Collection<string, {name: string, execute: (interaction: CommandInteraction) => void}> = new Collection();
(async () => {
    for await (const i of readdirSync("../commands")) {
        const file = await import(`./commands/${i}`);
        commands.set(file.default.name, file.default);
    }

    client.on("interactionCreate", async interaction => {
        interaction.isCommand() ? commands.get(interaction.commandName)?.execute(interaction) : null;
    });
    client.login();
})();
