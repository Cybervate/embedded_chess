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