//const wa = require("./aqila/messages.js");

const {
  default: Aqila,
    useSingleFileAuthState,
    downloadMediaMessage,
    DisconnectReason
  } = require("@adiwajshing/baileys");

const {
    Boom
  } = require("@hapi/boom");
const P = require("pino");

const {
    state,
    saveState
  } = useSingleFileAuthState("session.json");
const logger = P();
const fs = require("fs");
const {tmpdir} = require("os")
const Crypto = require("crypto")
const ff = require('fluent-ffmpeg')
const webp = require("node-webpmux")
const path = require("path")
console.log("whatsapp conneting...");
function runBot() {
  const sock = Aqila({
    auth: state,
    printQRInTerminal: true,
    logger: P({
      level: "silent"
    })
  });

  sock.ev.on("connection.update", ({
    connection, lastDisconnect
  })=> {
    if (connection === "close") {
      try{
        const error = new Boom(lastDisconnect.error);
        const msgError = error?.output?.statusCode;
        if (msgError == DisconnectReason.loggedOut) {
          sock.logout();
          console.log("connection loguot...");
        } else {
          runBot();
        }
      }catch(e){
        runBot();
      }
    }
  })

  sock.ev.on("messages.upsert",
    async ({messages, type}) => {
      const msg = messages[0];
      if(msg.message.conversation == '.pink'){
         sock.sendMessage(msg.key.remoteJid, {text: "iya pink"});
      }
    });

  sock.ev.on("creds.update",
    saveState);
}

runBot();
