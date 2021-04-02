import { MessageEmbed } from "discord.js";
import fetch from "node-fetch";

interface Item {
  title: string;
  url: string;
  sections: Array<unknown>;
  uid: string;
}
export default {
  slash: "both",
  testOnly: false,
  guildOnly: true,
  description: "Searches the India Investments wiki",
  minArgs: 1,
  expectedArgs: "<query> [number]",
  callback: async ({ args, message }) => {
    const [query, number] = args;
    const maxNum = number || 10;
    const result = await fetch(
      `${process.env.GITBOOK_BASE_URL}/spaces/${process.env.GITBOOK_SPACE_ID}/search?query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITBOOK_TOKEN}`,
        },
      }
    );
    const resultJson = await result.json();
    const results: Item[] = resultJson["results"].slice(0, maxNum);

    const embedItems = results.reduce<string[]>((pathIndice, item, index) => {
      const entry = `${index + 1}. [${item.title}](${
        process.env.WEBSITE_BASE_URL
      }/${item.url})`;
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
