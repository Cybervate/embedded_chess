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