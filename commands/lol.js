const { Attachment  } = require('discord.js')

module.exports = {
	command: 'lol',
	description: 'Show a gif to play lol!',
	execute(msg, args) {
        const attachement = new Attachment ('https://media.giphy.com/media/RR29MOt59fQqI/giphy.gif')
		msg.channel.send(attachement)
	},
}
