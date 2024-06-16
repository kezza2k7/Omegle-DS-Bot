const { InteractionType } = require("discord.js");

 module.exports = {
	name: 'interactionCreate',
	execute: async(interaction) => {
         let client = interaction.client;
   	 if (interaction.type == InteractionType.ApplicationCommand) {
   	 if(interaction.user.bot) return;
	if (interaction.channel.type != 1) return;
	try {
         const command = client.slashcommands.get(interaction.commandName)
         command.run(client, interaction)
	} catch (e) {
        console.error(e)
	interaction.reply({content: "A problem was encountered while running the command! Please try again.", ephemeral: true})
	}
	 }
  }}
