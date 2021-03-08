function checkForStalemates(cur, next) {
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    let curNumber = Number(Array.from(cur)[1]);
    let curLetter = Array.from(cur)[0];
    let curLetterAsNumber = letterAsNumber(curLetter);

    let nextNumber = Number(Array.from(next)[1]);
    let nextLetter = Array.from(next)[0];
    let nextLetterAsNumber = letterAsNumber(nextLetter);

    let color, opoColor;
    turn % 2 == 0 ? color = 'white' : color = 'black';
    color == 'white' ? opoColor = 'black' : opoColor = 'white';

    alertError = 0

    for (i = 1; i <= 8; i++) {
        for (j = 1; j <= 8; j++) {

            if (document.getElementById(numberAsLetter(i) + String(j)).innerHTML.search(opoColor) > 0)
            {

                if (document.getElementById(numberAsLetter(i) + String(j)).innerText == (rook || queen)) {

                    let placeX = i;
                    let placeY = j;

                    for (k = 1; k <= 8; k++) {

                        // up
                        if (
                            (placeY + i < 8) &&
                            move(numberAsLetter(placeX) + String(placeY), numberAsLetter(placeX) + String(placeY + i), 1)
                            ) {return 0}

                        // down
                        if (
                            (placeY - i > 1) &&
                            move(numberAsLetter(placeX) + String(placeY), numberAsLetter(placeX) + String(placeY - i), 1)
                            ) {return 0}

                        // right
                        if (
                            (placeX + i < 8) &&
                            move(numberAsLetter(placeX) + String(placeY), numberAsLetter(placeX + i) + String(placeY), 1)
                            ) {return 0}

                        // left
                        if (
                            (placeX - i > 1) &&
                            move(numberAsLetter(placeX) + String(placeY), numberAsLetter(placeX - i) + String(placeY), 1)
                            ) {return 0}


                    }

                }

                if (document.getElementById(numberAsLetter(i) + String(j)).innerText == (knight)) {

                    let placeX = i;
                    let placeY = j;

                    for (k = 1; k <= 8; k++) {

                    }

                }



            }

        }
    }

    alertError = 1
    showError('Stalemate, Draw');
    return 1;
}