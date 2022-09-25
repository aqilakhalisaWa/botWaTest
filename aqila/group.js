exports.Message = (msg,wa,by,getMedia) => message(msg, wa, by, getMedia);

const mod = require("./function.js");

function message(msg,wa,getMedia) {
	var namaFile;
	var nama = mod.getMsg(msg, "pushName");
	var text = mod.getMsgText(msg);
	var noChat = String(/\d+/g.exec(mod.getMsg(msg, "participant")));
	if(getMedia){
		namaFile = "./media/group/"+ mod.acak() + mod.getExFile(msg);
		mod.writeFile(namaFile, getMedia);
	}
	let simp = "";
	if(noChat)simp += noChat;
	if(nama)simp += "\n*"+ nama +"*";
	if(namaFile)simp += "\n"+ namaFile;
	if(text)simp += "\n"+ text;
	let simpan = "./media/group/text/"+ by + ".txt";
	try{
		var dbg = mod.readFiles(simpan);
		mod.writeFile(simpan, dbg +"\n\n"+ simp);
	}catch(e){
		mod.writeFile(simpan, simp);
	}
	console.log(["(group)",nama+":",namaFile+" =>",text].join(" "));
}
