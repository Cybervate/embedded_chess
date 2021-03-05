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