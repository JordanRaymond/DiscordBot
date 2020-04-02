require('dotenv').config()
const KEY = process.env.GIPHY_API_KEY
const axios = require('axios').default

const searchUrl = "http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5"
const { Attachment  } = require('discord.js')

module.exports = {
	command: 'find',
	description: 'Search a gif! !find [words to search] [number of gif] [number of the gif to show]',
	execute(msg, args, position) {
        if(msg.author.bot) return

        const searchWord = args[position+1]
        console.log(`search word: ${searchWord}`)

        let numberOfGif = parseInt(args[position+2], 10)   
        numberOfGif = isNaN(numberOfGif) ? 25 : numberOfGif
        console.log(`number of gifs: ${numberOfGif}`)

        axios.get('http://api.giphy.com/v1/gifs/search', {
            params: {
              q: searchWord,
              api_key: KEY,
              limit: numberOfGif
            }
        })
        .then(function (response) {
            const gifNumber = randomOrParam(args, numberOfGif, position)
            const gif = response.data.data[gifNumber]
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
	},
}

function randomOrParam(args, numberOfGif, position) {
    let gifToChoose = parseInt(args[position+3], 10)   
    console.log(`args num: ${gifToChoose}`)
    
    gifToChoose = isNaN(gifToChoose) ? Math.floor(Math.random() * numberOfGif - 1) : gifToChoose
    console.log(`chosed Gif: ${gifToChoose}`)

    return gifToChoose - 1
}

