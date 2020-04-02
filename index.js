require('dotenv').config()
const Discord = require('discord.js')
const bot = new Discord.Client()
bot.commands = new Discord.Collection()
const botCommands = require('./commands')
botCommands.Help = require('./commands/help')

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].command, botCommands[key])
})

const TOKEN = process.env.TOKEN
const COMMAND_SYMBOL = process.env.COMMAND_SYMBOL

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`)
})

bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(ch => ch.name === "greetings")
    if (!channel) return

    channel.send(`Hello new test subject ${member}, say hello!`)
})

bot.on('message', msg => {
    extractCommands(msg)
})

function extractCommands(msg) {
    let args = msg.content.split(/ +/)
    let commands = []
    for (let i = 0; i < args.length; i++) {
        if (args[i].startsWith(COMMAND_SYMBOL)) {
            commands.push({command: args[i], position: i})
        }
    }

    for (let i in commands) {
        executeCommande(commands[i], args, msg)
    }
}

function executeCommande(commandObj, args, msg) {
    let command = commandObj.command.substring(COMMAND_SYMBOL.length)

    if (!bot.commands.has(command)) return

    try {
        bot.commands.get(command).execute(msg, args, commandObj.position)
    } catch (error) {
        console.error(error)
        msg.reply('there was an error trying to execute that command!')
    }
}

bot.login(TOKEN)
