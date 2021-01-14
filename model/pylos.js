// pylos
const pylosSchema = new mongoose.Schema({
	board : Array,
	turn: Number,
	moves: Number,
	nickname: String,
}, { timestamps: true });

module.exports = mongoose.model('P', pylosSchema);

/*

// create P from pData
async function createP(pData) {
  var pylos = await findP(pData.nickname);
  console.log(pylos);
  await removeP(pData.nickname);
	const p = new P({
    board : pData.board,
    turn : pData.turn,
    moves : pData.moves,
    nickname : pData.nickname,
	})
	const result = await p.save();
	console.log(result);
};

// remove P
async function removeP(nickname) {
  const result = await P.deleteOne({nickname: nickname});
  // indicates the number of deleted documents
  console.log("Savegame has been deleted :"+result);
}

// find P
async function findP(nickname){
  const result = await P.findOne({"nickname": nickname});
  return result;
}


*/

