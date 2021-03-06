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