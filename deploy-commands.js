const { REST, Routes } = require('discord.js');
const fs = require('fs');
require('dotenv').config(); // para carregar seu DISCORD_TOKEN e CLIENT_ID do .env

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Lê todos os comandos da pasta ./commands
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('⏳ Registrando comandos (/)...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: commands },
    );

    console.log('✅ Comandos registrados com sucesso!');
  } catch (error) {
    console.error(error);
  }
})();
