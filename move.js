// called every move
function move(cur, next, test){
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    if (checkForUnrealMove(cur, next)) {return 0};
    if (checkForTurn(curElem)) {return 0};
    if (checkForRealMove(curElem)) {return 0};
    if (checkForCaptureOwnPiece(curElem, nextElem)) {return 0};
    if (checkForChecks(cur, next)) {return 0};

    if (curElem.innerText == pawn) {
        if (checkForPawns(cur, next)) {return 0};
    }

    if (curElem.innerText == rook) {
        if (checkForRooks(cur, next, 'rook')) {return 0};
    }

    if (curElem.innerText == knight) {
        if (checkForKnights(cur, next)) {return 0};
    }

    if (curElem.innerText == bishop) {
        if(checkForBishops(cur, next, 'bishop')) {return 0};
        if(checkForBishopBlockers(cur, next, 'bishop')) {return 0};
    }

    if (curElem.innerText == queen) {
        if(checkForQueens(cur, next)) {return 0};
    }

    if (curElem.innerText == king) {
        if(checkForKings(cur, next)) {return 0};
    }

    if (test == 0) {
        nextElem.innerHTML = curElem.innerHTML;
        curElem.innerHTML = ''
        checkForChecksForCheckmate(cur, next);
        if (turn % 2 == 0) {
            flip = 0;
            boardFlip();
        } else {
            flip = 1;
            boardFlip();
        }
        turn += 1
    }    

    console.log(turn)
    return 1;
}