module.exports.sendMessage = async (sock, to, text) => {
    await sock.sendMessage(to, { text });
};
