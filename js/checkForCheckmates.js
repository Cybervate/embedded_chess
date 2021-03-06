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
// verticals & horizontals
if (testVertAndHort(tempX, tempY, color)) {
    checkForCheckmates(cur, next, tempX, tempY);
    return 1;
}

// knights
// knights
if (testKnights(tempX, tempY, color)) {
    checkForCheckmates(cur, next, tempX, tempY);
    return 1;
}

// diagonals
if (testDiagonals(tempX, tempY, color)) {
    checkForCheckmates(cur, next, tempX, tempY);
    return 1;
}

// pawns
if (testPawns(tempX, tempY, color)) {
    checkForCheckmates(cur, next, tempX, tempY);
    return 1;
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
            alertError = 1
            return 0;
        } 
    }

    if (tempX - 1 >= 1){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX - 1) + String(tempY), 1)
            )
        {
            turn -= 1
            alertError = 1
            return 0;
        } 
    }

    if (tempY + 1 <= 8){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX) + String(tempY + 1), 1)
            )
        {
            turn -= 1
            alertError = 1
            return 0;
        } 
    }

    if (tempY - 1 >= 1){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX) + String(tempY - 1), 1)
            )
        {
            turn -= 1
            alertError = 1
            return 0;
        } 
    }

    if (tempX + 1 <= 8 && tempY + 1 <= 8){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX + 1) + String(tempY + 1), 1)
            )
        {
            turn -= 1
            alertError = 1
            return 0;
        } 
    }

    if (tempX + 1 <= 8 && tempY - 1 >= 1){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX + 1) + String(tempY - 1), 1)
            )
        {
            turn -= 1
            alertError = 1
            return 0;
        } 
    }

    if (tempX - 1 >= 1 && tempY + 1 >= 8){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX - 1) + String(tempY + 1), 1)
            )
        {
            turn -= 1
            alertError = 1
            return 0;
        } 
    }

    if (tempX - 1 >= 1 && tempY - 1 >= 1){
        if (
        move((numberAsLetter(tempX) + String(tempY)), numberAsLetter(tempX - 1) + String(tempY - 1), 1)
            )
        {
            turn -= 1
            alertError = 1
            return 0;
        } 
    }


    // verticals
    if (testVertAndHort(tempX, tempY, opoColor)) {
        turn -= 1
        alertError = 1
        return 0;
    }

    // // diagonals
    // diagonals
    if (testDiagonals(tempX, tempY, opoColor)) {
        turn -= 1
        alertError = 1
        return 0;
    }

    // // knights
    if (testKnights(tempX, tempY, opoColor)) {
        turn -= 1
        alertError = 1
        return 0;
    }
    
    // pawns
    if (testPawns(tempX, tempY, opoColor)) {
        turn -= 1
        alertError = 1
        return 0;
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