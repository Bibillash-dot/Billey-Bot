const { prefix, owner, botName } = require("./config");
const { sendMessage } = require("./lib/functions");
const msg = require("./lib/messages");

module.exports.msgHandler = async (sock, m) => {
    try {
        const message = m.messages[0];
        if (!message.message) return;
        const from = message.key.remoteJid;
        const type = Object.keys(message.message)[0];

        let text = "";
        if (type === "conversation") text = message.message.conversation;
        else if (message.message.extendedTextMessage)
            text = message.message.extendedTextMessage.text;

        if (!text.startsWith(prefix)) return;

        const cmd = text.slice(1).split(" ")[0].toLowerCase();
        const args = text.split(" ").slice(1);

        switch (cmd) {

            case "menu":
                await sendMessage(sock, from, msg.menu(botName));
                break;

            case "owner":
                await sendMessage(sock, from, `Owner: wa.me/${owner[0]}`);
                break;

            case "ai":
                await sendMessage(sock, from, `Fitur AI belum diaktifkan, coming soon!`);
                break;

            default:
                await sendMessage(sock, from, "Perintah tidak dikenal.");
        }
    } catch (e) {
        console.log("Error handler: ", e);
    }
};
