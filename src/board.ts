function PCEINDEX(pce: number, pecNum: number) {
    return (pce * 10 + pecNum);
}
let GameBoard = { pieces: Array(0), side: 0, fiftyMove: 0, hisPly: 0, ply: 0, enPas: 0, castlePerm: 0, marterial: Array(0), pecNum: Array(0), pList: Array(0), posKey: 0, moveList: Array(0), moveScores: Array(0), moveListStart: Array(0) };
GameBoard.pieces = new Array(BRD_SQ_NUM);
GameBoard.side = COLOURS.WHITE;
GameBoard.fiftyMove = 0;
GameBoard.hisPly = 0;
GameBoard.ply = 0;
GameBoard.enPas = 0
GameBoard.castlePerm = 0;
GameBoard.marterial = new Array(2);
GameBoard.pecNum = new Array(13);
GameBoard.pList = new Array(14 * 10);
GameBoard.posKey = 0;
GameBoard.moveList = new Array(MAXDEPTH * MAXPOSITIONMOVES);
GameBoard.moveScores = new Array(MAXDEPTH * MAXPOSITIONMOVES);
GameBoard.moveListStart = new Array(MAXDEPTH);
function PrintBoard() {
    let sq, file, rank, piece;
    console.log("\nGame Board:\n");
    for (rank = RANKS.RANK_8; rank >= RANKS.RANK_1; rank--) {
        let line = (RankChar[rank] + "  ");
        for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
            sq = FR2SQ(file, rank);
            piece = GameBoard.pieces[sq];
            line += (" " + PecChar[piece] + " ");
        }
        console.log(line);
    }
    console.log("");
    let line = "   ";
    for (file = FILES.FILE_A; file <= FILES.FILE_H; file++) {
        line += (' ' + FileChar[file] + ' ');
    }
    console.log(line);
    console.log("side:" + SideChar[GameBoard.side]);
    console.log("enPas:" + GameBoard.enPas);
    line = "";
    if (GameBoard.castlePerm & CASTLBIT.WKCA) line += 'K';
    if (GameBoard.castlePerm & CASTLBIT.WQCA) line += 'Q';
    if (GameBoard.castlePerm & CASTLBIT.BKCA) line += 'k';
    if (GameBoard.castlePerm & CASTLBIT.BQCA) line += 'q';
    console.log("castle:" + line);
    console.log("key:" + GameBoard.posKey.toString(16));
}
function GeneratePosKeys() {
    let finalKey = 0;
    let piece = PIECES.EMPTY;
    for (let sq = 0; sq < BRD_SQ_NUM; ++sq) {
        piece = GameBoard.pieces[sq];
        if (piece != PIECES.EMPTY) {
            finalKey ^= PieceKeys[(piece * 120) + sq];
        }
    }
    if (GameBoard.side == COLOURS.WHITE) {
        finalKey ^= SideKey;
    }
    if (GameBoard.enPas != SQUARES.NO_SQ) {
        finalKey ^= PieceKeys[GameBoard.enPas];
    }
    finalKey ^= CastleKeys[GameBoard.castlePerm];
    return finalKey;
}
function PrintPieceLists() {
    let piece, pceNum;
    for (piece = PIECES.wP; piece <= PIECES.bK; ++piece) {
        for (pceNum = 0; pceNum < GameBoard.pecNum[piece]; ++pceNum) {
            console.log('Piece ' + PecChar[piece] + ' on ' + PrSq(GameBoard.pList[PCEINDEX(piece, pceNum)]));
        }
    }
}
function UpdateListsMaterial() {
    let piece, sq, index, colour;
    for (index = 0; index < 14 * 120; ++index) {
        GameBoard.pList[index] = PIECES.EMPTY;
    }
    for (index = 0; index < 2; ++index) {
        GameBoard.marterial[index] = 0;
    }
    for (index = 0; index < 13; ++index) {
        GameBoard.pecNum[index] = 0;
    }
    for (index = 0; index < 64; ++index) {
        sq = SQ120(index);
        piece = GameBoard.pieces[sq];
        if (piece != PIECES.EMPTY) {
            colour = PieceCol[piece];
            GameBoard.marterial[colour] += PieceVal[piece];
            GameBoard.pList[PCEINDEX(piece, GameBoard.pecNum[piece])] = sq;
            GameBoard.pecNum[piece]++;
        }
    }
    PrintPieceLists();
}
function ResetBoard() {
    let index;
    for (index = 0; index < BRD_SQ_NUM; ++index) {
        GameBoard.pieces[index] = SQUARES.OFFBOARD;
    }
    for (index = 0; index < 64; ++index) {
        GameBoard.pieces[SQ120(index)] = PIECES.EMPTY;
    }
    GameBoard.side = COLOURS.WHITE;
    GameBoard.enPas = SQUARES.NO_SQ;
    GameBoard.fiftyMove = 0;
    GameBoard.ply = 0;
    GameBoard.hisPly = 0;
    GameBoard.castlePerm = 0;
    GameBoard.posKey = 0;
    GameBoard.moveListStart[GameBoard.ply] = 0;
}
function ParseFen(fen: string) {
    ResetBoard();
    let rank = RANKS.RANK_8;
    let file = FILES.FILE_A;
    let piece;
    let count;
    let i;
    let sq120;
    let fenCnt = 0;
    while ((rank >= RANKS.RANK_1) && fenCnt < fen.length) {
        count = 1;
        switch (fen[fenCnt]) {
            case 'p': piece = PIECES.bP; break;
            case 'r': piece = PIECES.bR; break;
            case 'n': piece = PIECES.bN; break;
            case 'b': piece = PIECES.bB; break;
            case 'k': piece = PIECES.bK; break;
            case 'q': piece = PIECES.bQ; break;
            case 'P': piece = PIECES.wP; break;
            case 'R': piece = PIECES.wR; break;
            case 'N': piece = PIECES.wN; break;
            case 'B': piece = PIECES.wB; break;
            case 'K': piece = PIECES.wK; break;
            case 'Q': piece = PIECES.wQ; break;
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
                piece = PIECES.EMPTY;
                count = fen[fenCnt].charCodeAt(0) - '0'.charCodeAt(0);
                break;
            case '/':
            case ' ':
                rank--;
                file = FILES.FILE_A;
                fenCnt++;
                continue;
            default:
                console.log("FEN Error");
                return;
        }
        for (i = 0; i < count; i++) {
            sq120 = FR2SQ(file, rank);
            GameBoard.pieces[sq120] = piece;
            file++;
        }
        fenCnt++;
    }
    GameBoard.side = (fen[fenCnt] == 'w') ? COLOURS.WHITE : COLOURS.BLACK;
    fenCnt += 2;
    for (i = 0; i < 4; i++) {
        if (fen[fenCnt] == ' ') {
            break;
        }
        switch (fen[fenCnt]) {
            case 'K': GameBoard.castlePerm |= CASTLBIT.WKCA; break;
            case 'Q': GameBoard.castlePerm |= CASTLBIT.WQCA; break;
            case 'k': GameBoard.castlePerm |= CASTLBIT.BKCA; break;
            case 'q': GameBoard.castlePerm |= CASTLBIT.BQCA; break;
            default: break;
        }
        fenCnt++;
    }
    fenCnt++;
    if (fen[fenCnt] != '-') {
        file = fen[fenCnt].charCodeAt(0) - 'a'.charCodeAt(0);
        rank = fen[fenCnt + 1].charCodeAt(0) - '1'.charCodeAt(0);
        console.log("fen[fenCnt]:" + fen[fenCnt] + "File:" + file + " Rank:" + rank);
        GameBoard.enPas = FR2SQ(file, rank);
    }
    GameBoard.posKey = GeneratePosKeys();
    UpdateListsMaterial();
}