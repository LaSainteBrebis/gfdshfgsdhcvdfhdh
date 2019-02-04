const Discord = require('discord.js');
const bot = new Discord.Client();
const { stripIndents } = require('common-tags');



const token =(process.env.TOKEN);
let prefix = "!";

bot.on('ready', () => {

console.log('Im ready! \nName:' + bot.user.tag + "\nWith:" + bot.users.size + " members\nServers:" + bot.guilds.size);

const asciify = require('asciify');
asciify('Ready', {font: 'larry3d'}, function(err, res) { console.log(res)});

const validStatus = ["idle","dnd","online"];
setInterval(() => { bot.user.setStatus(`${validStatus[Math.floor(Math.random() * validStatus.length)]}`)}, 3000);

const humeur = [ bot.users.size + " Users","B я є в ι ѕ","!help","v 1.0"];
setInterval(() => { bot.user.setGame(`${humeur[Math.floor(Math.random() * humeur.length)]}`)}, 3000);
});
//events//
bot.on("guildCreate", guild => {
  
  console.log('Je viens de rejoindre un server '+guild.name+' - '+guild.id);
  let embed = new Discord.RichEmbed()

   const invite =  guild.channels.find("name", "general","bonjour","général").createInvite().then(invite => 
    bot.users.get('158306346779934730').send("Je viens de rejoindre un server :  \n\nNom: "+guild.name+"\nId: `"+guild.id+"`\nLien: **"+ invite.url+"**"));
});

bot.on("guildDelete", guild => {
  
  console.log('Je me suis fais kick ou ban du server : '+guild.name+' - '+guild.id);
});
 bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'welcome-leave','bienvenue');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | name : ', `${member}`)
        .addField(':microphone2: | Welcome!', `Welcome to the server, ${member}`)
        .addField(':id: | User :', "**[" + `${member.id}` + "]**")
        .addField(':family_mwgb: | Your are the member', `${member.guild.memberCount}`)
        .addField("Name", `<@` + `${member.id}` + `>`, true)
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(`**${member.guild.name}**`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

bot.on('guildMemberAdd', member => {

    console.log(`${member}`, "has joined" + `${member.guild.name}`)

});

bot.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', 'welcome-leave');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField('Name:', `${member}`)
        .addField('Has Let the Server', ';(')
        .addField('Bye Bye :(', 'We will all miss you!')
        .addField('The server now as', `${member.guild.memberCount}` + " members")
        .setFooter(`**${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
});


 
bot.on("message", (message) => {
    var author = message.author.id;
    var args = message.content.split(' ').slice(1);



    if (message.content.startsWith(prefix + "ping")) {
        message.reply("Pong :ping_pong:").then(msg => {
            msg.react("👌")
        });
    } else if (message.content.startsWith(prefix + "infobot")) {

        let embed = new Discord.RichEmbed()

        .setTitle("Information about " + bot.user.tag)
            .setDescription(":robot:")
            .setColor("RANDOM")
            .addField("Name", bot.user.username, true)
            .addField("Discriminator", "#" + bot.user.discriminator, true)
            .addField("Users", bot.users.size, true)
            .addField("Bots", bot.users.filter(user => user.bot).size, true)
            .addField("Channels", bot.channels.size, true)
            .addField("Servers", bot.guilds.size, true)
            .addField("UpTime", (Math.round(bot.uptime / (1000 * 60 * 60))) + " hours, " + (Math.round(bot.uptime / (1000 * 60)) % 60) + " minutes, and " + (Math.round(bot.uptime / 1000) % 60) + " seconds.", false)
            .setThumbnail(bot.user.avatarURL)
            .setTimestamp()
            .setFooter("Information-bot")
        message.channel.send({ embed })
    }
 
 
    //----------Rainbow function----------------//

    if (message.content.startsWith(prefix + "disco")) {
        const config = require('./config.json')
        const roles = config.roleToDisco;
        const allowedRoles = config.allowedRoles;
        const allowedUsers = config.allowedUsers;

        function Rainbow() {
            let random = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
            roles.forEach((role) => {
                let theRole = message.guild.roles.find("name", role);
                theRole.edit({ color: random }).catch(e => {
                    return console.log(":x: **Error:** The role you specified in the `config.json` is either not a role on this server, or his a role higher than the highest role that I have.");
                });
            });
        }
        if (allowedUsers.includes(message.author.id)) {
            setInterval(() => { Rainbow(); }, 500);
            message.channel.send("```css\nDisco-ON...```");  
        } else {
            message.reply(`You do not have permission to use this command.`);
        }
    }

    if (message.content.startsWith(prefix + "stop disco")) {
        const allowedUsers = config.allowedUsers;
        if (allowedUsers.includes(message.author.id)) {
            message.channel.send("```css\nDisco-OFF...```");
            setTimeout(() => { console.log(process.exit(0)); }, 300);
        } else {
            message.reply(`You do not have permission to use this command.`);
        }
    }


    if(message.content.startsWith(prefix+"ban") || message.content.startsWith(prefix+"Ban") || message.content.startsWith(prefix+"BAN")) { 
        var moment = require("moment"); 
        var banMember = message.guild.member(message.mentions.users.first()); 
        var lapersonnee = message.guild.member(message.mentions.users.first());  
             if(lapersonnee === null){
               return message.channel.send("", {embed: {     
                title: "Error: ",     
                color: 0xff0000,     
                description: ":warning:  Please precise a person for ban :warning: ",  
                timestamp: new Date(),   footer: {   text: 'Ban Command'   },           
                thumbnail: {       
                    url: "https://cdn.pixabay.com/photo/2013/07/12/13/16/alert-146730_960_720.png"         
                },                    
            }});   
           }     
           if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {        
            return message.channel.send("", {embed: {     
             title: "Error: ",     color: 0xff0000,    
             description: ":warning:  I dont have permission BAN_MEMBERS can you check my permission? :warning: ",  
             timestamp: new Date(),   
             footer: {   
                text: 'Ban Command'
},
          thumbnail: {
      url: "https://cdn.pixabay.com/photo/2013/07/12/13/16/alert-146730_960_720.png"
        },

        }});
      }
      if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS") && message.author.id != "317733390256308224"){
        return message.channel.send("", {embed: {
    title: "Error: ",
    color: 0xff0000,
    description: ":warning:  You dont have permission BAN_MEMBERS RIP.. :warning: ",
 timestamp: new Date(),
  footer: {
  text: 'Ban Command'
  },
          thumbnail: {
      url: "https://cdn.pixabay.com/photo/2013/07/12/13/16/alert-146730_960_720.png"
        },

        }});
      }
      if(banMember.highestRole.position >= message.member.highestRole.position){
        return message.channel.send("", {embed: {
          title: "Error:",
          color: 0xff0000,
          description: "You cannot ban a member who is higher or has the same role as you :zap:",
           timestamp: new Date(),
  footer: {
  text: 'Ban Command'
  },
        }}).catch(console.error);
      }
       const data = bot.channels.get(message.channel.id);
         var temps = moment(data.created).format("LLLL");
         var banMember = message.guild.member(message.mentions.users.first());
         banMember.ban().then(member => {
        return message.channel.send("", {embed: {
    title: "Success: ",
    color: 0x00FF00,
    description: ""+banMember.user.username+" was successfully baned by "+message.author.username,
 timestamp: new Date(),
  footer: {
  text: 'Ban Command'
  },
          image: {
                    url: "http://i.imgur.com/O3DHIA5.gif"
                },

        }});
});
     }

if(message.content.startsWith(prefix+"kick") || message.content.startsWith(prefix+"Kick") || message.content.startsWith(prefix+"KICK")) { 
        var moment = require("moment"); 
        var kickMember = message.guild.member(message.mentions.users.first()); 

             if(kickMember === null){
               return message.channel.send("", {embed: {     
                title: "Error: ",     
                color: 0xff0000,     
                description: ":warning:  Please precise a person for kick :warning: ",  
                timestamp: new Date(),   
                footer: {   
                    text: 'kick Command'   },           
                thumbnail: {       
                    url: "https://cdn.pixabay.com/photo/2013/07/12/13/16/alert-146730_960_720.png"         
                },                    
            }});   
           }     
      if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS") && message.author.id != "317733390256308224"){
            return message.channel.send("", {embed: {     
             title: "Error: ",     color: 0xff0000,    
             description: ":warning:  I dont have permission KICK_MEMBERS can you check my permission? :warning: ",  
             timestamp: new Date(),   
             footer: {   
                text: 'Kick Command'
},
          thumbnail: {
      url: "https://cdn.pixabay.com/photo/2013/07/12/13/16/alert-146730_960_720.png"
        },

        }});
      }
      if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS") && message.author.id != "317733390256308224"){
        return message.channel.send("", {embed: {
    title: "Error: ",
    color: 0xff0000,
    description: ":warning:  You dont have permission KICK_MEMBERS RIP.. :warning: ",
 timestamp: new Date(),
  footer: {
  text: 'Kick Command'
  },
          thumbnail: {
      url: "https://cdn.pixabay.com/photo/2013/07/12/13/16/alert-146730_960_720.png"
        },

        }});
      }
      if(kickMember.highestRole.position >= message.member.highestRole.position){
        return message.channel.send("", {embed: {
          title: "Error:",
          color: 0xff0000,
          description: "You cannot kick a member who is higher or has the same role as you :zap:",
           timestamp: new Date(),
  footer: {
  text: 'Kick Command'
  },
        }}).catch(console.error);
      }
       const data = bot.channels.get(message.channel.id);
         var temps = moment(data.created).format("LLLL");
         kickMember.kick().then(member => {
        return message.channel.send("", {embed: {
    title: "Success: ",
    color: 0x00FF00,
    description: ""+kickMember.user.username+" was successfully kicked by "+message.author.username,
 timestamp: new Date(),
  footer: {
  text: 'Kick Command'
  },
          image: {
                    url: "http://i.imgur.com/O3DHIA5.gif"
                },

        }});
});
     }

    if(message.content.startsWith(prefix+"invite")){
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setDescription("**:robot:There is the link if you want to add me in your server: [Click here](https://discordapp.com/api/oauth2/authorize?client_id=539901046689103872&permissions=8&scope=bot)**\n\n**Join My Discord if you need to help :zap:\n===================================================\n\n:smile:-Best Support \n:crossed_swords:- Good staff's\n\n===================================================\n\n- :link: Invitation Link :link: -\nhttps://discord.gg/GtUVkvC**")
    .setImage("https/cdn.discordapp.com/avatars/508253132338364416/f5a88ebd301bc0a2e8cffe8a6f647f02.jpg?width=473&height=473")
    .setThumbnail(bot.user.avatarURL)
    message.author.send({embed})
    message.reply("**Check your private message :mailbox_with_mail: **");
}


if(message.content.startsWith(prefix+"prune")){
let embed = new Discord.RichEmbed()
    if(!message.member.hasPermission("MANAGE_MESSAGES") && message.author.id != "132962262410461184"){
embed.setColor('RANDOM')
embed.setDescription(":bookmark_tabs: You dont have **MANAGE_MESSAGES** permission to use this command")
return message.channel.send({embed});
}
if(args.length < 1) {
  let embed = new Discord.RichEmbed()
embed.setColor('RANDOM')
embed.setDescription("please precise number for message to clean\n**Ex: "+prefix+"prune 10**")
return message.channel.send({embed});
}
if(isNaN(args)) {
  let embed = new Discord.RichEmbed()
embed.setColor('RANDOM')
embed.setDescription("please precise number for message to clean\n**Ex: "+prefix+"prune 10**")
return message.channel.send({embed});
}
if(Number(args) > 99) {
  let embed = new Discord.RichEmbed()
embed.setColor('RANDOM')
embed.setDescription("limit message to clean is 99")
return message.channel.send({embed});
}
    message.channel.fetchMessages({
      limit: args.join(' ')
    }).then(messages => {
      messages.filter(e => e.author.equals(bot.user)).forEach(message => {
        message.reply("**Succesfully cleaned up messages sent by bot :robot:.**")
        return message.delete();
      });
    });
}
if(message.content.startsWith(prefix+"3D")){
    if(args.length < 1){
        return message.reply('Please enter value');
    }

    const asciify = require('asciify');
asciify(args, {font: 'larry3d'}, function(err, res) {
message.channel.send("```css\n"+res+"```")
});
}
    if (message.content.startsWith (prefix +"say")) {
        var text = message.content.substring(5);
       message.channel.bulkDelete (1)
        message.channel.send (text)
    console.log (`${message.author.username} | Say` + text)
     }

     if (message.content.startsWith( prefix + "say")){
        message.delete();
      
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
      
        let botmessage = args.join(" ");
      
        message.channel.send(botmessage);
      
      }
      if(message.content.startsWith(prefix + 'mute')){
        let defineduser = message.mentions.users.first();
        if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_ROLES")) {
            message.channel.send ("📛 Tu n'as pas la permission 📛");
            console.log("📛 Tu n'as pas la permission 📛");
            return;
          }
          else if (!message.channel.permissionsFor(bot.user).hasPermission("MANAGE_ROLES")) {
            message.channel.send ("📛 Je n'es pas la permission 📛");
            console.log("📛 Je n'es pas la permission 📛");
            return;
          }
          if(message.mentions.users.size === 0){
            return message.channel.send ("**:x: Veuillez mentionner l'utilisateur que vous voulez mute**")
          }
          let muteMember = message.guild.member(message.mentions.users.first());
          if(!muteMember){
            return message.channel.send("**:x: Cet utilisateur n'est certainement pas valide**")
          }
          message.channel.overwritePermissions(muteMember, {SEND_MESSAGES: false}).then(member => {
            message.channel.send(defineduser.username+" **a bien été mute**");
            let muteEmbed = new Discord.RichEmbed()
               .setDescription("~Mute~")
               .setColor("#e56b00")
               .addField("Utilisateur mute", `${defineduser.username}`)
               .addField("Mute par", `${message.author.username}`)
               .addField("Mute dans ", message.channel)
               .addField("Le", message.createdAt)
               .setTimestamp()
               .setFooter(`Mute`);
               let incidentchannel = message.guild.channels.find(`name`, "logs");
               if(!incidentchannel) return message.channel.send("Impossible de trouver le channel ```logs```.");
               incidentchannel.send(muteEmbed)
             })
           }

           if(message.content.startsWith(prefix + 'unmute')){
            let defineduser = message.mentions.users.first();
            if (!message.channel.permissionsFor(message.author).hasPermission("MANAGE_ROLES")) {
              message.channel.send ("📛 Tu n'as pas la permission 📛");
              console.log("📛 Tu n'as pas la permission 📛");
          return;
        }
        else if (!message.channel.permissionsFor(bot.user).hasPermission("MANAGE_ROLES")) {
            message.channel.send ("📛 Je n'es pas la permission 📛");
            console.log("📛 Je n'es pas la permission 📛");
          return;
        }
        if(message.mentions.users.size === 0){
			return message.channel.send ("**:x: Veuillez mentionner l'utilisateur que vous voulez unmute**")
	}
    let unmuteMember = message.guild.member(message.mentions.users.first());
    if(!unmuteMember){
      return message.channel.send("**:x: Cet utilisateur n'est certainement pas valide**")
    }
    message.channel.overwritePermissions(unmuteMember, {SEND_MESSAGES: true}).then(member => {
      message.channel.send(member.username + " a bien été unmute**" );
      let unmuteEmbed = new Discord.RichEmbed()
             .setDescription("~Unmute~")
             .setColor("#e56b00")
             .addField("Utilisateur unmute", `${defineduser.username}`)
             .addField("Unmute par", `${message.author.username}`)
             .addField("Unmute dans ", message.channel)
            .addField("Le", message.createdAt)
            .setTimestamp()
            .setFooter(`Unmute`);
            let incidentchannel = message.guild.channels.find(`name`, "logs");
    if(!incidentchannel) return message.channel.send("Impossible de trouver le channel ```logs```.");
    incidentchannel.send(unmuteEmbed)
  })
}


var fs = require('fs');
 
let warns = JSON.parse(fs.readFileSync("./warn.json", "utf8"));

  if (message.content.startsWith(prefix + "warn")){
    let defineduser = message.mentions.users.first();
  if (!message.channel.permissionsFor(message.author).hasPermission("KICK_MEMBERS")) {
    message.channel.send ("📛 Tu n'as pas la permission 📛");
    console.log("📛 Tu n'as pas la permission 📛");
    return;
  }
  else if (!message.channel.permissionsFor(bot.user).hasPermission("KICK_MEMBERS")) {
    message.channel.send ("📛 Je n'es pas la permission 📛");
    console.log("📛 Je n'es pas la permission 📛");
    return;
  }
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Utilisateur inconnue");

    if(!warns[wUser.id]) warns[wUser.id] = {
      warns: 0
    };

    warns[wUser.id].warns++;
    fs.writeFile("warnings.json", JSON.stringify(warns), (err) => {
      if (err) console.log(err)
    });
    message.channel.send(`<@${wUser.id}> a etait warn`);
    let warnEmbed = new Discord.RichEmbed()
    .setDescription("Warns")
    .setAuthor(message.author.username)
    .setColor("#fc6400")
    .addField("Utilisateur Warn", `${defineduser.username} `)
    .addField("Warn dans ", message.channel)
    .addField("Nombre de warn", warns[wUser.id].warns)

    let incidentchannel = message.guild.channels.find(`name`, "logs");
    if(!incidentchannel) return message.channel.send("Impossible de trouver le channel ```logs```.");

    incidentchannel.send(warnEmbed)

    if(warns[wUser.id].warns == 3){
      message.guild.member(wUser).kick();
      message.reply(`<@${wUser.id}> a etait ^^kick. Car il a atteint 3 warns. `)
    }
    if(warns[wUser.id].warns == 5){
      message.guild.member(wUser).ban();
      message.reply(`<@${wUser.id}> a etait ^^ban. Car il a atteint 5 warns. `)
    }
  }
if(message.content.startsWith(prefix + "listwarn")){
let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

let wUser = message.mentions.users.first()
if(!wUser) return message.reply("Je ne trouve pas cette utilisateur");
let warnlevel = warns[wUser.id].warns;

message.channel.send (`${wUser} a ${warnlevel} warns.`);

}
  
if(message.content.startsWith ( prefix + "help")) {
  var aide_embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(` ❤Voici mes catégories d'aide❤ !`)
  .setDescription(`Voici mes commandes disponible :`)
  .setThumbnail(message.author.avatarURL)
  .addField("🖖Modération", "Fais `!modo` pour voir mes commandes de modération🖖 !")
  .addField("🎉 Info", "Fais `!info` pour voir mes commandes 🎉 !")
  .setFooter("Menu d'aide - Brebisbot")
  .setTimestamp()
  message.channel.send(aide_embed);
}

if(message.content.startsWith ( prefix + "modo")) {
  var mod_embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(`❤ Voici mes commandes modérations❤ !`)
  .setThumbnail(message.author.avatarURL)
  .addField("!kick <@user>", "Kick l'utilisateur !")
  .addField("!ban <@user>", "Ban l'utilisateur !")
  .addField("!clear nombre", "Supprime le nombre de messages indiqué 100 message maximun")
  .addField("!mute <@user>", "Mute l'utilisateur mentionné")
  .addField("!unmute <@user>", "Unmute l'utilisateur mentionné")
  .addField("!warn <@user>", "Metre un avertisement a l'utilisateur")
  .addField("!listwarn <@user>", "Regarde combien d'avertisement a l'utilisateur")
  .setFooter("Commande modération - BREBIS")
  .setTimestamp()
  message.channel.send(mod_embed);
}

if(message.content.startsWith(prefix + "info")) {
  var fun_embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle(`💛 Voici mes commandes 💛 !`)
  .setThumbnail(message.author.avatarURL)
  .addField("!ping", "Savoir le bot si il est vivant :joy: !")
  .addField("!stats", "Le bot vous envoie des informations sur votre profil !")
  .addField("!infobot", "Donne des indormations sur le bot et le serveur !")
  .addField("!say *message* ", "Faire parler le bot ")
  .addField("!3D *message*", "Ecrit votre texte en 3D")

  .setFooter("Commandes - BrebisBot")
  .setTimestamp()
  message.channel.send(fun_embed);
}

});
bot.login(token);
