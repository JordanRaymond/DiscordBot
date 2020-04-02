require('dotenv').config()
const KEY = process.env.GIPHY_API_KEY
const axios = require('axios').default

const searchUrl = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
const { Attachment  } = require('discord.js')

module.exports = {
	command: 'react',
	description: 'Show a random gif based on the last msg!',
	execute(msg, args) {
        const numberOfGif = 25
     
        msg.channel.fetchMessages({limit:10}).then(messages => {
          let message = messages.map(m => {
            if (!m.author.bot) return m.content
          })[1] || 'nope'

          console.log(`Search words used to react: ${message}`)

          axios.get('http://api.giphy.com/v1/gifs/search', {
            params: {
              q: message,
              api_key: KEY,
              limit: numberOfGif
            }
          })
          .then(function (response) {
            // console.log(response)
            const random = Math.floor(Math.random() * numberOfGif - 1)
            const gif = response.data.data[random]
            const gifUrl = gif ? gif.images.original.url : "https://media.giphy.com/media/9J7tdYltWyXIY/giphy.gif"

            const attachement = new Attachment(gifUrl)
		        msg.channel.send(attachement)
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            // always executed
          })
        })
	},
}
