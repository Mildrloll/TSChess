enum PIECES { EMPTY = 0, wP = 1, wN = 2, wB = 3, wR = 4, wQ = 5, wK = 6, bP = 7, bN = 8, bB = 9, bR = 10, bQ = 11, bK = 12 };
const BRD_SQ_NUM = 120;
enum FILES { FILE_A = 0, FILE_B = 1, FILE_C = 2, FILE_D = 3, FILE_E = 4, FILE_F = 5, FILE_G = 6, FILE_H = 7, FILE_NONE = 8 };
enum RANKS { RANK_1 = 0, RANK_2 = 1, RANK_3 = 2, RANK_4 = 3, RANK_5 = 4, RANK_6 = 5, RANK_7 = 6, RANK_8 = 7, RANK_NONE = 8 };
enum COLOURS { WHITE = 0, BLACK = 1, BOTH = 2 };
enum CASTLBIT { WKCA = 1, WQCA = 2, BKCA = 4, BQCA = 8 }
enum SQUARES { A1 = 21, B1 = 22, C1 = 23, D1 = 24, E1 = 25, F1 = 26, G1 = 27, H1 = 28, A8 = 91, B8 = 92, C8 = 93, D8 = 94, E8 = 95, F8 = 96, G8 = 97, H8 = 98, NO_SQ = 99, OFFBOARD = 100 };
enum BOOL { FALSE = 0, TRUE = 1 };
const MAXGAMEMOVES = 2048;
const MAXPOSITIONMOVES = 256;
const MAXDEPTH = 64;
const FilesBrd = new Array(BRD_SQ_NUM);
const RanksBrd = new Array(BRD_SQ_NUM);
const START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const PecChar = ".PNBRQKpnbrqk";
const SideChar = "wb-";
const RankChar = "12345678";
const FileChar = "abcdefgh";
function FR2SQ(f: number, r: number) {
    return ((21 + (f)) + ((r) * 10));
}
const PieceBig = [BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE];
const PieceMaj = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE];
const PieceMin = [BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE];
const PieceVal = [0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000];
const PieceCol = [COLOURS.BOTH, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK];
const PiecePawn = [BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE];
const PieceKnight = [BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE];
const PieceKing = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE];
const PieceRookQueen = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE];
const PieceBishopQueen = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE];
const PieceSlides = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE];
const KnDir = [-8, -19, -21, -12, 8, 19, 21, 12];
const RkDir = [-1, -10, 1, 10];
const BiDir = [-9, -11, 11, 9];
const KiDir = [-1, -10, 1, 10, -9, -11, 9, 11];
const DirNum = [0, 0, 8, 4, 4, 8, 8, 0, 8, 4, 4, 8, 8];
const PceDir: any = [0, 0, KnDir, BiDir, RkDir, KiDir, KiDir, 0, KnDir, BiDir, RkDir, KiDir, KiDir];
const LoopNonSlidePce = [PIECES.wN, PIECES.wK, 0, PIECES.bN, PIECES.bK, 0];
const LoopNonSlideIndex = [0, 3];
const LoopSlidePce = [PIECES.wB, PIECES.wR, PIECES.wQ, 0, PIECES.bB, PIECES.bR, PIECES.bQ, 0];
const LoopSlideIndex = [0, 4];
const PieceKeys = new Array(14 * 120);
let SideKey: number;
const CastleKeys = new Array(16);
const Sq120To64 = new Array(BRD_SQ_NUM);
const Sq64To120 = new Array(64);
function RAND_32() {
    return (Math.floor((Math.random() * 255) + 1) << 23) | (Math.floor((Math.random() * 255) + 1) << 16) | (Math.floor((Math.random() * 255) + 1) << 8) | Math.floor((Math.random() * 255) + 1);
}
function SQ64(sq120: number) {
    return Sq120To64[(sq120)];
}
function SQ120(sq64: number) {
    return Sq64To120[(sq64)];
}
function PCEINDEX(pce: number, pecNum: number) {
    return (pce * 10 + pecNum);
}
const Kings = [PIECES.wK, PIECES.bK];
const CastlePerm = [
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
function FROMSQ(m: number) {
    return (m & 0x7F);
}
function TOSQ(m: number) {
    return ((m >> 7) & 0x7F);
}
function CAPTURED(m: number) {
    return ((m >> 14) & 0xF);
}
function PROMOTED(m: number) {
    return ((m >> 20) & 0xF);
}
const MFLAGEP = 0x40000;
const MFLAGPS = 0x80000;
const MFLAGCA = 0x100000;
const MFLAGCAP = 0x7C000;
const MFLAGPROM = 0xF00000;
const NOMOVE = 0;
function SQOFFBOARD(sq: number) {
    if (FilesBrd[sq] == SQUARES.OFFBOARD) return BOOL.TRUE;
    return BOOL.FALSE;
}
function HASH_PCE(pce: number, sq: number) {
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
