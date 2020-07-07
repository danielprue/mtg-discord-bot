const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix, scryfall } = require('./config.json');
const Axios = require('axios');

client.on('ready', () => {
  console.log('MTG_CARD_FETCHER is online');
});

client.on('message', (msg) => {
  if (msg.content.startsWith(`${prefix}card`)) {
    let search = scryfall;
    const cardName = msg.content.split(' ');
    for (let i = 1; i < cardName.length; i++) {
      search += cardName[i];
      i != cardName.length - 1 ? (search += '+') : null;
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

client.login(token);
