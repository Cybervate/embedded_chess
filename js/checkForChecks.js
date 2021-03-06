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

    // verticals & horizontals
    if (testVertAndHort(tempX, tempY, color)) {
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }

    // knights
    if (testKnights(tempX, tempY, color)) {
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }

    // diagonals
    if (testDiagonals(tempX, tempY, color)) {
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }


    // pawns
    if (testPawns(tempX, tempY, color)) {
        nextElem.innerHTML = nextTempElem;
        curElem.innerHTML = curTempElem;
        return 1;
    }

    // untemp
    nextElem.innerHTML = nextTempElem;
    curElem.innerHTML = curTempElem;
}