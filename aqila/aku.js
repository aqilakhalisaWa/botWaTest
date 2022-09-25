exports.Message = (msg,wa,by,getMedia) => pesanHandler(msg,wa,by,getMedia);

const mod = require("./function.js");
const fs = require("fs");
const {tmpdir} = require("os")
const Crypto = require("crypto")
const ff = require('fluent-ffmpeg')
const webp = require("node-webpmux")
const path = require("path")

var bot,no;

async function pesanHandler(msg,wa,by,getMedia){
  bot = wa;
  no = by;
  var text = mod.getMsgText(msg);
  console.log(msg);
  console.log(text);
  if(/^\.\s/g.exec(text)){
    try{
      return eval(text.replace(/^\.\s/g, ""));
    }catch(e){
      return log(e);
    }
  }
}

function log(text){
  bot.sendMessage(no, {text: String(text)});
}
