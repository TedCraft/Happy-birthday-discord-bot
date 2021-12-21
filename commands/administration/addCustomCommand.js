const { insertServerCommand, getServerCommand } = require('../../src/database/database');
const { loadImage } = require('canvas')

module.exports = {
    name: 'addcustomcommand',
    aliases: ['addcm'],
    voice: false,

    async execute(client, message, args) {
        if (!message.member.permissions.has('ADMINISTRATOR'))
            return message.channel.send(`${message.author} Вы не являетесь администратором!`);
        if (args.length == 0) return message.channel.send(`${message.author} Введите команду!`);
        if (args.length == 1) return message.channel.send(`${message.author} Добавьте ответ команды!`);

        let songUrl = null, imageUrl = null, text = null;
        const command = args.shift().toLowerCase();
        
        const commands = await getServerCommand(client, message.guild.id, command);
        if (commands.length > 0 || 
            client.commands.get(command) || 
            client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) 
            return message.channel.send(`${message.author} Команда ${command} уже существует!`)

        for (const i in args) {
            const stroke = args[i].slice(2);
            switch (args[i].slice(0, 2).toLowerCase()) {
                case "m:":
                    if (stroke.match(/^(?:http|https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/playlist\?list=)([a-zA-Z0-9-_]{11})(?:\S+)?$/) != null ||
                        stroke.match(/^(?:http|https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([a-zA-Z0-9-_]{11})(?:\S+)?$/) != null) {
                        try {
                            
                        }
                        catch (ex) {
                            console.log(ex);
                        }
                        songUrl = stroke;
                    }
                    else {
                        message.channel.send(`${message.author} Ссылка на композицию введена неправильно!`);
                        return;
                    }
                    break;
                case "i:":
                        try {
                        await loadImage(stroke);
                        }
                        catch(ex) {
                            message.channel.send(`${message.author} Ссылка на изображение введена неправильно!`);
                            return;
                        }
                        imageUrl = stroke;
                    break;
                case "t:":
                    if (stroke.charAt(0) === "{" && message.content.includes("}")) {
                        const mas = message.content.match(/\{(.|\s)*\}/g);
                        if (mas.length > 0) {
                            text = mas[0].slice(1, -1);
                        }
                    }
                    else {
                        message.channel.send(`${message.author} Переданный текст должен быть в формате t:{your text}!`);
                        return;
                    }
                    break;
            }
        }

        await insertServerCommand(client, message.guild.id, command, songUrl, imageUrl, text);

        message.channel.send(`Команда \`${command}\` добавлена!`);
    }
};