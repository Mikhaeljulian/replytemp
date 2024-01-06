const qrcode = require('qrcode-terminal');
const { Client, MessageMedia } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async message => {
    console.log(message.body);

    const lowercaseBody = message.body.toLowerCase();
    const senderId = message.from;

    if (lowercaseBody.includes('harga')) {
        const replyMessage = `Hai @${senderId}, harga bermain di Garage 9 Billiard 🎱 adalah :\n\n--------------------------\n1 Jam di siang hari Rp50k\n1 Jam di malam hari Rp50k\n--------------------------`;
        message.reply(replyMessage);
    } else if (lowercaseBody.includes('booking')) {
        const replyMessage = `Hai @${senderId}, untuk booking silahkan isi form berikut :\n\nNama :\nJam Datang :\nBerapa Jam (bisa open bill) :\n\nJika Pemesan tidak kunjung datang 5 MENIT⏱ setelah waktu pembookingan maka Pemesan akan dimasukkan waiting list.`;
        message.reply(replyMessage);
    } else if (lowercaseBody.includes('paket')) {
        try {
            const caption = `Hai @${senderId}, berikut adalah Paket Kami`;
            const media = await MessageMedia.fromUrl('https://i.ibb.co/KGFWMBR/paketbaru.jpg');
            message.reply(media);
            message.reply(caption);
        } catch (error) {
            console.error('Error sending image:', error);
        }
    } else {
        const replyMessage = `Hai @${senderId}!! Selamat Datang Di Garage Billiard \n\nUntuk List Chat Kami Tolong Gunakan :\n- harga \n- booking \n- paket`;
        message.reply(replyMessage);
    }
});

client.initialize();
