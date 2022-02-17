import { Client, Intents } from "discord.js"; 
import config from "dotenv";
config.config();
const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
});

client.login();