import { MessageEmbed } from "discord.js";
import nfetch = require("node-fetch");
import {
  websiteBaseUrl,
  gitbookSpaceID,
  gitbookToken,
  gitbookBaseUrl,
} from "../constants";

interface Item {
  title: string;
  url: string;
  sections: Array<unknown>;
  uid: string;
}
module.exports = {
  slash: "both",
  testOnly: false,
  guildOnly: true,
  description: "Searches the II wiki",
  minArgs: 1,
  expectedArgs: "<query> [number]",
  callback: async ({ args, message }) => {
    const [query, number] = args;
    const maxNum = number || 10;
    const result = await nfetch(
      `${gitbookBaseUrl}/spaces/${gitbookSpaceID}/search?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${gitbookToken}`,
        },
      }
    ).then((res) => res.json());
    const results: Item[] = result["results"].slice(0, maxNum);

    const embedItems = results.reduce<string[]>((pathIndice, item, index) => {
      const entry = `${index + 1}. [${item.title}](${websiteBaseUrl}/${
        item.url
      })`;
      pathIndice.push(entry);
      return pathIndice;
    }, []);
    const embed = new MessageEmbed()
      .setTitle(`Results for "${query}"`)
      .setDescription(embedItems.join("\n"));

    if (message) {
      message.reply("", { embed });
    }
    return embed;
  },
};
