const pawn = 'o'
const bishop = 'v'
const knight = 'm'
const rook = 't'
const queen = 'w'
const king = 'l'

var turn = 0; // even = white, odd = black

var white_castle_right = 1 // 1 = true, 0 = false
var white_castle_left = 1 
var black_castle_right = 1 
var black_castle_left = 1

var alertError = 1


function showError(message){
    if (alertError){
        alert(message)
    } else {
        console.log(message)
    }
}



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

    let curNumber = Number(Array.from(cur)[1]);
    let curLetter = Array.from(cur)[0];
    let curLetterAsNumber = letterAsNumber(curLetter);

    let nextNumber = Number(Array.from(next)[1]);
    let nextLetter = Array.from(next)[0];
    let nextLetterAsNumber = letterAsNumber(nextLetter);

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
            else if 
            (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(opoColor) > 0 
            &&
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText != rook ){
                if (document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen) 
                {} else {break} 
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
            console.log('m')
            if (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(color) > 0){
                break;
            }
            else if 
            (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(opoColor) > 0 
            &&
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText != rook ){
                if (document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen) 
                {} else {break} 
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
            else if 
            (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(opoColor) > 0 
            &&
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText != rook ){
                if (document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen) 
                {} else {break} 
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
            else if 
            (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(opoColor) > 0 
            &&
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText != rook ){
                if (document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen) 
                {} else {break} 
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
            else if 
            (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(opoColor) > 0 
            &&
            document.getElementById(numberAsLetter(i) + String(tempY)).innerText != rook ){
                if (document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen) 
                {} else {break} 
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
            else if 
            (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(opoColor) > 0 
            &&
            document.getElementById(numberAsLetter(i) + String(tempY)).innerText != rook ){
                if (document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen) 
                {} else {break} 
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
            else if 
            (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(opoColor) > 0 
            &&
            document.getElementById(numberAsLetter(i) + String(tempY)).innerText != rook ){
                if (document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen) 
                {} else {break} 
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
            else if 
            (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(opoColor) > 0 
            &&
            document.getElementById(numberAsLetter(i) + String(tempY)).innerText != rook ){
                if (document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen) 
                {} else {break} 
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
            showError('rooks cannot go diagonal ');
            return 1;
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
        document.getElementById('f8').innerHTML = document.getElementById('h8').innerHTML;
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
    // curElem = document.getElementById(cur);
    // nextElem = document.getElementById(next);

    let curNumber = Number(Array.from(cur)[1]);
    let curLetter = Array.from(cur)[0];
    let curLetterAsNumber = letterAsNumber(curLetter);

    let nextNumber = Number(Array.from(next)[1]);
    let nextLetter = Array.from(next)[0];
    let nextLetterAsNumber = letterAsNumber(nextLetter);

    // temporarily do the move to analyze position after move
    // let curTempElem = curElem.innerHTML;
    // let nextTempElem = nextElem.innerHTML;

    // nextElem.innerHTML = curElem.innerHTML;
    // curElem.innerHTML = '';

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
        else if 
            (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(opoColor) > 0 
            &&
            document.getElementById(numberAsLetter(tempX) + String(i)).innerText != rook ){
                if (document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen) 
                {} else {break} 
            }
        else if (
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == rook ||
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen
        ){
            checkForCheckmates(cur, next, tempX, tempY);
            // nextElem.innerHTML = nextTempElem;
            // curElem.innerHTML = curTempElem;
            return 1;
        }
    }
} else if (tempY == 8){
    for (i = tempY - 1; i >= 1; i--){
        if (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(color) > 0){
            break;
        }else if 
        (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(opoColor) > 0 
        &&
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText != rook ){
            if (document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen) 
            {} else {break} 
        }
        else if (
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == rook ||
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen
        ){
            checkForCheckmates(cur, next, tempX, tempY);
            // nextElem.innerHTML = nextTempElem;
            // curElem.innerHTML = curTempElem;
            return 1;
        }
    }
} else {
    // above
    for (i = tempY + 1; i <= 8; i++){
        if (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(color) > 0){
            break;
        }else if 
        (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(opoColor) > 0 
        &&
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText != rook ){
            if (document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen) 
            {} else {break} 
        }
        else if (
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == rook ||
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen
        ){
            checkForCheckmates(cur, next, tempX, tempY);
            // nextElem.innerHTML = nextTempElem;
            // curElem.innerHTML = curTempElem;
            return 1;
        }
    }
    // below
    for (i = tempY - 1; i >= 1; i--){
        if (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(color) > 0){
            break;
        }else if 
        (document.getElementById(numberAsLetter(tempX) + String(i)).innerHTML.search(opoColor) > 0 
        &&
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText != rook ){
            if (document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen) 
            {} else {break} 
        }
        else if (
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == rook ||
        document.getElementById(numberAsLetter(tempX) + String(i)).innerText == queen
        ){
            checkForCheckmates(cur, next, tempX, tempY);
            // nextElem.innerHTML = nextTempElem;
            // curElem.innerHTML = curTempElem;
            return 1;
        }
    }
}

// horizontals
if (tempX == 1){
    for (i = tempX + 1; i <= 8; i++){
        if (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(color) > 0){
            break;
        }else if 
        (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(opoColor) > 0 
        &&
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText != rook ){
            if (document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen) 
            {} else {break} 
        }
        else if (
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == rook ||
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen
        ){
            checkForCheckmates(cur, next, tempX, tempY);
            // nextElem.innerHTML = nextTempElem;
            // curElem.innerHTML = curTempElem;
            return 1;
        }
    }
} else if (tempX == 8){
    for (i = tempX - 1; i >= 1; i--){
        if (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(color) > 0){
            break;
        }else if 
        (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(opoColor) > 0 
        &&
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText != rook ){
            if (document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen) 
            {} else {break} 
        }
        else if (
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == rook ||
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen
        ){
            checkForCheckmates(cur, next, tempX, tempY);
            // nextElem.innerHTML = nextTempElem;
            // curElem.innerHTML = curTempElem;
            return 1;
        }
    }
} else {
    // above
    for (i = tempX + 1; i <= 8; i++){
        if (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(color) > 0){
            break;
        }else if 
        (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(opoColor) > 0 
        &&
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText != rook ){
            if (document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen) 
            {} else {break} 
        }
        else if (
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == rook ||
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen
        ){
            checkForCheckmates(cur, next, tempX, tempY);
            // nextElem.innerHTML = nextTempElem;
            // curElem.innerHTML = curTempElem;
            return 1;
        }
    }
    // below
    for (i = tempX - 1; i >= 1; i--){
        if (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(color) > 0){
            break;
        }else if 
        (document.getElementById(numberAsLetter(i) + String(tempY)).innerHTML.search(opoColor) > 0 
        &&
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText != rook ){
            if (document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen) 
            {} else {break} 
        }
        else if (
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == rook ||
        document.getElementById(numberAsLetter(i) + String(tempY)).innerText == queen
        ){
            checkForCheckmates(cur, next, tempX, tempY);
            // nextElem.innerHTML = nextTempElem;
            // curElem.innerHTML = curTempElem;
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
        checkForCheckmates(cur, next, tempX, tempY);
        // nextElem.innerHTML = nextTempElem;
        // curElem.innerHTML = curTempElem;
        return 1;
    }
} catch(e) {

}
try {
    // right down
    if (
    document.getElementById(numberAsLetter(tempX + 2) + String(tempY - 1)).innerText == knight && document.getElementById(numberAsLetter(tempX + 2) + String(tempY - 1)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates(cur, next, tempX, tempY);
        // nextElem.innerHTML = nextTempElem;
        // curElem.innerHTML = curTempElem;
        return 1;
    }
} catch(e) {

}
try {
    // left up
    if (
    document.getElementById(numberAsLetter(tempX - 2) + String(tempY + 1)).innerText == knight && document.getElementById(numberAsLetter(tempX - 2) + String(tempY + 1)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates(cur, next, tempX, tempY);
        // nextElem.innerHTML = nextTempElem;
        // curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}
try {
    // left down
    if (
    document.getElementById(numberAsLetter(tempX - 2) + String(tempY - 1)).innerText == knight && document.getElementById(numberAsLetter(tempX - 2) + String(tempY - 1)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates(cur, next, tempX, tempY);
        // nextElem.innerHTML = nextTempElem;
        // curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}
try {
    // up right
    if (
    document.getElementById(numberAsLetter(tempX + 1) + String(tempY + 2)).innerText == knight && document.getElementById(numberAsLetter(tempX + 1) + String(tempY + 2)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates(cur, next, tempX, tempY);
        // nextElem.innerHTML = nextTempElem;
        // curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}
try {
    // up left
    if (
    document.getElementById(numberAsLetter(tempX - 1) + String(tempY + 2)).innerText == knight && document.getElementById(numberAsLetter(tempX - 1) + String(tempY + 2)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates(cur, next, tempX, tempY);
        // nextElem.innerHTML = nextTempElem;
        // curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}
try {
    // down right
    if (
    document.getElementById(numberAsLetter(tempX + 1) + String(tempY - 2)).innerText == knight && document.getElementById(numberAsLetter(tempX + 1) + String(tempY - 2)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates(cur, next, tempX, tempY);
        // nextElem.innerHTML = nextTempElem;
        // curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}
try {
    // down left
    if (
    document.getElementById(numberAsLetter(tempX - 1) + String(tempY - 2)).innerText == knight && document.getElementById(numberAsLetter(tempX - 1) + String(tempY - 2)).innerHTML.search(opoColor) > 0
    ){
        checkForCheckmates(cur, next, tempX, tempY);
        // nextElem.innerHTML = nextTempElem;
        // curElem.innerHTML = curTempElem;
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
                    checkForCheckmates(cur, next, tempX, tempY);
                    // nextElem.innerHTML = nextTempElem;
                    // curElem.innerHTML = curTempElem;
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
                    checkForCheckmates(cur, next, tempX, tempY);
                    // nextElem.innerHTML = nextTempElem;
                    // curElem.innerHTML = curTempElem;
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
                    checkForCheckmates(cur, next, tempX, tempY);
                    // nextElem.innerHTML = nextTempElem;
                    // curElem.innerHTML = curTempElem;
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
                    checkForCheckmates(cur, next, tempX, tempY);
                    // nextElem.innerHTML = nextTempElem;
                    // curElem.innerHTML = curTempElem;
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
            checkForCheckmates(cur, next, tempX, tempY);
            // nextElem.innerHTML = nextTempElem;
            // curElem.innerHTML = curTempElem;
            return 1;
        }
} catch (e){

}
try {
    if  (
        document.getElementById(numberAsLetter(tempX - 1) + String(tempY + pawnDirection)).innerText == pawn &&
        document.getElementById(numberAsLetter(tempX - 1) + String(tempY + pawnDirection)).innerHTML.search(opoColor) > 0
        ){
        checkForCheckmates(cur, next, tempX, tempY);
        // nextElem.innerHTML = nextTempElem;
        // curElem.innerHTML = curTempElem;
        return 1;
    }
} catch (e) {

}

// untemp
// nextElem.innerHTML = nextTempElem;
// curElem.innerHTML = curTempElem;
}



function checkForCheckmates(cur, next, tempX, tempY){
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    let curNumber = Number(Array.from(cur)[1]);
    let curLetter = Array.from(cur)[0];
    let curLetterAsNumber = letterAsNumber(curLetter);

    let nextNumber = Number(Array.from(next)[1]);
    let nextLetter = Array.from(next)[0];
    let nextLetterAsNumber = letterAsNumber(nextLetter);


    let color;
    let opoColor;
    turn % 2 != 0 ? color = 'white' : color = 'black';
    color == 'white' ? opoColor = 'black' : opoColor = 'white';

    turn += 1
    alertError = 0
    console.log(color)
    if (tempX + 1 <= 8){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX + 1) + String(tempY), 1)
            )
        {
            turn -= 1
            return 0;
        } 
    }

    if (tempX - 1 >= 1){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX - 1) + String(tempY), 1)
            )
        {
            turn -= 1
            return 0;
        } 
    }

    if (tempY + 1 <= 8){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX) + String(tempY + 1), 1)
            )
        {
            turn -= 1
            return 0;
        } 
    }

    if (tempY - 1 >= 1){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX) + String(tempY - 1), 1)
            )
        {
            turn -= 1
            return 0;
        } 
    }

    if (tempX + 1 <= 8 && tempY + 1 <= 8){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX + 1) + String(tempY + 1), 1)
            )
        {
            turn -= 1
            return 0;
        } 
    }

    if (tempX + 1 <= 8 && tempY - 1 >= 1){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX + 1) + String(tempY - 1), 1)
            )
        {
            turn -= 1
            return 0;
        } 
    }

    if (tempX - 1 >= 1 && tempY + 1 >= 8){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX - 1) + String(tempY + 1), 1)
            )
        {
            turn -= 1
            return 0;
        } 
    }

    if (tempX - 1 >= 1 && tempY - 1 >= 1){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX - 1) + String(tempY - 1), 1)
            )
        {
            turn -= 1
            return 0;
        } 
    }


// verticals
    if (nextNumber == 1){
        for (i = nextNumber + 1; i <= 8; i++){
            if (document.getElementById(nextLetter + String(i)).innerHTML.search(opoColor) > 0){
                break;
            } 
            else if 
        (document.getElementById(nextLetter + String(i)).innerHTML.search(color) > 0 
        &&
        document.getElementById(nextLetter + String(i)).innerText != rook ){
            if (document.getElementById(nextLetter + String(i)).innerText == queen) 
            {} else {break} 
        }
            else if (
            document.getElementById(nextLetter + String(i)).innerText == rook ||
            document.getElementById(nextLetter + String(i)).innerText == queen
            ){
                turn -= 1
                return 0;
            }
        }
    } else if (nextNumber == 8){
        for (i = nextNumber - 1; i >= 1; i--){
            if (document.getElementById(nextLetter + String(i)).innerHTML.search(opoColor) > 0){
                break;
            }
            else if 
        (document.getElementById(nextLetter + String(i)).innerHTML.search(color) > 0 
        &&
        document.getElementById(nextLetter + String(i)).innerText != rook ){
            if (document.getElementById(nextLetter + String(i)).innerText == queen) 
            {} else {break} 
        }
            else if (
            document.getElementById(nextLetter + String(i)).innerText == rook ||
            document.getElementById(nextLetter + String(i)).innerText == queen
            ){
                turn -= 1
                return 0;
            }
        }
    } else {
        // above
        for (i = nextNumber + 1; i <= 8; i++){
            if (document.getElementById(nextLetter + String(i)).innerHTML.search(opoColor) > 0){
                break;
            }
            else if 
        (document.getElementById(nextLetter + String(i)).innerHTML.search(color) > 0 
        &&
        document.getElementById(nextLetter + String(i)).innerText != rook ){
            if (document.getElementById(nextLetter + String(i)).innerText == queen) 
            {} else {break} 
        }
            else if (
            document.getElementById(nextLetter + String(i)).innerText == rook ||
            document.getElementById(nextLetter + String(i)).innerText == queen
            ){
                turn -= 1
                return 0;
            }
        }
        // below
        for (i = nextNumber - 1; i >= 1; i--){
            if (document.getElementById(nextLetter + String(i)).innerHTML.search(opoColor) > 0){
                break;
            }
            else if 
        (document.getElementById(nextLetter + String(i)).innerHTML.search(color) > 0 
        &&
        document.getElementById(nextLetter + String(i)).innerText != rook ){
            if (document.getElementById(nextLetter + String(i)).innerText == queen) 
            {} else {break} 
        }
            else if (
            document.getElementById(nextLetter + String(i)).innerText == rook ||
            document.getElementById(nextLetter + String(i)).innerText == queen
            ){
                turn -= 1
                return 0;
            }
        }
    }

    // // horizontals
    if (nextLetterAsNumber == 1){
        for (i = nextLetterAsNumber + 1; i <= 8; i++){
            if (document.getElementById(nextLetter + String(nextNumber)).innerHTML.search(opoColor) > 0){
                break;
            }
            else if 
        (document.getElementById(nextLetter + String(nextNumber)).innerHTML.search(color) > 0 
        &&
        document.getElementById(nextLetter + String(nextNumber)).innerText != rook ){
            if (document.getElementById(nextLetter + String(nextNumber)).innerText == queen) 
            {} else {break} 
        }
            else if (
            document.getElementById(nextLetter + String(nextNumber)).innerText == rook ||
            document.getElementById(nextLetter + String(nextNumber)).innerText == queen
            ){
                turn -= 1
                return 0;
            }
        }
    } else if (nextLetterAsNumber == 8){
        for (i = tempX - 1; i >= 1; i--){
            if (document.getElementById(nextLetter + String(nextNumber)).innerHTML.search(opoColor) > 0){
                break;
            }
            else if 
        (document.getElementById(nextLetter + String(nextNumber)).innerHTML.search(color) > 0 
        &&
        document.getElementById(nextLetter + String(nextNumber)).innerText != rook ){
            if (document.getElementById(nextLetter + String(nextNumber)).innerText == queen) 
            {} else {break} 
        }
            else if (
            document.getElementById(nextLetter + String(nextNumber)).innerText == rook ||
            document.getElementById(nextLetter + String(nextNumber)).innerText == queen
            ){
                turn -= 1
                return 0;
            }
        }
    } else {
        // above
        for (i = nextLetterAsNumber + 1; i <= 8; i++){
            if (document.getElementById(nextLetter + String(nextNumber)).innerHTML.search(opoColor) > 0){
                break;
            }
            else if 
        (document.getElementById(nextLetter + String(nextNumber)).innerHTML.search(color) > 0 
        &&
        document.getElementById(nextLetter + String(nextNumber)).innerText != rook ){
            if (document.getElementById(nextLetter + String(nextNumber)).innerText == queen) 
            {} else {break} 
        }
            else if (
            document.getElementById(nextLetter + String(nextNumber)).innerText == rook ||
            document.getElementById(nextLetter + String(nextNumber)).innerText == queen
            ){
                turn -= 1
                return 0;
            }
        }
        // below
        for (i = nextLetterAsNumber - 1; i >= 1; i--){
            if (document.getElementById(nextLetter + String(nextNumber)).innerHTML.search(opoColor) > 0){
                break;
            }
            else if 
        (document.getElementById(nextLetter + String(nextNumber)).innerHTML.search(color) > 0 
        &&
        document.getElementById(nextLetter + String(nextNumber)).innerText != rook ){
            if (document.getElementById(nextLetter + String(nextNumber)).innerText == queen) 
            {} else {break} 
        }
            else if (
            document.getElementById(nextLetter + String(nextNumber)).innerText == rook ||
            document.getElementById(nextLetter + String(nextNumber)).innerText == queen
            ){
                turn -= 1
                return 0;
            }
        }
    }


    // // diagonals
    var stop1 = 0;
    var stop2 = 0;
    var stop3 = 0;
    var stop4 = 0;
    for (i = 1; i <= 8; i++){
        // up and right
        if (nextLetterAsNumber + i <= 8 && nextNumber + i <= 8){
            if (stop1){}
            else if (
                document.getElementById(numberAsLetter(nextLetterAsNumber + i) + String(nextNumber + i)).innerHTML.search(opoColor) > 0
            ){
                stop1 = 1;
            }
            else {
                if (document.getElementById(numberAsLetter(nextLetterAsNumber + i) + String(nextNumber + i)).innerText == queen ||
                document.getElementById(numberAsLetter(nextLetterAsNumber + i) + String(nextNumber + i)).innerText == bishop){
                    turn -= 1
                    return 0;
                }
            }
    }

        // down and left
        if (nextLetterAsNumber - i >= 1 && nextNumber - i >= 1){
            if (stop2){}
            else if (
                document.getElementById(numberAsLetter(nextLetterAsNumber - i) + String(nextNumber - i)).innerHTML.search(opoColor) > 0
            ){
                stop2 = 1;
            }
            else {
                if (document.getElementById(numberAsLetter(nextLetterAsNumber - i) + String(nextNumber - i)).innerText == queen ||
                document.getElementById(numberAsLetter(nextLetterAsNumber - i) + String(nextNumber - i)).innerText == bishop){
                    turn -= 1
                    return 0;
                }
            }
    }

        // up and left
        if (nextLetterAsNumber - i >= 1 && nextNumber + i <= 8){
            if (stop3){}
            else if (
                document.getElementById(numberAsLetter(nextLetterAsNumber - i) + String(nextNumber + i)).innerHTML.search(opoColor) > 0
            ){
                stop3 = 1;
            }
            else {
                if (document.getElementById(numberAsLetter(nextLetterAsNumber - i) + String(nextNumber + i)).innerText == queen ||
                document.getElementById(numberAsLetter(nextLetterAsNumber - i) + String(nextNumber + i)).innerText == bishop){
                    turn -= 1
                    return 0;
                }
            }
    }

        // down and right
        if (nextLetterAsNumber + i <= 8 && nextNumber - i >= 1){
            if (stop4){}
            else if (
                document.getElementById(numberAsLetter(nextLetterAsNumber + i) + String(nextNumber - i)).innerHTML.search(opoColor) > 0
            ){
                stop4 = 1;
            }
            else {
                if (document.getElementById(numberAsLetter(nextLetterAsNumber + i) + String(nextNumber - i)).innerText == queen ||
                document.getElementById(numberAsLetter(nextLetterAsNumber + i) + String(nextNumber - i)).innerText == bishop){
                    turn -= 1
                    return 0;
                }
            }
    }

    }



    // // knights
    try {
        // right up
        if (
        document.getElementById(numberAsLetter(nextLetterAsNumber + 2) + String(nextNumber + 1)).innerText == knight && document.getElementById(numberAsLetter(nextLetterAsNumber + 2) + String(nextNumber + 1)).innerHTML.search(color) > 0
        ){
            turn -= 1
            return 0;
        }
    } catch(e) {

    }
    try {
        // right down
        if (
        document.getElementById(numberAsLetter(nextLetterAsNumber + 2) + String(nextNumber - 1)).innerText == knight && document.getElementById(numberAsLetter(nextLetterAsNumber + 2) + String(nextNumber - 1)).innerHTML.search(color) > 0
        ){
            turn -= 1
            return 0;
        }
    } catch(e) {

    }
    try {
        // left up
        if (
        document.getElementById(numberAsLetter(nextLetterAsNumber - 2) + String(nextNumber + 1)).innerText == knight && document.getElementById(numberAsLetter(nextLetterAsNumber - 2) + String(nextNumber + 1)).innerHTML.search(color) > 0
        ){
            turn -= 1
            return 0;
        }
    } catch (e) {

    }
    try {
        // left down
        if (
        document.getElementById(numberAsLetter(nextLetterAsNumber - 2) + String(nextNumber - 1)).innerText == knight && document.getElementById(numberAsLetter(nextLetterAsNumber - 2) + String(nextNumber - 1)).innerHTML.search(color) > 0
        ){
            turn -= 1
            return 0;
        }
    } catch (e) {

    }
    try {
        // up right
        if (
        document.getElementById(numberAsLetter(nextLetterAsNumber + 1) + String(nextNumber + 2)).innerText == knight && document.getElementById(numberAsLetter(nextLetterAsNumber + 1) + String(nextNumber + 2)).innerHTML.search(color) > 0
        ){
            turn -= 1
            return 0;
        }
    } catch (e) {

    }
    try {
        // up left
        if (
        document.getElementById(numberAsLetter(nextLetterAsNumber - 1) + String(nextNumber + 2)).innerText == knight && document.getElementById(numberAsLetter(nextLetterAsNumber - 1) + String(nextNumber + 2)).innerHTML.search(color) > 0
        ){
            turn -= 1
            return 0;
        }
    } catch (e) {

    }
    try {
        // down right
        if (
        document.getElementById(numberAsLetter(nextLetterAsNumber + 1) + String(nextNumber - 2)).innerText == knight && document.getElementById(numberAsLetter(nextLetterAsNumber + 1) + String(nextNumber - 2)).innerHTML.search(color) > 0
        ){
            turn -= 1
            return 0;
        }
    } catch (e) {

    }
    try {
        // down left
        if (
        document.getElementById(numberAsLetter(nextLetterAsNumber - 1) + String(nextNumber - 2)).innerText == knight && document.getElementById(numberAsLetter(nextLetterAsNumber - 1) + String(nextNumber - 2)).innerHTML.search(color) > 0
        ){
            turn -= 1
            return 0;
        }
    } catch (e) {

    }



    // // pawns
    var pawnDirection;
    color == 'white' ? pawnDirection = 1 : pawnDirection = -1;
    try {
        if  (
            document.getElementById(numberAsLetter(nextLetterAsNumber + 1) + String(nextNumber + pawnDirection)).innerText == pawn &&
            document.getElementById(numberAsLetter(nextLetterAsNumber + 1) + String(nextNumber + pawnDirection)).innerHTML.search(color) > 0
            ){
                turn -= 1
                return 0;
            }
    } catch (e){

    }
    try {
        if  (
            document.getElementById(numberAsLetter(nextLetterAsNumber - 1) + String(nextNumber + pawnDirection)).innerText == pawn &&
            document.getElementById(numberAsLetter(nextLetterAsNumber - 1) + String(nextNumber + pawnDirection)).innerHTML.search(color) > 0
            ){
                turn -= 1
                return 0;
        }
    } catch (e) {

    }
    

    // blockers
    if (document.getElementById(next).innerText == rook || document.getElementById(next).innerText == queen) {
        if (tempX > nextLetterAsNumber + 1 || tempY > nextNumber + 1 ||
            tempX < nextLetterAsNumber - 1 || tempY < nextNumber - 1) { } 
            else {
            // vertical
            if (nextLetterAsNumber == tempX) {
                // above
                if (tempY > nextNumber) {
                    for (i = nextNumber + 1; i <= 8; i++) {
                        if (document.getElementById(nextLetter + String(i)).innerText == king) {break}
                    }
                } 
                // below
                else {

                }
            }
            // horizontal
            else {

            }
        }
    } 

    if (document.getElementById(next).innerText == bishop) {

    } 

    if (document.getElementById(next).innerText == bishop) {

    }

    alertError = 1
    showError('checkmate, ' + opoColor + ' wins');
    return 1;
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
        console.log(number, 'nee', numberAsLetter.caller)
        showError('invalid input to numberAsLetter');
        return 1;
    }
}



function resetGame(){
    var turn = 0; // even = white, odd = black

    var white_castle_right = 1 // 1 = true, 0 = false
    var white_castle_left = 1 
    var black_castle_right = 1 
    var black_castle_left = 1

    var alertError = 1

    document.querySelector('.board').innerHTML = `
    <div id="a8" class="square light"><div class="piece black">t</div></div>
    <div id="b8" class="square dark"><div class="piece black">m</div></div>
    <div id="c8" class="square light"><div class="piece black">v</div></div>
    <div id="d8" class="square dark"><div class="piece black">w</div></div>
    <div id="e8" class="square light"><div class="piece black">l</div></div>
    <div id="f8" class="square dark"><div class="piece black">v</div></div>
    <div id="g8" class="square light"><div class="piece black">m</div></div>
    <div id="h8" class="square dark"><div class="piece black">t</div></div>

    <div id="a7" class="square dark"><div class="piece black">o</div></div>
    <div id="b7" class="square light"><div class="piece black">o</div></div>
    <div id="c7" class="square dark"><div class="piece black">o</div></div>
    <div id="d7" class="square light"><div class="piece black">o</div></div>
    <div id="e7" class="square dark"><div class="piece black">o</div></div>
    <div id="f7" class="square light"><div class="piece black">o</div></div>
    <div id="g7" class="square dark"><div class="piece black">o</div></div>
    <div id="h7" class="square light"><div class="piece black">o</div></div>
    
    <div id="a6" class="square light"><div class="piece"></div></div>
    <div id="b6" class="square dark"><div class="piece"></div></div>
    <div id="c6" class="square light"><div class="piece"></div></div>
    <div id="d6" class="square dark"><div class="piece"></div></div>
    <div id="e6" class="square light"><div class="piece"></div></div>
    <div id="f6" class="square dark"><div class="piece"></div></div>
    <div id="g6" class="square light"><div class="piece"></div></div>
    <div id="h6" class="square dark"><div class="piece"></div></div>

    <div id="a5" class="square dark"><div class="piece"></div></div>
    <div id="b5" class="square light"><div class="piece"></div></div>
    <div id="c5" class="square dark"><div class="piece"></div></div>
    <div id="d5" class="square light"><div class="piece"></div></div>
    <div id="e5" class="square dark"><div class="piece"></div></div>
    <div id="f5" class="square light"><div class="piece"></div></div>
    <div id="g5" class="square dark"><div class="piece"></div></div>
    <div id="h5" class="square light"><div class="piece"></div></div>
    
    <div id="a4" class="square light"><div class="piece"></div></div>
    <div id="b4" class="square dark"><div class="piece"></div></div>
    <div id="c4" class="square light"><div class="piece"></div></div>
    <div id="d4" class="square dark"><div class="piece"></div></div>
    <div id="e4" class="square light"><div class="piece"></div></div>
    <div id="f4" class="square dark"><div class="piece"></div></div>
    <div id="g4" class="square light"><div class="piece"></div></div>
    <div id="h4" class="square dark"><div class="piece"></div></div>
    
    <div id="a3" class="square dark"><div class="piece"></div></div>
    <div id="b3" class="square light"><div class="piece"></div></div>
    <div id="c3" class="square dark"><div class="piece"></div></div>
    <div id="d3" class="square light"><div class="piece"></div></div>
    <div id="e3" class="square dark"><div class="piece"></div></div>
    <div id="f3" class="square light"><div class="piece"></div></div>
    <div id="g3" class="square dark"><div class="piece"></div></div>
    <div id="h3" class="square light"><div class="piece"></div></div>
    
    <div id="a2" class="square light"><div class="piece white">o</div></div>
    <div id="b2" class="square dark"><div class="piece white">o</div></div>
    <div id="c2" class="square light"><div class="piece white">o</div></div>
    <div id="d2" class="square dark"><div class="piece white">o</div></div>
    <div id="e2" class="square light"><div class="piece white">o</div></div>
    <div id="f2" class="square dark"><div class="piece white">o</div></div>
    <div id="g2" class="square light"><div class="piece white">o</div></div>
    <div id="h2" class="square dark"><div class="piece white">o</div></div>

    <div id="a1" class="square dark"><div class="piece white">t</div></div>
    <div id="b1" class="square light"><div class="piece white">m</div></div>
    <div id="c1" class="square dark"><div class="piece white">v</div></div>
    <div id="d1" class="square light"><div class="piece white">w</div></div>
    <div id="e1" class="square dark"><div class="piece white">l</div></div>
    <div id="f1" class="square light"><div class="piece white">v</div></div>
    <div id="g1" class="square dark"><div class="piece white">m</div></div>
    <div id="h1" class="square light"><div class="piece white">t</div></div>
    `

    var click = 1
    var spots = ['', '']
}



function handleCommands(){
    const command = document.getElementById('commands');
    let forMove = command.value.split(' ');

    move(forMove[0], forMove[1], 0, 1);
    command.value = '';
}

var click = 1
var spots = ['', '']

// handles clicking pieces
function clicks(e){
    if (click >= 3) {
        click = 1
        spots = ['', '']
    }
    let target = e.srcElement || e.target;
    if (click == 1) {
        spots[0] = target.id || target.parentElement.id
    } else if (click == 2) {
        spots[1] = target.id || target.parentElement.id
    }
    if (spots[0] != '' && spots[1] != ''){
        move(spots[0], spots[1], 0);    
    }
    click += 1
    // console.log(spots)
    // console.log(target.id || target.parentElement.id)
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

// move('e2', 'e4', 0);
// move('e7', 'e5', 0);
// move('f1', 'c4', 0);
// move('f8', 'c5', 0);
// move('d1', 'f3', 0);
// move('a7', 'a6', 0);
// move('b1', 'c3', 0);
// move('b8', 'c6', 0);
// move('a2', 'a3', 0);
// move('g8', 'h6', 0);
// move('b2', 'b4', 0);
// move('f7', 'f6', 0);
// move('b4', 'b5', 0);
// move('a8', 'b8', 0);
// move('a3', 'a4', 0);
// move('b8', 'a8', 0);
// move('c1', 'a3', 0);
// move('a8', 'b8', 0);
// move('a3', 'c5', 0);
// move('b8', 'a8', 0);

// move('e2', 'e4', 0);
// move('e7', 'e5', 0);
// move('f1', 'c4', 0);
// move('f8', 'c5', 0);
// move('d1', 'f3', 0);
// move('a7', 'a6', 0);
// move('h2', 'h4', 0);
// move('a6', 'a5', 0);
// move('h1', 'h3', 0);
// move('a5', 'a4', 0);
// move('f3', 'c3', 0);
// move('a4', 'a3', 0);
// move('h3', 'g3', 0);
// move('b7', 'b6', 0);
// move('g3', 'g5', 0);
// move('c8', 'b7', 0);
// move('d2', '', 0);
// move('c8', 'b7', 0);

const move_list = [
    'e2', 'e4', 'e7', 'e5', 'f1', 'c4', 'f8', 'c5', 'd1', 'f3', 'a7', 'a6', 'h2', 'h4', 'a6', 'a5', 'h1', 'h3', 'a5', 'a4', 'f3', 'c3', 'a4', 'a3', 'h3', 'g3', 'b7', 'b6', 'g3', 'g5', 'c8', 'b7'
]

let moveVar = 0
let moveLoc = ['', '']
move_list.forEach((element) => {
    if (moveVar % 2 == 0) {
        moveLoc[0] = element;
        moveVar += 1;
    } else {
        moveLoc[1] = element;
        moveVar += 1;
    }
    if (moveLoc[0] !== '' && moveLoc[1] !== '') {
        move(moveLoc[0], moveLoc[1], 0);
        moveLoc = ['', ''];
    }
});