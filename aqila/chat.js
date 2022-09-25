exports.Message = (msg,wa,by,getMedia) => message(msg,wa,by,getMedia);

const mod = require("./function.js");

function message(msg,wa,by,getMedia) {
	var namaFile;
	var nama = mod.getMsg(msg, "pushName");
	var text = mod.getMsgText(msg);
	var noChat = String(/\d+/g.exec(by));
	if(getMedia){
		namaFile = "./media/chat/"+ mod.acak() + mod.getExFile(msg);
		mod.writeFile(namaFile, getMedia);
	}
	let simp = "";
	if(nama)simp += "*"+ nama +"*";
	if(namaFile)simp += "\n"+ namaFile;
	if(text)simp += "\n"+ text;
	
	let simpan = "./media/chat/text/"+ noChat + ".txt";
	try{
		var dbg = mod.readFiles(simpan);
		mod.writeFile(simpan, dbg +"\n\n"+ simp);
	}catch(e){
		mod.writeFile(simpan, simp);
	}
	console.log(["chat",nama+":",namaFile+" =>",text].join(" "));
}
