module.exports = async (client, message) => {
    // Like said in the index most of this comes from hue 2.0 which comes from a guide bot, this file is just a complete rip from hue 2 which hasnt changed much from the orginial https://github.com/AnIdiotsGuide/guidebot/blob/master/events/message.js

    // if a bot then ignore.
    if (message.author.bot) return;

    const settings = message.settings = await client.HueMap.lookUp(message.guild);
  
    const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
      return message.reply(`:wave: my prefix is: \`${settings.prefix.value}\``);
    }
    // not for us
    if (message.content.indexOf(settings.prefix.value) !== 0) return;

    // define the arguments
    const args = message.content.slice(settings.prefix.value.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
  
    // If the member on a guild is invisible or not cached, fetch them.
    if (message.guild && !message.member) await message.guild.members.fetch(message.author);
  
    // permlevel
    const level = client.permlevel(message);

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (!cmd) return;
    
    const isBanned = await client.database.cmdBlacklist.isBanned(message.author.id, cmd.help.name)
    if(isBanned == true) return;

    if(cmd.conf.enabled == false) return;
    if (cmd && !message.guild && cmd.conf.guildOnly)
      return message.channel.send("This command is unavailable in DMs. Please run in a Server.");
    const disabledCommands = message.settings["disabled-commands"]
    if(disabledCommands.value.includes(cmd.help.name)){
      return message.channel.send(`This command has been disabled in this guild! please try another guild or in DMs.`)
    } 
    const premiumServer = message.settings["premium"]
    if(cmd.conf.premium == true && premiumServer.value == false && !client.config.AuthorizedUsers.includes(message.author.id)) 
      return message.channel.send(`This command can only be used in premium servers.`)

    if (level < client.levelCache[cmd.conf.permLevel]) {
        return message.channel.send(`Invalid Permission Level.
    Your permission level is ${level} (${client.config.permissionLevels.find(l => l.level === level).name})
    This command requires level ${client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})`);
      
    }
    message.author.permissionLevels = level;
    
    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
    if(message.channel.type == "dm"){
      client.logger.cmd(`GUILD:${message.channel.type} | L${level} ${message.author.username} ran ${cmd.help.name} ${args.join(" ")}`);
    }
    else client.logger.cmd(`GUILD: ${message.guild.name} | L${level} ${message.author.username} ran ${cmd.help.name} ${args.join(" ")}`);
    try {
      cmd.run(client, message, args, level); 
    } catch (error) {
      
      message.channel.send(`An error has occured in the command! ${error.name}: ${error.message}. PLEASE REPORT THIS!`)
      client.logger.log(`COMMAND ERROR => ${error.name}: ${error.message}`)
    }
  };