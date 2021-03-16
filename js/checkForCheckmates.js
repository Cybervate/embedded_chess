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

    alertError = 0    

    for (i = 1; i <= 8; i++){
        for (j = 1; j <= 8; j++){
            if (document.getElementById(numberAsLetter(j) + String(i)).innerText == king &&
                document.getElementById(numberAsLetter(j) + String(i)).innerHTML.search(opoColor) > 0){
                    var tempX = j;
                    var tempY = i;
                    break;
                }
        }
    }

console.log(tempX, tempY)
// verticals
// verticals & horizontals
if (testVertAndHort(tempX, tempY, opoColor)) {
    checkForCheckmates(cur, next, tempX, tempY);
    return 1;
}

// knights
// knights
if (testKnights(tempX, tempY, opoColor)) {
    checkForCheckmates(cur, next, tempX, tempY);
    return 1;
}

// diagonals
if (testDiagonals(tempX, tempY, opoColor)) {
    checkForCheckmates(cur, next, tempX, tempY);
    return 1;
}

// pawns
if (testPawns(tempX, tempY, opoColor)) {
    checkForCheckmates(cur, next, tempX, tempY);
    return 1;
}

// untemp
// nextElem.innerHTML = nextTempElem;
// curElem.innerHTML = curTempElem;
    alertError = 1
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

    // captures
    // vert and hort
    if (testVertAndHort(nextLetterAsNumber, nextNumber, opoColor)) {
        turn -= 1
        alertError = 1
        return 0;
    }

    // diagonals
    if (testDiagonals(nextLetterAsNumber, nextNumber, opoColor)) {
        turn -= 1
        alertError = 1
        return 0;
    }

    // // knights
    if (testKnights(nextLetterAsNumber, nextNumber, opoColor)) {
        turn -= 1
        alertError = 1
        return 0;
    }
    
    // pawns
    if (testPawns(nextLetterAsNumber, nextNumber, opoColor)) {
        turn -= 1
        alertError = 1
        return 0;
    }
    // blockers
    // rook || queen | verts and horts
    if (document.getElementById(next).innerText == rook || document.getElementById(next).innerText == queen) {

        if (tempX > nextLetterAsNumber + 1 || tempY > nextNumber + 1 ||
            tempX < nextLetterAsNumber - 1 || tempY < nextNumber - 1) { 

            // vertical
            if (nextLetterAsNumber == tempX) 
            {
                // above
                if (tempY > nextNumber) {
                    for (i = nextNumber + 1; i <= 8; i++) {
                        if (document.getElementById(nextLetter + String(i)).innerText == king) {break}
                        else {
                            
                            // vert and hort
                            if (testVertAndHort(nextLetterAsNumber, i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // diagonals
                            if (testDiagonals(nextLetterAsNumber, i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // knights
                            if (testKnights(nextLetterAsNumber, i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // pawns
                            if (testBlockWithPawn(nextLetterAsNumber, i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                        }
                    }
                } 
                // below
                else {
                    for (i = nextNumber - 1; i >= 1; i--) {
                        if (document.getElementById(nextLetter + String(i)).innerText == king) {break}
                        else {
                            
                            // vert and hort
                            if (testVertAndHort(nextLetterAsNumber, i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // diagonals
                            if (testDiagonals(nextLetterAsNumber, i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // knights
                            if (testKnights(nextLetterAsNumber, i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }
                            
                            // pawns
                            if (testBlockWithPawn(nextLetterAsNumber, i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                        }
                    }
                }
            }

            // horizontal
            else if (nextNumber == tempY) {
               // right
                if (tempX > nextLetterAsNumber) {
                for (i = nextLetterAsNumber + 1; i <= 8; i++) {
                    if (document.getElementById(numberAsLetter(i) + nextNumber).innerText == king) {break}
                    else {
                        
                        // vert and hort
                        if (testVertAndHort(i, nextNumber, color)) {
                            turn -= 1
                            alertError = 1
                            return 0;
                        }

                        // diagonals
                        if (testDiagonals(i, nextNumber, color)) {
                            turn -= 1
                            alertError = 1
                            return 0;
                        }

                        // knights
                        if (testKnights(i, nextNumber, color)) {
                            turn -= 1
                            alertError = 1
                            return 0;
                        }

                    }
                }
            } 
            // left
            else {
                for (i = nextLetterAsNumber - 1; i >= 1; i--) {
                    if (document.getElementById(numberAsLetter(i) + nextNumber).innerText == king) {break}
                    else {
                        
                        // vert and hort
                        if (testVertAndHort(i, nextNumber, color)) {
                            turn -= 1
                            alertError = 1
                            return 0;
                        }

                        // diagonals
                        if (testDiagonals(i, nextNumber, color)) {
                            turn -= 1
                            alertError = 1
                            return 0;
                        }

                        // knights
                        if (testKnights(i, nextNumber, color)) {
                            turn -= 1
                            alertError = 1
                            return 0;
                        }

                    }
                }
            }
            }

        }
    } 

    // bishop || queen
    if (document.getElementById(next).innerText == bishop || document.getElementById(next).innerText == queen) {

        if (tempX > nextLetterAsNumber + 1 || tempY > nextNumber + 1 ||
            tempX < nextLetterAsNumber - 1 || tempY < nextNumber - 1) {

                // up right
                if (tempX > nextLetterAsNumber && tempY > nextNumber) {

                    for (i = 1; i <= 8; i++) {

                        if (document.getElementById(numberAsLetter(nextLetterAsNumber + i) + String(nextNumber + i)).innerText == king
                        ||
                        (nextLetterAsNumber + i > 8 || nextNumber + i > 8)
                        ) {
                            break;
                        } else {

                            // vert and hort
                            if (testVertAndHort(nextLetterAsNumber + i, nextNumber + i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // diagonals
                            if (testDiagonals(nextLetterAsNumber + i, nextNumber + i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // knights
                            if (testKnights(nextLetterAsNumber + i, nextNumber + i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // pawns
                            if (testBlockWithPawn(nextLetterAsNumber + i, nextNumber + i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                        }
                    }
                }

                // up left
                if (tempX < nextLetterAsNumber && tempY > nextNumber) {

                    for (i = 1; i <= 8; i++) {

                        if (document.getElementById(numberAsLetter(nextLetterAsNumber - i) + String(nextNumber + i)).innerText == king
                        ||
                        (nextLetterAsNumber - i < 1 || nextNumber + i > 8)
                        ) {
                            break;
                        } else {

                            // vert and hort
                            if (testVertAndHort(nextLetterAsNumber - i, nextNumber + i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // diagonals
                            if (testDiagonals(nextLetterAsNumber - i, nextNumber + i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // knights
                            if (testKnights(nextLetterAsNumber - i, nextNumber + i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // pawns
                            if (testBlockWithPawn(nextLetterAsNumber - i, nextNumber + i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                        }
                    }

                }

                // down right
                if (tempX > nextLetterAsNumber && tempY < nextNumber) {

                    for (i = 1; i <= 8; i++) {

                        if (document.getElementById(numberAsLetter(nextLetterAsNumber + i) + String(nextNumber - i)).innerText == king
                        ||
                        (nextLetterAsNumber + i > 8 || nextNumber - i < 1)
                        ) {
                            break;
                        } else {

                            // vert and hort
                            if (testVertAndHort(nextLetterAsNumber + i, nextNumber - i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // diagonals
                            if (testDiagonals(nextLetterAsNumber + i, nextNumber - i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // knights
                            if (testKnights(nextLetterAsNumber + i, nextNumber - i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // pawns
                            if (testBlockWithPawn(nextLetterAsNumber + i, nextNumber - i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                        }
                    }

                }

                // down left
                if (tempX < nextLetterAsNumber && tempY < nextNumber) {

                    for (i = 1; i <= 8; i++) {

                        if (document.getElementById(numberAsLetter(nextLetterAsNumber - i) + String(nextNumber - i)).innerText == king
                        ||
                        (nextLetterAsNumber - i < 1 || nextNumber - i < 1)
                        ) {break} 
                        else {

                            // vert and hort
                            if (testVertAndHort(nextLetterAsNumber - i, nextNumber - i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // diagonals
                            if (testDiagonals(nextLetterAsNumber - i, nextNumber - i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // knights
                            if (testKnights(nextLetterAsNumber - i, nextNumber - i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                            // pawns
                            if (testBlockWithPawn(nextLetterAsNumber - i, nextNumber - i, color)) {
                                turn -= 1
                                alertError = 1
                                return 0;
                            }

                        }
                    }

                }

            }
    } 

    alertError = 1
    showError('checkmate, ' + opoColor + ' wins');
    return 1;
}