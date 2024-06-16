const config = require("../../config.js")
const { Collection } = require("discord.js")
const ms = require("ms")
const cooldown = new Collection()

module.exports = {
	name: 'messageCreate',
	execute: async(message) => {
  let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type != 1) return;
  let prefix = config.prefix
  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const cmd = "ping"
  if(cmd.length == 0 ) return;
  let command = client.commands.get(cmd)
  if(!command) command = client.commands.get(client.commandaliases.get(cmd));

  if(command) {
    if(command.cooldown) {
      if(cooldown.has(`${command.name}${message.author.id}`)) return message.reply({ content: `Cooldown is active now please \`${ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), {long : true}).replace("minutes", `mins`).replace("seconds", `secs`).replace("second", `sec`).replace("ms", `millisecond`)}\` then try again.`}).then(msg => setTimeout(() => msg.delete(), cooldown.get(`${command.name}${message.author.id}`) - Date.now()))
      command.run(client, message, args)
      cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
      setTimeout(() => {
        cooldown.delete(`${command.name}${message.author.id}`)
      }, command.cooldown);
  } else {
    command.run(client, message, args)
  }

  }}};
