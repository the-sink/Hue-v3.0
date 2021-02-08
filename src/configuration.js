const keys = require("./keys.json");
const config = {
    "AuthorizedUsers": [
        "299682971374452739", // Me
        "412729903893708801", // Harry
        "468791748739596298", // fingerPlace
    ],

    "bootMessage": `
_    _              ____         ___  
| |  | |            |___ \\       / _ \\ 
| |__| |_   _  ___    __) |     | | | |
|  __  | | | |/ _ \\  |__ <      | | | |
| |  | | |_| |  __/  ___) |  _  | |_| |
|_|  |_|\\__,_|\\___| |____/  (_)  \\___/ 
Made By: ItzRock#0002
    `,

    "database": ["mongodb://localhost:27017", "Hue"],
    "token": keys.main,
    "apiKeys": {"yt": keys.ytSearchAPI},
    "status": "static", // static or dev

    "logChannel": "767976193483079690",
    "errorChannel": "803503101109338152",
    
    "defaultSettings" : {
        // ohmygod i miss spelled category aaaaaaaaaaaa

        // General Settings

        "prefix": {
            name: "prefix",
            value: ";",
            catagory: "General",
            editable: true
        },

        "welcoming": {
            name: "welcoming",
            value: false,
            catagory: "General",
            editable: true
        },
        "welcoming-channel": {
            name: "welcoming-channel",
            value: undefined,
            catagory: "General",
            editable: true
        },
        "welcoming-text": {
            name: "welcoming-text",
            value: `Welcome {{user}} to {{guild}}!`,
            catagory: "General",
            editable: true
        },
        //

        "adminrole": {
            name: "adminrole",
            catagory: "Moderation", 
            value: undefined, 
            editable: true,
        },
        "modrole": {
            name: "modrole",
            catagory: "Moderation", 
            value :undefined, 
            editable: true,
        },
        "mutedrole": {
            name: "mutedrole",
            catagory: "Moderation",
            value: undefined, 
            editable: true,
        },
        "logs": {
            name: "logs",
            catagory: "Moderation", 
            value: undefined, 
            editable: true
        },

        // Verification Keys

        "verification": {
            name: "verification",
            catagory: "Verification", 
            value: false, 
            editable: true
        },
        "findRoles": {
            name: "verification",
            catagory: "Verification", 
            value: false, 
            editable: true
        },
        "groupID": {
            name: "groupID",
            catagory: "Verification", 
            value: undefined, 
            editable: true
        },
        "setnick": {
            name: "setnick",
            catagory: "Verification", 
            value: false, 
            editable: true
        },
        "unverifiedRole": {
            name: "unverifiedRole",
            catagory: "Verification", 
            value: false, 
            editable: true
        },
        "verifiedRole": {
            name: "verifiedRole",
            catagory: "Verification", 
            value: false, 
            editable: true
        },
        "GroupJoinRequired": {
            name: "GroupJoinRequired",
            catagory: "Verification", 
            value: false, 
            editable: true
        },
        //
        "premium": {
            name: "premium",
            value: false, 
            editable: false
        },
        "disabled-commands": {
            name: "disabled-commands", 
            value: [], 
            editable: false
        },
        "mutedUsers": {
            name: "mutedUsers", 
            value: [], 
            editable: false
        },
    },
    permissionLevels: [
        {
            level: 0,
            name: "User", 
            check: () => true
        },
        {
            level: 1,
            name: "Moderator",
            check: (message) => {
                try {
                    try {
                        let adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === message.settings.modrole.value.toLowerCase());
                        if(adminRole == undefined) adminRole = message.guild.roles.cache.find(r => r.id === message.settings.modrole.value.replace("<@&", "").replace(">", ""));
                        return (adminRole && message.member.roles.cache.has(adminRole.id));
                      } catch (e) {
                        return false;
                      }
                  } catch (e) {
                    return false;
                }
            }
        },
        {
            level: 2,
            name: "Administrator",
            check: (message) => {
                try {
                    try {
                        let adminRole = message.guild.roles.cache.find(r => r.name.toLowerCase() === message.settings.adminrole.value.toLowerCase());
                        if(adminRole == undefined) adminRole = message.guild.roles.cache.find(r => r.id === message.settings.adminrole.value.replace("<@&", ""));
                        return (adminRole && message.member.roles.cache.has(adminRole.id));
                      } catch (e) {
                        return false;
                      }
                  } catch (e) {
                    return false;
                }
            }
        },
        {
            level: 3,
            name: "Server Owner",
            check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
        },
        {
            level: 5,
            name: "Hue Administrator",
            check: (message) => config.AuthorizedUsers.includes(message.author.id)
        }
    ]
}
module.exports = config;