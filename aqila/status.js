exports.Message = (msg,wa,getMedia) => message(msg,wa,getMedia);

const mod = require("./function.js");

function message(msg,wa,getMedia) {
	var namaFile;
	var nama = mod.getMsg(msg, "pushName");
	var text = mod.getMsgText(msg);
	var noChat = String(/\d+/g.exec(mod.getMsg(msg, "participant")));
	if(getMedia){
		namaFile = "./media/status/"+ mod.acak() + mod.getExFile(msg);
		mod.writeFile(namaFile, getMedia);
	}
	let simp = "";
	if(nama)simp += "*"+ nama +"*";
	if(namaFile)simp += "\n"+ namaFile;
	if(text)simp += "\n"+ text;
	if(!text && !namaFile)return;
	let simpan = "./media/status/text/"+ noChat + ".txt";
	try{
		var dbg = mod.readFiles(simpan);
		mod.writeFile(simpan, dbg +"\n\n"+ simp);
	}catch(e){
		mod.writeFile(simpan, simp);
	}
	console.log(["(status)",nama+":",namaFile+" =>",text].join(" "));
}
