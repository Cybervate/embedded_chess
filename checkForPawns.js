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