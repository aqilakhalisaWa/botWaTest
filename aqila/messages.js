exports.handleMessage = (msg,type,wa,getMedia) => Messages(msg,type,wa,getMedia);

const status = require("./status.js");
const chat = require("./chat.js");
const group = require("./group.js");
const tipe = require("./tipe.js");
const aku = require("./aku.js");

/*
const fs = require("fs");
const {tmpdir} = require("os")
const Crypto = require("crypto")
const ff = require('fluent-ffmpeg')
const webp = require("node-webpmux")
const path = require("path")
*/

function Messages(msg,type,wa,getMedia) {
  const by = msg.key.remoteJid;
  if(type == "append"){
     return tipe.Message(msg,wa,getMedia);
  }
  if(by == '6283849475406@s.whatsapp.net' || by == '6288246701821@s.whatsapp.net'){
     return aku.Message(msg,wa,by,getMedia);
  }
  if(by == '120363042672847597@g.us'){
     return group.Message(msg,wa,by,getMedia);
  }
  if(by != "status@broadcast"){
     return chat.Message(msg,wa,by,getMedia);
  }
  if(by == "status@broadcast"){
     return status.Message(msg,wa,getMedia);
  }
  //console.log(msg);
}
