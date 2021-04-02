import { Client } from "discord.js";
import WOKCommands from "wokcommands";
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
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
  })
    .setDefaultPrefix("!!")
    .setColor(0xff0000);
});

client.login(process.env.DISCORD_TOKEN);
