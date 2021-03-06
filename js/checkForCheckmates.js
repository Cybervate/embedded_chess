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