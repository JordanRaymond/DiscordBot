const { Attachment  } = require('discord.js')

module.exports = {
	command: 'babouin',
	description: 'Show a gif of a babouin!',
	execute(msg, args) {
        const attachement = new Attachment ('https://media.giphy.com/media/3o85xC73J7y0c9wJWM/giphy.gif')
		msg.channel.send(attachement)
	},
}
