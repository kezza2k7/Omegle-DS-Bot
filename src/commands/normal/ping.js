const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const fs = require('fs');
const config = require("../../../config.js");
const { Collection } = require('@discordjs/collection');

module.exports = {
    name: "ping",
    aliases: ["pong"],
    cooldown: 500,
    run: async (client, message, args) => {
      user = getlists('./users.json')
      userid = message.author.id;
      z = 0
      for (var i = 0; i < user.length; i++) {
        if (user[i][0] === userid){
            z = i
      }}

      if (z===0) {
        const exampleEmbed = new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Please use /setup to setup your account first!')
        .setTimestamp()
        .setFooter({ text: 'Developed by Oreo'});
        message.reply({ embeds: [exampleEmbed] })
      } else {
        if (!user[z][2]){
          const exampleEmbed = new EmbedBuilder()
          .setColor(0x0099FF)
          .setTitle('Please use /start first!')
          .setTimestamp()
          .setFooter({ text: 'Developed by Oreo'});
          message.reply({ embeds: [exampleEmbed] })
        } else {
          data = message
          if ('attachments' in data) {
            start2 = message.content
            end = ""
            this.attachments = new Collection();
            if (data.attachments) {
              for (const attachment of data.attachments) {
                end = attachment[1].url
              }
            }
            client.users.send(user[z][3], `Stranger: ${start2} ${end}`);
          } else {
            client.users.send(user[z][3], `Stranger: ${message.content}`);
          }
          if (config.cagatoryid != ""){
            const guild = client.guilds.cache.get(config.serverid);
            let user2 = client.users.cache.get(user[z][3]);

            tsety = `${message.author.username}_${user2.username}`;

            channel = guild.channels.cache.find(channel => channel.name === tsety);
            
            if (!channel) {
              tsety = `${user2.username}_${message.author.username}`;
              channel = guild.channels.cache.find(channel => channel.name === tsety);
            }
            if (data.attachments.size > 0) {
              await channel.send(`${message.author.username} : ${start2} and attachments: ${end}`)
            } else {
              await channel.send(`${message.author.username} : ${message.content}`)
            }
          }
        }
      }
    }
 };

 function getlists(FP) {
  // Load existing list data
  let listData = [];
  try {
  const fileData = fs.readFileSync(FP, 'utf8');
  listData = JSON.parse(fileData);
  } catch (error) {
  console.error('Error loading list data:', error);
  }
  return listData
}