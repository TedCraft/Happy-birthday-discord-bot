const { createCanvas, loadImage } = require('canvas')
const { MessageAttachment } = require('discord.js');

module.exports = {
    name: 'кирилл',
    aliases: ['торч', 'друг', 'брух', 'bruh'],
    utilisation: '{prefix}кирилл',
    voice: false,
    
    async execute(client, message) {
        const command = message.content.slice(client.config.app.prefix.length).split(' ').shift().toLowerCase();
        const startDate = new Date("06/28/2021");
        const dateDiff = Math.ceil((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        var word;
        if (dateDiff <= 10 || dateDiff >= 20) {
            if (dateDiff % 10 == 1)
                word = "день";
            else if (dateDiff % 10 >= 2 && dateDiff % 10 <= 4)
                word = "дня";
            else if ((dateDiff % 10 >= 5 && dateDiff % 10 <= 9) || dateDiff % 10 == 0)
                word = "дней";
        }
        else {
            word = "дней";
        }

        switch (command) {
            case "кирилл":
                message.channel.send(`Кирилл в армии уже \`${dateDiff}\` ${word} :pleading_face::point_right::point_left:`);
                break;

            case "торч":
                message.channel.send(`Торч в армии уже \`${dateDiff}\` ${word} :pleading_face::point_right::point_left:`);
                break;

            case "друг":
                message.channel.send(`Друг умер \`${dateDiff}\` ${word} назад :pleading_face::point_right::point_left:`);
                break;

            case "bruh":
            case "брух":
                const canvas = createCanvas(1229, 676);
                const ctx = canvas.getContext('2d');
                loadImage("https://sun9-40.userapi.com/impg/tYHsSP88pDkutFum3v7ycVPc53uS9olIIzs0FQ/lcev26S1tDY.jpg?size=1229x676&quality=96&sign=48d45eda0516a155a7aae90cb8fc8314&type=album")
                    .then((image) => {
                        ctx.drawImage(image, 0, 0, 1229, 676);

                        const text = `я умер ${dateDiff} ${word}`;
                        ctx.font = '70px Arial';
                        ctx.fillStyle = '#000';
                        ctx.fillText(text.toUpperCase(), 580, 300);

                        const length1 = ctx.measureText(text.toUpperCase()).width;
                        const length2 = ctx.measureText("НАЗАД").width;
                        ctx.fillText("НАЗАД", 580 + Math.round(length1 / 2) - Math.round(length2 / 2), 380);

                        message.channel.send(new MessageAttachment(canvas.createPNGStream()));
                    });
                break;

            default:
                break;
        }
    }
};