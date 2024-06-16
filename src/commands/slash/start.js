const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require('fs');
const Discord = require("discord.js");
const config = require("../../../config.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('start')
    .setDescription('Start a chat with a Stranger!'),
    run: async (client, interaction) => {
        user = getlists('./users.json')
        userid = interaction.user.id;
        z = 0
        for (var i = 0; i < user.length; i++) {
          if (user[i][0] === userid){
              z = i
        }}
        useraddress = z
        if (user[useraddress][2]){
            const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Please use /stop first')
            .setTimestamp()
            .setFooter({ text: 'Developed by Oreo'});
            interaction.reply({ embeds: [exampleEmbed] }) 
            return;
        } else{
        if (z===0){
            const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Please use /setup to setup your account first!')
            .setTimestamp()
            .setFooter({ text: 'Developed by Oreo'});
            interaction.reply({ embeds: [exampleEmbed] }) 
            return;
        } else {
            agemax=5
            wwork = false
            for (var i = 0; i < agemax; i++) {
                work = lookforage(user, (user[useraddress][1]-i), useraddress)
                if(work){
                    agemax = i
                    wwork = work
                } else {
                    work = lookforage(user, (user[useraddress][1]+i), useraddress)
                    if(work){
                        agemax = i
                        wwork = work
                    }
                }
            }
            work = wwork
            if (!work){
                const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Users not found!')
                .setDescription(`Sorry There is no one else online!\nPlease wait patiently for someone to become online!\nUse /stop to stop actively searching for a partner.`)
                .setTimestamp()
                .setFooter({ text: 'Developed by Oreo'});
                interaction.reply({ embeds: [exampleEmbed] }) 
                user[useraddress][2] = false
                user[useraddress][3] = ""
                user[useraddress][4] = true
                setlists('./users.json', user)
            }
            
            if (work) {
                user[useraddress][2] = true
                user[useraddress][3] = work
                user[useraddress][4] = false
                z = 0
                for (var i = 0; i < user.length; i++) {
                  if (user[i][0] === work){
                      z = i
                }}
                otherpersonaddress = z
                user[otherpersonaddress][2] = true
                user[otherpersonaddress][3] = userid
                user[otherpersonaddress][4] = false
                const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Pair Found!')
                .setDescription(`They are ${user[otherpersonaddress][1]} Years old.\nThere pronouns are ${user[otherpersonaddress][5]}`)
                .setTimestamp()
                .setFooter({ text: 'Developed by Oreo'});
                interaction.reply({ embeds: [exampleEmbed] }) 
                const exampleEmbed2 = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Pair Found!')
                .setDescription(`They are ${user[useraddress][1]} Years old.\nThere pronouns are ${user[useraddress][5]}`)
                .setTimestamp()
                .setFooter({ text: 'Developed by Oreo'});
                client.users.send(work, { embeds: [exampleEmbed2] });  
                setlists('./users.json', user)
                if (config.cagatoryid != ""){
                    const serverId = config.serverid; // Replace with your server's ID
                    const guild = client.guilds.cache.get(serverId);
                    const ChannelType = Discord.ChannelType;
                    if (!guild) {
                    console.error(`Server with ID ${serverId} not found.`);
                    return;
                    }
                    let user2 = client.users.cache.get(user[otherpersonaddress][0]);
                    tsety = `${interaction.user.username}_${user2.username}`;
        
                    channel2 = guild.channels.cache.find(channel => channel.name === tsety);
                    
                    if (!channel2) {
                    tsety = `${user2.username}_${interaction.user.username}`;
                    channel2 = guild.channels.cache.find(channel => channel.name === tsety);
                    }
                    if(!channel2){
                    channel2 = await guild.channels.create({
                    name: tsety,
                    type: ChannelType.GuildText,
                    })
                    await channel2.setParent(config.cagatoryid);
                    }

                    const exampleEmbed24 = new EmbedBuilder()
                    .setColor(0x0099FF)
                    .setTitle('Pair Matched')
                    .setTimestamp()
                    .setFooter({ text: 'Developed by Oreo'});
                    await channel2.send({ embeds: [exampleEmbed24]})
                }}
        }}
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
 function setlists(FP, LI) {
    try {
        fs.writeFileSync(FP, JSON.stringify(LI, null, 2), 'utf8');
      } catch (error) {
        console.error('Error saving list data:', error);
      }
 }

 function lookforage(userlist, age, useraddress) {
    z = 0
    for (var i = 0; i < userlist.length; i++) {
        if (i != useraddress){
      if (user[i][1] === age){
        if (user[i][4]){
          z = user[i][0]
        }}}}
    if (z === 0) {
        return false;
    } else {
        return z;
    }
 }