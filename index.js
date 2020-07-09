const Discord = require('discord.js');
const client = new Discord.Client();
const { prefix, scryfall } = require('./config.json');
const Axios = require('axios');

client.on('ready', () => {
  console.log('MTG_CARD_FETCHER is online');
});

const queries = new Set(`${prefix}set`);

client.on('message', (msg) => {
  if (msg.content.startsWith(`${prefix}card`)) {
    let search = scryfall;
    const cardName = msg.content.split(' ');
    for (let i = 1; i < cardName.length; i++) {
      if (cardName[i] in queries) {
        search = search + '&' + cardName[i].slice(1) + '=';
      } else {
        search += cardName[i];
        i != cardName.length - 1 ? (search += '+') : null;
      }
    }

    Axios.get(search)
      .then((response) => {
        //send a message with the response
        msg.channel.send(`${response.data.name}:`, {
          files: [response.data.image_uris.normal],
        });
      })
      .catch((error) => console.log(error));
  }
});

client.login(process.env.BOT_TOKEN);
