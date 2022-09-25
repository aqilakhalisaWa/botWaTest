exports.Message = (msg,wa,getMedia) => message(msg,wa,getMedia);

const mod = require("./function.js");

function message(msg,wa,getMedia) {
	console.log(msg);
	var namaFile;
	var noChat = mod.noChat(msg);
	var nama = mod.getMsg(msg, "pushName");
	var text = mod.getMsgText(msg);
	
	if(noChat == "6288246701821" || noChat == "6283849475406")return;
	if(getMedia){
		namaFile = "./media/tipe/"+ mod.acak() + mod.getExFile(msg);
		mod.writeFile(namaFile, getMedia);
	}

	let simp = "";
	if(nama)simp += "*"+ nama +"*";
	if(namaFile)simp += "\n"+ namaFile;
	if(text){
		simp += "\n"+ text;
	}else{
		simp += " wa.me/"+ noChat;
		text = "wa.me/"+ noChat;
	}

	let simpan = "./media/tipe/text/"+ noChat + ".txt";
	try{
		var dbg = mod.readFiles(simpan);
		mod.writeFile(simpan, dbg +"\n\n"+ simp);
	}catch(e){
		mod.writeFile(simpan, simp);
	}
	console.log(["(tipe)",nama+":",namaFile+" =>",text].join(" "));
}
