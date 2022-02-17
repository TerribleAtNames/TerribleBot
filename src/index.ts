const { Client, Intents } = require("discord.js") // install discord.js
const client = new Client({
    intents: [Intents.FLAGS.GUILDS]
})

client.login()