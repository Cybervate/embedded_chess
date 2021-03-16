function testVertAndHort(dX, dY, color) {

    let opoColor;
    color == 'white' ? opoColor = 'black' : opoColor = 'white';

    for (i = 1; i <= 8; i++) {
        for (j = 1; j <= 8; j++) {
            if (document.getElementById(numberAsLetter(i) + String(j)).innerHTML.search(opoColor) > 0 &&
            document.getElementById(numberAsLetter(i) + String(j)).innerText == pawn) {
                if (
                    move(
                    numberAsLetter(i) + String(j), 
                    numberAsLetter(dX) + String(dY), 1)
                    ) {
                        return 0;
                    }
            }
        }
    }

    return 1;
}