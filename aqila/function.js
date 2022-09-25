exports.getMsg = (obj, key) => getMsgFun(obj, key);
exports.getMsgText = (msg) => getMsgTextFun(msg);
exports.writeFile = (nama, file) => writeFileFun(nama, file);
exports.readFile = (nama) => readFileFun(nama);
exports.readFiles = (nama) => readFilesFun(nama);
exports.send = (wa, by, text) => sendFun(wa, by, text);
exports.acak = () => acakFun();
exports.getExFile = (msg) => getExFileFun(msg);
exports.noChat = (msg) => noChatFun(msg);


const fs = require("fs");
const Crypto = require("crypto");

function getExFileFun(msg){
  let text = JSON.stringify(msg,null,2);
  text = text.match(/\"([\d\w]+)\"\:/g).toString();
  if(/imageMessage/g.exec(text)){
    return ".jpeg";
  }
  if(/audioMessage/g.exec(text)){
    return ".mp3";
  }
  if(/stickerMessage/g.exec(text)){
    return ".webp";
  }
  if(/documentMessage/g.exec(text)){
    return "-"+ getMsgFun(msg, "fileName");
  }
  if(/videoMessage/g.exec(text)){
    if(/gifPlayback/g.exec(text)){
      return ".gif";
    }
    return ".mp4";
  }
}

function acakFun(){
  return Crypto.randomBytes(6).readUIntLE(0, 6).toString(36);
}

function writeFileFun(nama, file){
  return fs.writeFileSync(nama, file);
}

function readFileFun(nama){
  return fs.readFileSync(nama);
}

function readFilesFun(nama){
  return fs.readFileSync(nama, {encoding: 'utf8', flag: 'r'});
}

function sendFun(wa, by, text){
  wa.sendMessage(by, {text: String(text)});
}

function getMsgFun(obj, key) {
  var text = undefined;
  Object.keys(obj).forEach(a => {
    if (key == a)text = obj[a];
    if (typeof(obj[a]) == 'object') {

  Object.keys(obj[a]).forEach(b => {
    if (key == b)text = obj[a][b];
    if (typeof(obj[a][b]) == 'object') {

  Object.keys(obj[a][b]).forEach(c => {
    if (key == c)text = obj[a][b][c];
    if (typeof(obj[a][b][c]) == 'object') {

  Object.keys(obj[a][b][c]).forEach(d => {
    if (key == d)text = obj[a][b][c][d];
    if (typeof(obj[a][b][c][d]) == 'object') {

  Object.keys(obj[a][b][c][d]).forEach(e => {
    if (key == e)text = obj[a][b][c][d][e];
    if (typeof(obj[a][b][c][d][e]) == 'object') {

  Object.keys(obj[a][b][c][d][e]).forEach(f => {
    if (key == f)text = obj[a][b][c][d][e][f];
    if (typeof(obj[a][b][c][d][e][f]) == 'object') {

  Object.keys(obj[a][b][c][d][e][f]).forEach(g => {
    if (key == g)text = obj[a][b][c][d][e][f][g];
    if (typeof(obj[a][b][c][d][e][f][g]) == 'object') {

  Object.keys(obj[a][b][c][d][e][f][g]).forEach(h => {
    if (key == h)text = obj[a][b][c][d][e][f][g][h];
  }); } }); } }); } }); } }); } }); } }); } });
  return text;
}

function getMsgTextFun(obj){
  var text = "";
  if(!text)text = getMsgFun(obj, "text");
  if(!text)text = getMsgFun(obj, "conversation");
  if(!text)text = getMsgFun(obj, "caption");
  return text;
}

function noChatFun(obj){
  var text = "";
  if(!text)text = getMsgFun(obj, "remoteJid");
  if(!text)text = getMsgFun(obj, "participant");
  return String(/\d+/g.exec(text));
}
