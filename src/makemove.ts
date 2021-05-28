function ClearPiece(sq: number) {
    let pce = GameBoard.pieces[sq];
    let col = PieceCol[pce];
    let index;
    let t_pceNum = -1;
    HASH_PCE(pce, sq);
    GameBoard.pieces[sq] = PIECES.EMPTY;
    GameBoard.marterial[col] -= PieceVal[pce];
    for (index = 0; index < GameBoard.pecNum[pce]; ++index) {
        if (GameBoard.pList[PCEINDEX(pce, index)] == sq) {
            t_pceNum = index;
            break;
        }
    }
    GameBoard.pecNum[pce]--;
    GameBoard.pList[PCEINDEX(pce, t_pceNum)] = GameBoard.pList[PCEINDEX(pce, GameBoard.pecNum[pce])];
}
function AddPiece(sq: number, pce: number) {
    let col = PieceCol[pce];
    HASH_PCE(pce, sq);
    GameBoard.pieces[sq] = pce;
    GameBoard.marterial[col] += PieceVal[pce];
    GameBoard.pList[PCEINDEX(pce, GameBoard.pecNum[pce])] = sq;
    GameBoard.pecNum[pce]++;
}
function MovePiece(from: number, to: number) {
    let index;
    let pce = GameBoard.pieces[from];
    HASH_PCE(pce, from);
    GameBoard.pieces[from] = PIECES.EMPTY;
    HASH_PCE(pce, to);
    GameBoard.pieces[to] = pce;
    for (index = 0; index < GameBoard.pecNum[pce]; ++index) {
        if (GameBoard.pList[PCEINDEX(pce, index)] == from) {
            GameBoard.pList[PCEINDEX(pce, index)] = to;
            break;
        }
    }
}

function MakeMove(move: number) {
    let from = FROMSQ(move);
    let to = TOSQ(move);
    let side = GameBoard.side;
    GameBoard.history[GameBoard.hisPly].posKey = GameBoard.posKey;
    if ((move & MFLAGEP) != 0) {
        if (side == COLOURS.WHITE) {
            ClearPiece(to - 10);
        } else {
            ClearPiece(to + 10);
        }
    } else if ((move & MFLAGCA) != 0) {
        switch (to) {
            case SQUARES.C1:
                MovePiece(SQUARES.A1, SQUARES.D1);
                break;
            case SQUARES.C8:
                MovePiece(SQUARES.A8, SQUARES.D8);
                break;
            case SQUARES.G1:
                MovePiece(SQUARES.H1, SQUARES.F1);
                break;
            case SQUARES.G8:
                MovePiece(SQUARES.H8, SQUARES.F8);
                break;
            default: break;
        }
    }
    if (GameBoard.enPas != SQUARES.NO_SQ) HASH_EP();
    HASH_CA();
    GameBoard.history[GameBoard.hisPly].move = move;
    GameBoard.history[GameBoard.hisPly].fiftyMove = GameBoard.fiftyMove;
    GameBoard.history[GameBoard.hisPly].enPas = GameBoard.enPas;
    GameBoard.history[GameBoard.hisPly].castlePerm = GameBoard.castlePerm;
    GameBoard.castlePerm &= CastlePerm[from];
    GameBoard.castlePerm &= CastlePerm[to];
    GameBoard.enPas = SQUARES.NO_SQ;
    HASH_CA();
    let captured = CAPTURED(move);
    GameBoard.fiftyMove++;
    if (captured != PIECES.EMPTY) {
        ClearPiece(to);
        GameBoard.fiftyMove = 0;
    }
    GameBoard.hisPly++;
    GameBoard.ply++;
    if (PiecePawn[GameBoard.pieces[from]] == BOOL.TRUE) {
        GameBoard.fiftyMove = 0;
        if ((move & MFLAGPS) != 0) {
            if (side == COLOURS.WHITE) {
                GameBoard.enPas = from + 10;
            } else {
                GameBoard.enPas = from - 10;
            }
            HASH_EP();
        }
    }
    MovePiece(from, to);
    let prPce = PROMOTED(move);
    if (prPce != PIECES.EMPTY) {
        ClearPiece(to);
        AddPiece(to, prPce);
    }
    GameBoard.side ^= 1;
    HASH_SIDE();
    if (SqAttacked(GameBoard.pList[PCEINDEX(Kings[side], 0)], GameBoard.side)) {
        return BOOL.FALSE;
    }
    return BOOL.TRUE;
}