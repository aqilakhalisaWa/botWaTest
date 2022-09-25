const wa = require("./aqila/messages.js");

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
      console.log(JSON.stringify(messages[0],null,2));
      let getMedia = false;
      try{
        getMedia = await downloadMediaMessage(messages[0],'buffer',{ },{logger});
      }catch(e){}
      try{
        await wa.handleMessage(messages[0], type, sock, getMedia);
      }catch(e){
	      console.log(e);
      }
    });

  sock.ev.on("creds.update",
    saveState);
}

runBot();
