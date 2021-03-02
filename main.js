const pawn = 'p'
const bishop = 'B'
const knight = 'N'
const rook = 'R'
const queen = 'Q'
const king = 'K'

var turn = 0; // even = white, odd = black

var white_castle_right = 1 // 1 = true, 0 = false
var white_castle_left = 1 
var black_castle_right = 1 
var black_castle_left = 1 



function showError(message){
    alert(message)
}



// called every move
function move(cur, next){
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

    if (checkForChecksForCheckmate(cur, next)) {return 0};

    nextElem.innerHTML = curElem.innerHTML;
    curElem.innerHTML = '';

    turn += 1
}



function checkForUnrealMove(cur, next){
    letterAsNumber(Array.from(cur)[0]);
    letterAsNumber(Array.from(next)[0]);

    let curNumber = Number(Array.from(cur)[1]);
    let nextNumber = Number(Array.from(next)[1]);

    if (curNumber < 1 || curNumber > 8 || nextNumber < 1 || nextNumber > 8){
        showError('That square does note exits')
        return 1;
    }
}



function checkForTurn(curElem){
    if (turn % 2 == 0 && curElem.innerHTML.search('black') > 0){
        showError("White's turn")
        return 1;
    }
    else if (turn % 2 != 0 && curElem.innerHTML.search('white') > 0){
        showError("Black's turn")
        return 1;
    }
}



function checkForRealMove(curElem){
    if (curElem.innerText == ''){
        showError('No Piece There');
        return 1;
    }
}



function checkForCaptureOwnPiece(curElem, nextElem){
    if (curElem.innerHTML.search('white') > 0 && nextElem.innerHTML.search('white') > 0){ // for white
        showError('Cannot take own piece');
        return 1;
    } 
    else if (curElem.innerHTML.search('black') > 0 && nextElem.innerHTML.search('black') > 0) { // for black
        showError('Cannot take own piece');
        return 1;
    }
}



function checkForChecks(cur, next){
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    // temporarily do the move to analyze position after move
    let curTempElem = curElem.innerHTML;
    let nextTempElem = nextElem.innerHTML;

    nextElem.innerHTML = curElem.innerHTML;
    curElem.innerHTML = '';

    let color;
    let opoColor;
    turn % 2 == 0 ? color = 'white' : color = 'black';
    color == 'white' ? opoColor = 'black' : opoColor = 'white';

        
    for (i = 1; i <= 8; i++){
        for (j = 1; j <= 8; j++){
            if (document.getElementById(numberAsLetter(j) + String(i)).innerText == king &&
                document.getElementById(numberAsLetter(j) + String(i)).innerHTML.search(color) > 0){
                    var tempX = j;
                    var tempY = i;
                    break;
                }
        }
    }


    // verticals
    if (tempY == 1){
        for (i = tempY + 1; i <= 8; i++){
            if (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(color) > 0){
                break;
            }
            else if (
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText == rook ||
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen
            ){
                showError('cannot put yourself in check');
                nextElem.innerHTML = nextTempElem;
                curElem.innerHTML = curTempElem;
                return 1;
            }
        }
    } else if (tempY == 8){
        for (i = tempY - 1; i >= 1; i--){
            if (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(color) > 0){
                break;
            }
            else if (
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText == rook ||
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen
            ){
                showError('cannot put yourself in check');
                nextElem.innerHTML = nextTempElem;
                curElem.innerHTML = curTempElem;
                return 1;
            }
        }
    } else {
        // above
        for (i = tempY + 1; i <= 8; i++){
            if (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(color) > 0){
                break;
            }
            else if (
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText == rook ||
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen
            ){
                showError('cannot put yourself in check');
                nextElem.innerHTML = nextTempElem;
                curElem.innerHTML = curTempElem;
                return 1;
            }
        }
        // below
        for (i = tempY - 1; i >= 1; i--){
            if (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(color) > 0){
                break;
            }
            else if (
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText == rook ||
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen
            ){
                showError('cannot put yourself in check');
                nextElem.innerHTML = nextTempElem;
                curElem.innerHTML = curTempElem;
                return 1;
            }
        }
    }

    // horizontals
    if (tempX == 1){
        for (i = tempX + 1; i <= 8; i++){
            if (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(color) > 0){
                break;
            }
            else if (
            document.getElementById(numberAsLetter(i) + String(tempY)).innerText == rook ||
            document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen
            ){
                showError('cannot put yourself in check');
                nextElem.innerHTML = nextTempElem;
                curElem.innerHTML = curTempElem;
                return 1;
            }
        }
    } else if (tempX == 8){
        for (i = tempX - 1; i >= 1; i--){
            if (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(color) > 0){
                break;
            }
            else if (
            document.getElementById(numberAsLetter(i) + String(tempY)).innerText == rook ||
            document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen
            ){
                showError('cannot put yourself in check');
                nextElem.innerHTML = nextTempElem;
                curElem.innerHTML = curTempElem;
                return 1;
            }
        }
    } else {
        // above
        for (i = tempX + 1; i <= 8; i++){
            if (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(color) > 0){
                break;
            }
            else if (
            document.getElementById(numberAsLetter(i) + String(tempY)).innerText == rook ||
            document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen
            ){
                showError('cannot put yourself in check');
                nextElem.innerHTML = nextTempElem;
                curElem.innerHTML = curTempElem;
                return 1;
            }
        }
        // below
        for (i = tempX - 1; i >= 1; i--){
            if (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(color) > 0){
                break;
            }
            else if (
            document.getElementById(numberAsLetter(i) + String(tempY)).innerText == rook ||
            document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen
            ){
                showError('cannot put yourself in check');
                nextElem.innerHTML = nextTempElem;
                curElem.innerHTML = curTempElem;
                return 1;
            }
        }
    }

    // knights
    try {
        // right up
        if (
        document.getElementById(numberAsLetter(tempX + 2) + String(tempY + 1)).innerText == knight && document.getElementById(numberAsLetter(tempX + 2) + String(tempY + 1)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    } catch(e) {

    }
    try {
        // right down
        if (
        document.getElementById(numberAsLetter(tempX + 2) + String(tempY - 1)).innerText == knight && document.getElementById(numberAsLetter(tempX + 2) + String(tempY - 1)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    } catch(e) {

    }
    try {
        // left up
        if (
        document.getElementById(numberAsLetter(tempX - 2) + String(tempY + 1)).innerText == knight && document.getElementById(numberAsLetter(tempX - 2) + String(tempY + 1)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    } catch (e) {

    }
    try {
        // left down
        if (
        document.getElementById(numberAsLetter(tempX - 2) + String(tempY - 1)).innerText == knight && document.getElementById(numberAsLetter(tempX - 2) + String(tempY - 1)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    } catch (e) {

    }
    try {
        // up right
        if (
        document.getElementById(numberAsLetter(tempX + 1) + String(tempY + 2)).innerText == knight && document.getElementById(numberAsLetter(tempX + 1) + String(tempY + 2)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    } catch (e) {

    }
    try {
        // up left
        if (
        document.getElementById(numberAsLetter(tempX - 1) + String(tempY + 2)).innerText == knight && document.getElementById(numberAsLetter(tempX - 1) + String(tempY + 2)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    } catch (e) {

    }
    try {
        // down right
        if (
        document.getElementById(numberAsLetter(tempX + 1) + String(tempY - 2)).innerText == knight && document.getElementById(numberAsLetter(tempX + 1) + String(tempY - 2)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    } catch (e) {

    }
    try {
        // down left
        if (
        document.getElementById(numberAsLetter(tempX - 1) + String(tempY - 2)).innerText == knight && document.getElementById(numberAsLetter(tempX - 1) + String(tempY - 2)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    } catch (e) {

    }

    // diagonals
    var stop1 = 0;
    var stop2 = 0;
    var stop3 = 0;
    var stop4 = 0;
    for (i = 1; i <= 8; i++){
        // up and right
        if (tempX + i <= 8 && tempY + i <= 8){
            if (stop1){}
            else if (
                document.getElementById(numberAsLetter(tempX + i) + String(tempY + i)).innerHTML.search(color) > 0
            ){
                stop1 = 1;
            }
            else {
                if (document.getElementById(numberAsLetter(tempX + i) + String(tempY + i)).innerText == queen ||
                document.getElementById(numberAsLetter(tempX + i) + String(tempY + i)).innerText == bishop){
                        showError('You will be in check');
                        nextElem.innerHTML = nextTempElem;
                        curElem.innerHTML = curTempElem;
                        return 1;
                }
            }
    }

        // down and left
        if (tempX - i >= 1 && tempY - i >= 1){
            if (stop2){}
            else if (
                document.getElementById(numberAsLetter(tempX - i) + String(tempY - i)).innerHTML.search(color) > 0
            ){
                stop2 = 1;
            }
            else {
                if (document.getElementById(numberAsLetter(tempX - i) + String(tempY - i)).innerText == queen ||
                document.getElementById(numberAsLetter(tempX - i) + String(tempY - i)).innerText == bishop){
                        showError('You will be in check');
                        nextElem.innerHTML = nextTempElem;
                        curElem.innerHTML = curTempElem;
                        return 1;
                }
            }
    }

        // up and left
        if (tempX - i >= 1 && tempY + i <= 8){
            if (stop3){}
            else if (
                document.getElementById(numberAsLetter(tempX - i) + String(tempY + i)).innerHTML.search(color) > 0
            ){
                stop3 = 1;
            }
            else {
                if (document.getElementById(numberAsLetter(tempX - i) + String(tempY + i)).innerText == queen ||
                document.getElementById(numberAsLetter(tempX - i) + String(tempY + i)).innerText == bishop){
                        showError('You will be in check');
                        nextElem.innerHTML = nextTempElem;
                        curElem.innerHTML = curTempElem;
                        return 1;
                }
            }
    }

        // down and right
        if (tempX + i <= 8 && tempY - i >= 1){
            if (stop4){}
            else if (
                document.getElementById(numberAsLetter(tempX + i) + String(tempY - i)).innerHTML.search(color) > 0
            ){
                stop4 = 1;
            }
            else {
                if (document.getElementById(numberAsLetter(tempX + i) + String(tempY - i)).innerText == queen ||
                document.getElementById(numberAsLetter(tempX + i) + String(tempY - i)).innerText == bishop){
                        showError('You will be in check');
                        nextElem.innerHTML = nextTempElem;
                        curElem.innerHTML = curTempElem;
                        return 1;
                }
            }
    }
    
    }

    // pawns
    var pawnDirection;
    color == 'white' ? pawnDirection = 1 : pawnDirection = -1;
    try {
        if  (
            document.getElementById(numberAsLetter(tempX + 1) + String(tempY + pawnDirection)).innerText == pawn &&
            document.getElementById(numberAsLetter(tempX + 1) + String(tempY + pawnDirection)).innerHTML.search(opoColor) > 0
            ){
                showError('You will be in check');
                nextElem.innerHTML = nextTempElem;
                curElem.innerHTML = curTempElem;
                return 1;
            }
    } catch (e){

    }
    try {
        if  (
            document.getElementById(numberAsLetter(tempX - 1) + String(tempY + pawnDirection)).innerText == pawn &&
            document.getElementById(numberAsLetter(tempX - 1) + String(tempY + pawnDirection)).innerHTML.search(opoColor) > 0
            ){
            showError('You will be in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    } catch (e) {

    }

    // untemp
    nextElem.innerHTML = nextTempElem;
    curElem.innerHTML = curTempElem;
}


function checkForPawns(cur, next){
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    let curNumber = Number(Array.from(cur)[1]);
    let curLetter = Array.from(cur)[0];
    let curLetterAsNumber = letterAsNumber(curLetter);

    let nextNumber = Number(Array.from(next)[1]);
    let nextLetter = Array.from(next)[0];
    let nextLetterAsNumber = letterAsNumber(nextLetter);

    // pawn rules
    if (curElem.innerText === pawn && curElem.innerHTML.search('white') > 0) { // for white
        // checks for moving backwards or too many spaces
        if (nextNumber > (curNumber + 2) || nextNumber < curNumber) {
            showError('illegal move1');
            return 1;
        }

        // checks if you can go more than 1 space
        if (curNumber != 2){
            if(nextNumber > curNumber + 1){
                showError('Can only go 2 space with pawns on first move');
                return 1;
            }
        } else {
            if (document.getElementById(curLetter + String(nextNumber - 1)).innerText != '' && nextNumber == curNumber + 2){
                showError('illegalmove pawn select two');
                return 1;
            }
        }

        // checks diagonal captures
        if (curLetterAsNumber != nextLetterAsNumber){
            if (nextNumber != curNumber+1){
                showError('illegal move2');
                return 1;
            }
            if (nextElem.innerText == ''){
                showError('illegal move3');
                return 1;
            }
        }
    } 
    else if (curElem.innerText === pawn && curElem.innerHTML.search('black') > 0) { // for black
        if (nextNumber < (curNumber - 2) || nextNumber > curNumber) {
            showError('illegal move4');
            return 1;
        }

        if (curNumber != 7){
            if(nextNumber > curNumber - 1){
                showError('Can only go 2 space with pawns on first move');
                return 1;
            }
        } else {
            if (document.getElementById(curLetter + String(nextNumber + 1)).innerText != '' && nextNumber == curNumber - 2){
                showError('illegalmove pawn select two');
                return 1;
            }
        }

        if (curLetterAsNumber != nextLetterAsNumber){
            if (nextNumber != curNumber-1){
                showError('illegal move5');
                return 1;
            }
            if (nextElem.innerText == ''){
                showError('illegal move6');
                return 1;
            }
        }

    }

    // checks for illegal horizontal moves
    if (nextLetterAsNumber > curLetterAsNumber + 1 || nextLetterAsNumber < curLetterAsNumber - 1){
        showError('illegal move7');
        return 1;
    }
    if (nextLetterAsNumber != curLetterAsNumber && curNumber === nextNumber){
        showError('illegal move8');
        return 1;
    }

    // stops you from taking non-diagonally
    if (nextElem.innerText != ''){
        if (curLetterAsNumber == nextLetterAsNumber){
            showError('Can only capture diagonally with pawns');
            return 1;
        }
    }
}




function checkForRooks(cur, next, piece){
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    let curNumber = Number(Array.from(cur)[1]);
    let curLetter = Array.from(cur)[0];
    let curLetterAsNumber = letterAsNumber(curLetter);

    let nextNumber = Number(Array.from(next)[1]);
    let nextLetter = Array.from(next)[0];
    let nextLetterAsNumber = letterAsNumber(nextLetter);

    // checks for diagonals
    if (piece == 'rook'){
        if (curNumber != nextNumber && curLetterAsNumber != nextLetterAsNumber){
            showError('rooks cannot go diagonal ')
        }
    }

    // checks for vertical blockers
    if (nextNumber > curNumber + 1){

        for (iCurNumber = curNumber + 1; iCurNumber < nextNumber; iCurNumber++){
            if (document.getElementById(curLetter + String(iCurNumber)).innerText != ''){
                showError(piece + ' path is blocked');
                return 1;
            }
        }
    } else if (nextNumber < curNumber - 1) {

        for (iCurNumber = curNumber - 1; iCurNumber > nextNumber; iCurNumber--){
            if (document.getElementById(curLetter + String(iCurNumber)).innerText != ''){
                showError(piece + ' path is blocked');
                return 1;
            }
        }
    }

    // checks for horizontal blockers
    if (nextLetterAsNumber > curLetterAsNumber + 1){
        console.log('here')

        for (iCurLetter = curLetterAsNumber + 1; iCurLetter < nextLetterAsNumber; iCurLetter++){
            if (document.getElementById(numberAsLetter(iCurLetter) + String(curNumber)).innerText != ''){
                showError(piece + ' path is blocked');
                return 1;
            }
        }
    } else if (nextLetterAsNumber < curLetterAsNumber - 1){

        for (iCurLetter = curLetterAsNumber - 1; iCurLetter > nextLetterAsNumber; iCurLetter--){
            if (document.getElementById(numberAsLetter(iCurLetter) + String(curNumber)).innerText != ''){
                showError(piece + ' path is blocked');
                return 1;
            }
        }
    }
}



function checkForKnights(cur, next){
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    let curNumber = Number(Array.from(cur)[1]);
    let curLetter = Array.from(cur)[0];
    let curLetterAsNumber = letterAsNumber(curLetter);

    let nextNumber = Number(Array.from(next)[1]);
    let nextLetter = Array.from(next)[0];
    let nextLetterAsNumber = letterAsNumber(nextLetter);

    // move to the left or right
    if (nextLetterAsNumber == curLetterAsNumber - 2 || nextLetterAsNumber == curLetterAsNumber + 2){
        if (nextNumber == curNumber + 1 || nextNumber == curNumber - 1){
            return 0;
        }
    }

    // move up or down
    if (nextNumber == curNumber - 2 || nextNumber == curNumber + 2){
        if (nextLetterAsNumber == curLetterAsNumber + 1 || nextLetterAsNumber == curLetterAsNumber - 1){
            return 0;
        }
    }

    showError('Illegal Knight Move');
    return 1;
}




function checkForBishops(cur, next, piece){
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    let curNumber = Number(Array.from(cur)[1]);
    let curLetter = Array.from(cur)[0];
    let curLetterAsNumber = letterAsNumber(curLetter);

    let nextNumber = Number(Array.from(next)[1]);
    let nextLetter = Array.from(next)[0];
    let nextLetterAsNumber = letterAsNumber(nextLetter);

    let curLoopLetterNumber = curLetterAsNumber;
    let curLoopNumber = curNumber;

    // up and to the right
    if (nextLetterAsNumber > curLetterAsNumber && nextNumber > curNumber){
        for (i = 1; i <= 8; i++){
            if (next == (numberAsLetter(curLoopLetterNumber) + String(curLoopNumber))){
                return 0;
            }

            if (curLoopLetterNumber + 1 > 8 || curLoopNumber + 1 > 8){
                break;
            }
            
            curLoopLetterNumber += 1;
            curLoopNumber += 1
        }
    }

    // down and to the left
    if (nextLetterAsNumber < curLetterAsNumber && nextNumber < curNumber){
        for (i = 8; i >= 1; i--){
            if (next == (numberAsLetter(curLoopLetterNumber) + String(curLoopNumber))){
                return 0;
            }

            if (curLoopLetterNumber - 1 < 1 || curLoopNumber - 1 < 1){
                break;
            }

            curLoopLetterNumber -= 1;
            curLoopNumber -= 1
        }
    }

    // up and to the left
    if (nextLetterAsNumber < curLetterAsNumber && nextNumber > curNumber){
        for (i = 1; i <= 8; i++){
            if (next == (numberAsLetter(curLoopLetterNumber) + String(curLoopNumber))){
                return 0;
            }

            if (curLoopLetterNumber - 1 < 1 || curLoopNumber + 1 > 8){
                break;
            }

            curLoopLetterNumber -= 1;
            curLoopNumber += 1
        }
    }

    // down and to the right
    if (nextLetterAsNumber > curLetterAsNumber && nextNumber < curNumber){
        for (i = 8; i >= 1; i--){
            if (next == (numberAsLetter(curLoopLetterNumber) + String(curLoopNumber))){
                return 0;
            }

            if (curLoopLetterNumber + 1 > 8 || curLoopNumber - 1 < 1){
                break;
            }

            curLoopLetterNumber += 1;
            curLoopNumber -= 1
        }
    }

    showError('Illegal ' + piece +  'move');
    return 1;
}



function checkForBishopBlockers(cur, next){
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    let curNumber = Number(Array.from(cur)[1]);
    let curLetter = Array.from(cur)[0];
    let curLetterAsNumber = letterAsNumber(curLetter);

    let nextNumber = Number(Array.from(next)[1]);
    let nextLetter = Array.from(next)[0];
    let nextLetterAsNumber = letterAsNumber(nextLetter);

    // up and right
    if (nextLetterAsNumber > curLetterAsNumber && nextNumber > curNumber){
        for (i = 1; i < (nextNumber - curNumber); i++){
            if (document.getElementById(numberAsLetter(curLetterAsNumber + i) + String(curNumber + i)).innerText != ''){
                showError(piece + ' cannot go through pieces');
                return 1;
            }
        }
    }

    // down and left
    if (nextLetterAsNumber < curLetterAsNumber && nextNumber < curNumber){
        for (i = 1; i < (curNumber - nextNumber); i++){
            if (document.getElementById(numberAsLetter(curLetterAsNumber - i) + String(curNumber - i)).innerText != ''){
                showError(piece + ' cannot go through pieces');
                return 1;
            }
        }
    }

    // up and left
    if (nextLetterAsNumber < curLetterAsNumber && nextNumber > curNumber){
        for (i = 1; i < (nextNumber - curNumber); i++){
            if (document.getElementById(numberAsLetter(curLetterAsNumber - i) + String(curNumber + i)).innerText != ''){
                showError(piece + ' cannot go through pieces');
                return 1;
            }
        }
    }

    // down and right
    if (nextLetterAsNumber > curLetterAsNumber && nextNumber < curNumber){
        for (i = 1; i < (curNumber - nextNumber); i++){
            if (document.getElementById(numberAsLetter(curLetterAsNumber + i) + String(curNumber - i)).innerText != ''){
                showError(piece + ' cannot go through pieces');
                return 1;
            }
        }
    }
}



function checkForQueens(cur, next){
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    let curNumber = Number(Array.from(cur)[1]);
    let curLetter = Array.from(cur)[0];
    // let curLetterAsNumber = letterAsNumber(curLetter);

    let nextNumber = Number(Array.from(next)[1]);
    let nextLetter = Array.from(next)[0];
    // let nextLetterAsNumber = letterAsNumber(nextLetter);

    if (curNumber == nextNumber || curLetter == nextLetter){
        if (checkForRooks(cur, next, 'queen')) {return 1}
        else {return 0};
    }

    if (checkForBishops(cur, next, 'queen')) {return 1};
    if (checkForBishopBlockers(cur, next, 'queen')) {return 1};
}



function checkForKings(cur, next){
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    let curNumber = Number(Array.from(cur)[1]);
    let curLetter = Array.from(cur)[0];
    let curLetterAsNumber = letterAsNumber(curLetter);

    let nextNumber = Number(Array.from(next)[1]);
    let nextLetter = Array.from(next)[0];
    let nextLetterAsNumber = letterAsNumber(nextLetter);

    // check for castle
    if (curElem.innerHTML.search('white') > 0) { // for white
        // if castle right
        if (nextLetterAsNumber == curLetterAsNumber + 2)
            {
                if (white_castle_right && 
                document.getElementById('f1').innerText == '' &&
                document.getElementById('g1').innerText == ''){
                    white_castle_right = 0;
                    white_castle_left = 0;
                    document.getElementById('f1').innerHTML = document.getElementById('h1').innerHTML;
                    document.getElementById('h1').innerHTML = '';
                    return 0;
                        
                }
            }
        // if castle left
        else if (nextLetterAsNumber == curLetterAsNumber -2)
            {
                if (white_castle_left && 
                document.getElementById('d1').innerText == '' &&
                document.getElementById('c1').innerText == '' &&
                document.getElementById('b1').innerText == ''){
                    white_castle_right = 0;
                    white_castle_left = 0;
                    document.getElementById('d1').innerHTML = document.getElementById('a1').innerHTML;
                    document.getElementById('a1').innerHTML = '';
                    return 0;
                        
                }
            }
    } 
    else if (curElem.innerHTML.search('black') > 0) { // for black
// if castle right
if (nextLetterAsNumber == curLetterAsNumber + 2)
{
    if (black_castle_right && 
    document.getElementById('f8').innerText == '' &&
    document.getElementById('g8').innerText == ''){
        black_castle_right = 0;
        black_castle_left = 0;
        document.getElementById('f8').innerHTML = document.getElementById('h1').innerHTML;
        document.getElementById('h8').innerHTML = '';
        return 0;
            
    }
}
// if castle left
else if (nextLetterAsNumber == curLetterAsNumber -2)
{
    if (black_castle_left && 
    document.getElementById('d8').innerText == '' &&
    document.getElementById('c8').innerText == '' &&
    document.getElementById('b8').innerText == ''){
        black_castle_right = 0;
        black_castle_left = 0;
        document.getElementById('d8').innerHTML = document.getElementById('a8').innerHTML;
        document.getElementById('a8').innerHTML = '';
        return 0;
            
    }
}
    }

    if (nextNumber > curNumber + 1 || nextNumber < curNumber - 1 ||
        nextLetterAsNumber > curLetterAsNumber + 1 || nextLetterAsNumber < curLetterAsNumber - 1){
            showError('Illegal King Move');
            return 1;
        }

    turn % 2 == 0 ? white_castle_left = 0 : black_castle_left = 0;
    turn % 2 == 0 ? white_castle_right = 0 : black_castle_right = 0;
}



function checkForChecksForCheckmate(cur, next){
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    // temporarily do the move to analyze position after move
    let curTempElem = curElem.innerHTML;
    let nextTempElem = nextElem.innerHTML;

    nextElem.innerHTML = curElem.innerHTML;
    curElem.innerHTML = '';

    let color;
    let opoColor;
    turn % 2 != 0 ? color = 'white' : color = 'black';
    color == 'white' ? opoColor = 'black' : opoColor = 'white';

        
    for (i = 1; i <= 8; i++){
        for (j = 1; j <= 8; j++){
            if (document.getElementById(numberAsLetter(j) + String(i)).innerText == king &&
                document.getElementById(numberAsLetter(j) + String(i)).innerHTML.search(color) > 0){
                    var tempX = j;
                    var tempY = i;
                    break;
                }
        }
    }


// verticals
if (tempY == 1){
    for (i = tempY + 1; i <= 8; i++){
        if (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(color) > 0){
            break;
        }
        else if (
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == rook ||
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen
        ){
            checkForCheckmates('cannot put yourself in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    }
} else if (tempY == 8){
    for (i = tempY - 1; i >= 1; i--){
        if (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(color) > 0){
            break;
        }
        else if (
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == rook ||
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen
        ){
            checkForCheckmates('cannot put yourself in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    }
} else {
    // above
    for (i = tempY + 1; i <= 8; i++){
        if (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(color) > 0){
            break;
        }
        else if (
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == rook ||
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen
        ){
            checkForCheckmates('cannot put yourself in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    }
    // below
    for (i = tempY - 1; i >= 1; i--){
        if (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(color) > 0){
            break;
        }
        else if (
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == rook ||
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen
        ){
            checkForCheckmates('cannot put yourself in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    }
}

// horizontals
if (tempX == 1){
    for (i = tempX + 1; i <= 8; i++){
        if (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(color) > 0){
            break;
        }
        else if (
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == rook ||
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen
        ){
            checkForCheckmates('cannot put yourself in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    }
} else if (tempX == 8){
    for (i = tempX - 1; i >= 1; i--){
        if (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(color) > 0){
            break;
        }
        else if (
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == rook ||
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen
        ){
            checkForCheckmates('cannot put yourself in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    }
} else {
    // above
    for (i = tempX + 1; i <= 8; i++){
        if (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(color) > 0){
            break;
        }
        else if (
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == rook ||
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen
        ){
            checkForCheckmates('cannot put yourself in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    }
    // below
    for (i = tempX - 1; i >= 1; i--){
        if (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(color) > 0){
            break;
        }
        else if (
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == rook ||
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen
        ){
            checkForCheckmates('cannot put yourself in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
    }
}

// knights
try {
    // right up
    if (
    document.getElementById(numberAsLetter(tempX + 2) + String(tempY + 1)).innerText == knight && document.getElementById(numberAsLetter(tempX + 2) + String(tempY + 1)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates('You will be in check');
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }
} catch(e) {

}
try {
    // right down
    if (
    document.getElementById(numberAsLetter(tempX + 2) + String(tempY - 1)).innerText == knight && document.getElementById(numberAsLetter(tempX + 2) + String(tempY - 1)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates('You will be in check');
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }
} catch(e) {

}
try {
    // left up
    if (
    document.getElementById(numberAsLetter(tempX - 2) + String(tempY + 1)).innerText == knight && document.getElementById(numberAsLetter(tempX - 2) + String(tempY + 1)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates('You will be in check');
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}
try {
    // left down
    if (
    document.getElementById(numberAsLetter(tempX - 2) + String(tempY - 1)).innerText == knight && document.getElementById(numberAsLetter(tempX - 2) + String(tempY - 1)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates('You will be in check');
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}
try {
    // up right
    if (
    document.getElementById(numberAsLetter(tempX + 1) + String(tempY + 2)).innerText == knight && document.getElementById(numberAsLetter(tempX + 1) + String(tempY + 2)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates('You will be in check');
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}
try {
    // up left
    if (
    document.getElementById(numberAsLetter(tempX - 1) + String(tempY + 2)).innerText == knight && document.getElementById(numberAsLetter(tempX - 1) + String(tempY + 2)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates('You will be in check');
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}
try {
    // down right
    if (
    document.getElementById(numberAsLetter(tempX + 1) + String(tempY - 2)).innerText == knight && document.getElementById(numberAsLetter(tempX + 1) + String(tempY - 2)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates('You will be in check');
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}
try {
    // down left
    if (
    document.getElementById(numberAsLetter(tempX - 1) + String(tempY - 2)).innerText == knight && document.getElementById(numberAsLetter(tempX - 1) + String(tempY - 2)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates('You will be in check');
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}

// diagonals
var stop1 = 0;
var stop2 = 0;
var stop3 = 0;
var stop4 = 0;
for (i = 1; i <= 8; i++){
    // up and right
    if (tempX + i <= 8 && tempY + i <= 8){
        if (stop1){}
        else if (
            document.getElementById(numberAsLetter(tempX + i) + String(tempY + i)).innerHTML.search(color) > 0
        ){
            stop1 = 1;
        }
        else {
            if (document.getElementById(numberAsLetter(tempX + i) + String(tempY + i)).innerText == queen ||
            document.getElementById(numberAsLetter(tempX + i) + String(tempY + i)).innerText == bishop){
                    checkForCheckmates('You will be in check');
                    nextElem.innerHTML = nextTempElem;
                    curElem.innerHTML = curTempElem;
                    return 1;
            }
        }
}

    // down and left
    if (tempX - i >= 1 && tempY - i >= 1){
        if (stop2){}
        else if (
            document.getElementById(numberAsLetter(tempX - i) + String(tempY - i)).innerHTML.search(color) > 0
        ){
            stop2 = 1;
        }
        else {
            if (document.getElementById(numberAsLetter(tempX - i) + String(tempY - i)).innerText == queen ||
            document.getElementById(numberAsLetter(tempX - i) + String(tempY - i)).innerText == bishop){
                    checkForCheckmates('You will be in check');
                    nextElem.innerHTML = nextTempElem;
                    curElem.innerHTML = curTempElem;
                    return 1;
            }
        }
}

    // up and left
    if (tempX - i >= 1 && tempY + i <= 8){
        if (stop3){}
        else if (
            document.getElementById(numberAsLetter(tempX - i) + String(tempY + i)).innerHTML.search(color) > 0
        ){
            stop3 = 1;
        }
        else {
            if (document.getElementById(numberAsLetter(tempX - i) + String(tempY + i)).innerText == queen ||
            document.getElementById(numberAsLetter(tempX - i) + String(tempY + i)).innerText == bishop){
                    checkForCheckmates('You will be in check');
                    nextElem.innerHTML = nextTempElem;
                    curElem.innerHTML = curTempElem;
                    return 1;
            }
        }
}

    // down and right
    if (tempX + i <= 8 && tempY - i >= 1){
        if (stop4){}
        else if (
            document.getElementById(numberAsLetter(tempX + i) + String(tempY - i)).innerHTML.search(color) > 0
        ){
            stop4 = 1;
        }
        else {
            if (document.getElementById(numberAsLetter(tempX + i) + String(tempY - i)).innerText == queen ||
            document.getElementById(numberAsLetter(tempX + i) + String(tempY - i)).innerText == bishop){
                    checkForCheckmates('You will be in check');
                    nextElem.innerHTML = nextTempElem;
                    curElem.innerHTML = curTempElem;
                    return 1;
            }
        }
}

}

// pawns
var pawnDirection;
color == 'white' ? pawnDirection = 1 : pawnDirection = -1;
try {
    if  (
        document.getElementById(numberAsLetter(tempX + 1) + String(tempY + pawnDirection)).innerText == pawn &&
        document.getElementById(numberAsLetter(tempX + 1) + String(tempY + pawnDirection)).innerHTML.search(opoColor) > 0
        ){
            checkForCheckmates('You will be in check');
            nextElem.innerHTML = nextTempElem;
            curElem.innerHTML = curTempElem;
            return 1;
        }
} catch (e){

}
try {
    if  (
        document.getElementById(numberAsLetter(tempX - 1) + String(tempY + pawnDirection)).innerText == pawn &&
        document.getElementById(numberAsLetter(tempX - 1) + String(tempY + pawnDirection)).innerHTML.search(opoColor) > 0
        ){
        checkForCheckmates('You will be in check');
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}

// untemp
nextElem.innerHTML = nextTempElem;
curElem.innerHTML = curTempElem;
}



function checkForCheckmates(fake){
    
}



function letterAsNumber(letter){
    if (letter === 'a' || letter === 'b' || letter === 'c' || letter === 'd' || letter === 'e' || letter === 'f' || letter === 'g' || letter === 'h'){
        switch (letter){
            case 'a':
                return 1;
            case 'b':
                return 2;
            case 'c':
                return 3;
            case 'd':
                return 4;
            case 'e':
                return 5;
            case 'f':
                return 6;
            case 'g':
                return 7;
            case 'h':
                return 8;
        }
    } else {
        showError('invalid input to letterAsNumber');
        return 1;
    }
}




function numberAsLetter(number){
    if (number === 1 || number === 2 || number === 3 || number === 4 || number === 5 || number === 6 || number === 7 || number === 8){
        switch(number){
            case 1:
                return 'a';
            case 2:
                return 'b';
            case 3:
                return 'c';
            case 4:
                return 'd';
            case 5:
                return 'e';
            case 6:
                return 'f';
            case 7:
                return 'g';
            case 8:
                return 'h';
        }
    } else {
        showError('invalid input to numberAsLetter');
        return 1;
    }
}





function handleCommands(){
    const command = document.getElementById('commands');
    let forMove = command.value.split(' ');

    move(forMove[0], forMove[1]);
    command.value = '';
}





document.getElementById('commands').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        handleCommands()
    } 
    else if (event.keyIdentifier === 13) {
        handleCommands()
    } 
    else if (event.keyCode === 13) {
        handleCommands()
    }
})

// move('e2', 'e4');
// move('e7', 'e5');
// move('f1', 'c4');
// move('f8', 'c5');
// move('h2', 'h4');
// move('a7', 'a5');
// move('h1', 'h3');
// move('a8', 'a6');
// move('h4', 'h5');
// move('a5', 'a4');
// move('h5', 'h6');
// move('a4', 'a3');
// move('h3', 'h5');
// move('a3', 'b2');

move('e2', 'e4');
move('e7', 'e5');
move('f1', 'c4');
move('f8', 'c5');
move('d1', 'f3');
move('a7', 'a6');