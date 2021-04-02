import { Client } from "discord.js";
import WOKCommands = require("wokcommands");
import { discordToken } from "./constants";
const client = new Client();

client.on("ready", () => {
  const messagesPath = "";

  const disabledDefaultCommands = [
    "help",
    "command",
    "language",
    "prefix",
    "requiredrole",
  ];
  new WOKCommands(client, {
    commandsDir: "commands",
    messagesPath,
    showWarns: true,
    del: -1,
    ignoreBots: true,
    disabledDefaultCommands,
    // testServers: ["806189763639902238"],
  })
    .setDefaultPrefix("!!")
    .setColor(0xff0000);
});

client.login(discordToken);
