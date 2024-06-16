const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require('fs');
const config = require("../../../config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stop a chat with a Stranger!'),
    run: async (client, interaction) => {
        user = getlists('./users.json')
        userid = interaction.user.id;
        z = 0
        for (var i = 0; i < user.length; i++) {
          if (user[i][0] === userid){
              z = i
        }}
        useraddress = z
        if (z===0){
            const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Please use /setup to setup your account first!')
            .setTimestamp()
            .setFooter({ text: 'Developed by Oreo'});
            interaction.reply({ embeds: [exampleEmbed] }) 
            return;
        } else {
                if (user[useraddress][2]) {
                    test = user[useraddress][3]
                    const exampleEmbed = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('The other person stopped the chat!')
                    .setTimestamp()
                    .setFooter({ text: 'Developed by Oreo'});
                    client.users.send(test, { embeds: [exampleEmbed] });  
                    z = 0
                    for (var i = 0; i < user.length; i++) {
                      if (user[i][0] === test){
                          z = i
                    }}
                    test = z
                    user[test][2] = false
                    user[test][3] = ""
                    user[test][4] = false
                    const serverId = config.serverid; // Replace with your server's ID
                    const guild = client.guilds.cache.get(serverId);
                    if (!guild) {
                    console.error(`Server with ID ${serverId} not found.`);
                    return;
                    }
                    let user2 = client.users.cache.get(user[useraddress][3]);
                    tsety = `${interaction.user.username}_${user2.username}`;
        
                    channel2 = guild.channels.cache.find(channel => channel.name === tsety);
                    
                    if (!channel2) {
                    tsety = `${user2.username}_${interaction.user.username}`;
                    channel2 = guild.channels.cache.find(channel => channel.name === tsety);
                    }
                    if(channel2) {
                      const exampleEmbed = new EmbedBuilder()
                      .setColor(0x0099FF)
                      .setTitle('Pair Unmatched')
                      .setTimestamp()
                      .setFooter({ text: 'Developed by Oreo'});
                      channel2.send({ embeds: [exampleEmbed] });  
                    }
                }
                user[useraddress][2] = false
                user[useraddress][3] = ""
                user[useraddress][4] = false
                const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('You have stopped the chat/search!')
                .setTimestamp()
                .setFooter({ text: 'Developed by Oreo'});
                interaction.reply({ embeds: [exampleEmbed] }) 
                setlists('./users.json', user)
        }
    }
}

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
 function setlists(FP, LI) {
    try {
        fs.writeFileSync(FP, JSON.stringify(LI, null, 2), 'utf8');
      } catch (error) {
        console.error('Error saving list data:', error);
      }
 }