module.exports = {
	command: 'ping',
	description: 'Pong!',
	execute(msg, args) {
		if(!msg.author.bot) {
			msg.reply('pong')
			msg.channel.send('pong')
		}
	},
};
