"use strict";
var PIECES;
(function (PIECES) {
    PIECES[PIECES["EMPTY"] = 0] = "EMPTY";
    PIECES[PIECES["wP"] = 1] = "wP";
    PIECES[PIECES["wN"] = 2] = "wN";
    PIECES[PIECES["wB"] = 3] = "wB";
    PIECES[PIECES["wR"] = 4] = "wR";
    PIECES[PIECES["wQ"] = 5] = "wQ";
    PIECES[PIECES["wK"] = 6] = "wK";
    PIECES[PIECES["bP"] = 7] = "bP";
    PIECES[PIECES["bN"] = 8] = "bN";
    PIECES[PIECES["bB"] = 9] = "bB";
    PIECES[PIECES["bR"] = 10] = "bR";
    PIECES[PIECES["bQ"] = 11] = "bQ";
    PIECES[PIECES["bK"] = 12] = "bK";
})(PIECES || (PIECES = {}));
;
var BRD_SQ_NUM = 120;
var FILES;
(function (FILES) {
    FILES[FILES["FILE_A"] = 0] = "FILE_A";
    FILES[FILES["FILE_B"] = 1] = "FILE_B";
    FILES[FILES["FILE_C"] = 2] = "FILE_C";
    FILES[FILES["FILE_D"] = 3] = "FILE_D";
    FILES[FILES["FILE_E"] = 4] = "FILE_E";
    FILES[FILES["FILE_F"] = 5] = "FILE_F";
    FILES[FILES["FILE_G"] = 6] = "FILE_G";
    FILES[FILES["FILE_H"] = 7] = "FILE_H";
    FILES[FILES["FILE_NONE"] = 8] = "FILE_NONE";
})(FILES || (FILES = {}));
;
var RANKS;
(function (RANKS) {
    RANKS[RANKS["RANK_1"] = 0] = "RANK_1";
    RANKS[RANKS["RANK_2"] = 1] = "RANK_2";
    RANKS[RANKS["RANK_3"] = 2] = "RANK_3";
    RANKS[RANKS["RANK_4"] = 3] = "RANK_4";
    RANKS[RANKS["RANK_5"] = 4] = "RANK_5";
    RANKS[RANKS["RANK_6"] = 5] = "RANK_6";
    RANKS[RANKS["RANK_7"] = 6] = "RANK_7";
    RANKS[RANKS["RANK_8"] = 7] = "RANK_8";
    RANKS[RANKS["RANK_NONE"] = 8] = "RANK_NONE";
})(RANKS || (RANKS = {}));
;
var COLOURS;
(function (COLOURS) {
    COLOURS[COLOURS["WHITE"] = 0] = "WHITE";
    COLOURS[COLOURS["BLACK"] = 1] = "BLACK";
    COLOURS[COLOURS["BOTH"] = 2] = "BOTH";
})(COLOURS || (COLOURS = {}));
;
var CASTLBIT;
(function (CASTLBIT) {
    CASTLBIT[CASTLBIT["WKCA"] = 1] = "WKCA";
    CASTLBIT[CASTLBIT["WQCA"] = 2] = "WQCA";
    CASTLBIT[CASTLBIT["BKCA"] = 4] = "BKCA";
    CASTLBIT[CASTLBIT["BQCA"] = 8] = "BQCA";
})(CASTLBIT || (CASTLBIT = {}));
var SQUARES;
(function (SQUARES) {
    SQUARES[SQUARES["A1"] = 21] = "A1";
    SQUARES[SQUARES["B1"] = 22] = "B1";
    SQUARES[SQUARES["C1"] = 23] = "C1";
    SQUARES[SQUARES["D1"] = 24] = "D1";
    SQUARES[SQUARES["E1"] = 25] = "E1";
    SQUARES[SQUARES["F1"] = 26] = "F1";
    SQUARES[SQUARES["G1"] = 27] = "G1";
    SQUARES[SQUARES["H1"] = 28] = "H1";
    SQUARES[SQUARES["A8"] = 91] = "A8";
    SQUARES[SQUARES["B8"] = 92] = "B8";
    SQUARES[SQUARES["C8"] = 93] = "C8";
    SQUARES[SQUARES["D8"] = 94] = "D8";
    SQUARES[SQUARES["E8"] = 95] = "E8";
    SQUARES[SQUARES["F8"] = 96] = "F8";
    SQUARES[SQUARES["G8"] = 97] = "G8";
    SQUARES[SQUARES["H8"] = 98] = "H8";
    SQUARES[SQUARES["NO_SQ"] = 99] = "NO_SQ";
    SQUARES[SQUARES["OFFBOARD"] = 100] = "OFFBOARD";
})(SQUARES || (SQUARES = {}));
;
var BOOL;
(function (BOOL) {
    BOOL[BOOL["FALSE"] = 0] = "FALSE";
    BOOL[BOOL["TRUE"] = 1] = "TRUE";
})(BOOL || (BOOL = {}));
;
var MAXGAMEMOVES = 2048;
var MAXPOSITIONMOVES = 256;
var MAXDEPTH = 64;
var FilesBrd = new Array(BRD_SQ_NUM);
var RanksBrd = new Array(BRD_SQ_NUM);
var START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var PecChar = ".PNBRQKpnbrqk";
var SideChar = "wb-";
var RankChar = "12345678";
var FileChar = "abcdefgh";
function FR2SQ(f, r) {
    return ((21 + (f)) + ((r) * 10));
}
var PieceBig = [BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE];
var PieceMaj = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE];
var PieceMin = [BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE];
var PieceVal = [0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000];
var PieceCol = [COLOURS.BOTH, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK];
var PiecePawn = [BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE];
var PieceKnight = [BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE];
var PieceKing = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE];
var PieceRookQueen = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE];
var PieceBishopQueen = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE];
var PieceSlides = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE];
var KnDir = [-8, -19, -21, -12, 8, 19, 21, 12];
var RkDir = [-1, -10, 1, 10];
var BiDir = [-9, -11, 11, 9];
var KiDir = [-1, -10, 1, 10, -9, -11, 9, 11];
var DirNum = [0, 0, 8, 4, 4, 8, 8, 0, 8, 4, 4, 8, 8];
var PceDir = [0, 0, KnDir, BiDir, RkDir, KiDir, KiDir, 0, KnDir, BiDir, RkDir, KiDir, KiDir];
var LoopNonSlidePce = [PIECES.wN, PIECES.wK, 0, PIECES.bN, PIECES.bK, 0];
var LoopNonSlideIndex = [0, 3];
var LoopSlidePce = [PIECES.wB, PIECES.wR, PIECES.wQ, 0, PIECES.bB, PIECES.bR, PIECES.bQ, 0];
var LoopSlideIndex = [0, 4];
var PieceKeys = new Array(14 * 120);
var SideKey;
var CastleKeys = new Array(16);
var Sq120To64 = new Array(BRD_SQ_NUM);
var Sq64To120 = new Array(64);
function RAND_32() {
    return (Math.floor((Math.random() * 255) + 1) << 23) | (Math.floor((Math.random() * 255) + 1) << 16) | (Math.floor((Math.random() * 255) + 1) << 8) | Math.floor((Math.random() * 255) + 1);
}
function SQ64(sq120) {
    return Sq120To64[(sq120)];
}
function SQ120(sq64) {
    return Sq64To120[(sq64)];
}
function PCEINDEX(pce, pecNum) {
    return (pce * 10 + pecNum);
}
var Kings = [PIECES.wK, PIECES.bK];
var CastlePerm = [
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 13, 15, 15, 15, 12, 15, 15, 14, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
    15, 7, 15, 15, 15, 3, 15, 15, 11, 15,
    15, 15, 15, 15, 15, 15, 15, 15, 15, 15
];
function FROMSQ(m) {
    return (m & 0x7F);
}
function TOSQ(m) {
    return ((m >> 7) & 0x7F);
}
function CAPTURED(m) {
    return ((m >> 14) & 0xF);
}
function PROMOTED(m) {
    return ((m >> 20) & 0xF);
}
var MFLAGEP = 0x40000;
var MFLAGPS = 0x80000;
var MFLAGCA = 0x100000;
var MFLAGCAP = 0x7C000;
var MFLAGPROM = 0xF00000;
var NOMOVE = 0;
function SQOFFBOARD(sq) {
    if (FilesBrd[sq] == SQUARES.OFFBOARD)
        return BOOL.TRUE;
    return BOOL.FALSE;
}
function HASH_PCE(pce, sq) {
    GameBoard.posKey ^= PieceKeys[(pce * 120) + sq];
}
function HASH_CA() {
    GameBoard.posKey ^= CastleKeys[GameBoard.castlePerm];
}
function HASH_SIDE() {
    GameBoard.posKey ^= SideKey;
}
function HASH_EP() {
    GameBoard.posKey ^= PieceKeys[GameBoard.enPas];
}
