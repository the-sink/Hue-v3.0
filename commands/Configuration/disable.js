const { MessageEmbed } = require('discord.js');
const filename = require('path').basename(__filename).split(".")[0]
exports.run = async (client, message, args, level) => {
    if(!args[0]) return message.channel.send(`Invalid Arguments. Usage: \`${client.commands.get(filename).help.usage}\``);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if(!cmd) return message.channel.send(`Could not find specified command: (if trying to edit key use ;config command)`)
    if(cmd.conf.disablable == false) return message.channel.send("You are unable to disable this command")
    if(client.levelCache[cmd.conf.permLevel] > level) return message.channel.send("Unable to disable a command of a higher permission level then yours")
    if(message.settings["disabled-commands"].value.includes(cmd.help.name)) return message.channel.send("This command is already disabled")
    client.enmap.add(message, cmd.help.name, "disabled-commands")
    return message.channel.send(`Successfully disabled \`${cmd.help.name}\``)
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Administrator",
    disablable: false,
    premium: false
};
exports.help = {
    name: filename,
    category: __dirname.split("\\")[__dirname.split("\\").length - 1],
    description: "Disable a specified command",
    usage: `${filename} <command>`
};