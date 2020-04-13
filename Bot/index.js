const fs = require("fs");

const express = require('express')

const Discord = require("discord.js");

const {
	prefix,
    token,
    port
} = require("../config.json");

const app = express()

const client = new Discord.Client();
client.commands = new Discord.Collection();

// For all Discord commands
const commandFiles = fs
	.readdirSync("./commands")
	.filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// Web API Setup / Express

// Read all routes from files
const routeFiles = fs
	.readdirSync("./routes")
	.filter((file) => file.endsWith(".js"));

for (const file of routeFiles) {
    const routeFile = require(`./routes/${file}`);
    
	app.all(routeFile.route, function(req, res){
        if(routeFile.type !== req.method){
            res.send("Wrong Request type")
            return;
        }

        // Then execute from file
        routeFile.execute(req, res, client);
    })
}



// DiscordJS Setup
client.once("ready", () => {
	console.log("Ready!");
    
    // Serve Express
    app.listen(port, () => console.log(`API listening at http://localhost:${port}`))
});

client.on("message", (message) => {
	//console.log(message);
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply("there was an error trying to execute that command!");
	}
});

client.login(token);
