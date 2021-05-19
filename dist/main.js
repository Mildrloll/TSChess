"use strict";
function InitFileSRanksBrd() {
    for (var index = 0; index < BRD_SQ_NUM; ++index) {
        FilesBrd[index] = SQUARES.OFFBOARD;
        RanksBrd[index] = SQUARES.OFFBOARD;
    }
    for (var rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
        for (var file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
            var sq = FR2SQ(file, rank);
            FilesBrd[sq] = file;
            RanksBrd[sq] = rank;
        }
    }
    console.log("FilesBrd[0]:" + FilesBrd[0] + " RanksBrd[0]:" + RanksBrd[0]);
    console.log("FilesBrd[SQUARES.A1]:" + FilesBrd[SQUARES.A1] + " RanksBrd[SQUARES.A1]:" + RanksBrd[SQUARES.A1]);
    console.log("FilesBrd[SQUARES.E8]:" + FilesBrd[SQUARES.E8] + " RanksBrd[SQUARES.E8]:" + RanksBrd[SQUARES.E8]);
}
function InitHashKeys() {
    for (var index = 0; index < 14 * 120; ++index) {
        PieceKeys[index] = RAND_32();
    }
    SideKey = RAND_32();
    for (var index = 0; index < 16; ++index) {
        CastleKeys[index] = RAND_32();
    }
}
function InitSq120To64() {
    var sq = SQUARES.A1;
    var sq64 = 0;
    for (var index = 0; index < BRD_SQ_NUM; ++index) {
        Sq120To64[index] = 65;
    }
    for (var index = 0; index < 64; ++index) {
        Sq64To120[index] = 120;
    }
    for (var rank = RANKS.RANK_1; rank <= RANKS.RANK_8; ++rank) {
        for (var file = FILES.FILE_A; file <= FILES.FILE_H; ++file) {
            sq = FR2SQ(file, rank);
            Sq64To120[sq64] = sq;
            Sq120To64[sq] = sq64;
            sq64++;
        }
    }
}
function init() {
    console.log("init() called");
    InitFileSRanksBrd();
    InitHashKeys();
}
init();
console.log("Main Init Called");
ParseFen(START_FEN);
PrintBoard();