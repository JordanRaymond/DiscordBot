const botCommands = require('../commands/')

module.exports = {
	command: 'help',
	description: 'Show the list of commands.',
	execute(msg, args, position) {
		let helpMsg = ''

		if(args[position+1]) {
			const key = args[position+1]
			if(botCommands[key]) {
				helpMsg = `**${botCommands[key].command}**: ${botCommands[key].description}`
				
				msg.reply(helpMsg)
			}
		} else {
			helpMsg = Object.keys(botCommands).map(key => {
				return helpMsg + `**${botCommands[key].command}**: ${botCommands[key].description}`
			})
	
			msg.reply(helpMsg)
		}        
	},
}
