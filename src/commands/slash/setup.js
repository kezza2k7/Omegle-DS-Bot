const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const fs = require('fs');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Setup Your account!')
    .addNumberOption(option =>
		option.setName('age')
			.setDescription('Please state you\'re REAL age here!')
            .setRequired(true))
    .addStringOption(option =>
        option.setName('pronouns')
            .setDescription('Please state what your pronousn are!')
            .setRequired(true)),

    run: async (_client, interaction) => {
        age = interaction.options.getNumber('age')
        pronouns = interaction.options.getString('pronouns')

        if (age < 13 || age >120) {
            const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('Account Failed')
            .setDescription(`You are below the age of discord TOS (Please get off the app) or you are above the age of 120 which is impossible\nYou ARE allowed to redo /setup`)
            .setTimestamp()
            .setFooter({ text: 'Developed by Oreo'});
            interaction.reply({ embeds: [exampleEmbed] }) 
        } else {
            user = getlists('./users.json')
            userid = interaction.user.id;
            z = 0
            for (var i = 0; i < user.length; i++) {
              if (user[i][0] === userid){
                  z = i
            }}
            if (z === 0) {
                user.push([userid,age, false,"", false, pronouns])
                const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Account Created')
                .setDescription(`Thank you for Sumbitting your info!\nYou can now use /start to connect anomonously!`)
                .setTimestamp()
                .setFooter({ text: 'Developed by Oreo'});
                interaction.reply({ embeds: [exampleEmbed] }) 
            } else {
                user[z][1] = age
                user[z][5] = pronouns 
                const exampleEmbed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('Account Updated')
                .setDescription(`Updated your age to ${age} and your pronouns to ${pronouns}`)
                .setTimestamp()
                .setFooter({ text: 'Developed by Oreo'});
                interaction.reply({ embeds: [exampleEmbed] }) 
            }
            setlists('./users.json', user)
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
        console.warn(listData)
        return listData
     }
     function setlists(FP, LI) {
        try {
            fs.writeFileSync(FP, JSON.stringify(LI, null, 2), 'utf8');
            console.log('List data updated and saved successfully.');
          } catch (error) {
            console.error('Error saving list data:', error);
          }
     }