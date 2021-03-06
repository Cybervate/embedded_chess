function testDiagonals(dX, dY, color) {

    let opoColor;
    color == 'white' ? opoColor = 'black' : opoColor = 'white';

    let stop1 = 0;
    let stop2 = 0;
    let stop3 = 0;
    let stop4 = 0;

    for (i = 1; i <= 8; i++){

        // up and right
        if (dX + i <= 8 && dY + i <= 8){
            if (stop1){}
            else if (
                document.getElementById(numberAsLetter(dX + i) + String(dY + i)).innerHTML.search(color) > 0
            ) {stop1 = 1}
            else {
                if (document.getElementById(numberAsLetter(dX + i) + String(dY + i)).innerText == queen ||
                document.getElementById(numberAsLetter(dX + i) + String(dY + i)).innerText == bishop
                ){
                    showError('You will be in check');
                    return 1;
                }
            }
    }

        // down and left
        if (dX - i >= 1 && dY - i >= 1){
            if (stop2){}
            else if (
                document.getElementById(numberAsLetter(dX - i) + String(dY - i)).innerHTML.search(color) > 0
            ){stop2 = 1}
            else {
                if (document.getElementById(numberAsLetter(dX - i) + String(dY - i)).innerText == queen ||
                document.getElementById(numberAsLetter(dX - i) + String(dY - i)).innerText == bishop
                ){
                    showError('You will be in check');
                    return 1;
                }
            }
    }

        // up and left
        if (dX - i >= 1 && dY + i <= 8){
            if (stop3){}
            else if (
                document.getElementById(numberAsLetter(dX - i) + String(dY + i)).innerHTML.search(color) > 0
            ){stop3 = 1}
            else {
                if (document.getElementById(numberAsLetter(dX - i) + String(dY + i)).innerText == queen ||
                document.getElementById(numberAsLetter(dX - i) + String(dY + i)).innerText == bishop
                ){
                    showError('You will be in check');
                    return 1;
                }
            }
    }

        // down and right
        if (dX + i <= 8 && dY - i >= 1){
            if (stop4){}
            else if (
                document.getElementById(numberAsLetter(dX + i) + String(dY - i)).innerHTML.search(color) > 0
            ){stop4 = 1}
            else {
                if (document.getElementById(numberAsLetter(dX + i) + String(dY - i)).innerText == queen ||
                document.getElementById(numberAsLetter(dX + i) + String(dY - i)).innerText == bishop
                ){
                    showError('You will be in check');
                    return 1;
                }
            }
    }

    }
}