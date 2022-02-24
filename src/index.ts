import { Client, Collection, Intents, CommandInteraction } from "discord.js";
import { readdirSync } from "fs";
import "dotenv/config";
import { SlashCommandBuilder } from "@discordjs/builders";

declare interface Command {
    data: SlashCommandBuilder
    execute: (interaction: CommandInteraction) => Promise<void>
}

const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});
const commands: Collection<string, Command> = new Collection();
(async () => {
    for await (const i of readdirSync("../commands")) {
        const file: Command = await import(`../commands/${i}`);
        commands.set(file.data.name, file);
    }


    client.on("interactionCreate", async interaction => {
        interaction.isCommand() ? commands.get(interaction.commandName)?.execute(interaction) : null;
    });
    client.login();
})();
