function InitFileSRanksBrd() {
    for (let index = 0; index < BRD_SQ_NUM; ++index) {
        FilesBrd[index] = SQUARES.OFFBOARD;
        RanksBrd[index] = SQUARES.OFFBOARD;
    }
    for (let rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
        for (let file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
            let sq = FR2SQ(file, rank);
            FilesBrd[sq] = file;
            RanksBrd[sq] = rank;
        }
    }
}
function InitHashKeys() {
    for (let index = 0; index < 14 * 120; ++index) {
        PieceKeys[index] = RAND_32();
    }
    SideKey = RAND_32();
    for (let index = 0; index < 16; ++index) {
        CastleKeys[index] = RAND_32();
    }
}
function InitSq120To64() {
    let sq = SQUARES.A1;
    let sq64 = 0;
    for (let index = 0; index < BRD_SQ_NUM; ++index) {
        Sq120To64[index] = 65;
    }
    for (let index = 0; index < 64; ++index) {
        Sq64To120[index] = 120;
    }
    for (let rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
        for (let file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
            sq = FR2SQ(file, rank);
            Sq64To120[sq64] = sq;
            Sq120To64[sq] = sq64;
            sq64++;
        }
    }
}
function InitBoardVars() {
    let index;
    for (index = 0; index < MAXGAMEMOVES; ++index) {
        GameBoard.history.push({ move: NOMOVE, castlePerm: 0, enPas: 0, fiftyMove: 0, posKey: 0 });
    }
}
function init() {
    console.log("init() called");
    InitFileSRanksBrd();
    InitHashKeys();
    InitSq120To64();
    InitBoardVars();
}
init();
console.log("Main Init Called");
ParseFen(START_FEN);
PrintBoard();
GenerateMoves();
PrintMoveList();
PrintPieceLists();
CheckBoard();
MakeMove(GameBoard.moveList[0]);
PrintBoard();
CheckBoard();