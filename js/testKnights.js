function testKnights(dX, dY, color) {
    let opoColor;
    color == 'white' ? opoColor = 'black' : opoColor = 'white';

    try {
        // right up
        if (
        document.getElementById(numberAsLetter(dX + 2) + String(dY + 1)).innerText == knight && document.getElementById(numberAsLetter(dX + 2) + String(dY + 1)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            return 1;
        }
    } catch(e) {

    }
    try {
        // right down
        if (
        document.getElementById(numberAsLetter(dX + 2) + String(dY - 1)).innerText == knight && document.getElementById(numberAsLetter(dX + 2) + String(dY - 1)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            return 1;
        }
    } catch(e) {

    }
    try {
        // left up
        if (
        document.getElementById(numberAsLetter(dX - 2) + String(dY + 1)).innerText == knight && document.getElementById(numberAsLetter(dX - 2) + String(dY + 1)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            return 1;
        }
    } catch (e) {

    }
    try {
        // left down
        if (
        document.getElementById(numberAsLetter(dX - 2) + String(dY - 1)).innerText == knight && document.getElementById(numberAsLetter(dX - 2) + String(dY - 1)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            return 1;
        }
    } catch (e) {

    }
    try {
        // up right
        if (
        document.getElementById(numberAsLetter(dX + 1) + String(dY + 2)).innerText == knight && document.getElementById(numberAsLetter(dX + 1) + String(dY + 2)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            return 1;
        }
    } catch (e) {

    }
    try {
        // up left
        if (
        document.getElementById(numberAsLetter(dX - 1) + String(dY + 2)).innerText == knight && document.getElementById(numberAsLetter(dX - 1) + String(dY + 2)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            return 1;
        }
    } catch (e) {

    }
    try {
        // down right
        if (
        document.getElementById(numberAsLetter(dX + 1) + String(dY - 2)).innerText == knight && document.getElementById(numberAsLetter(dX + 1) + String(dY - 2)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            return 1;
        }
    } catch (e) {

    }
    try {
        // down left
        if (
        document.getElementById(numberAsLetter(dX - 1) + String(dY - 2)).innerText == knight && document.getElementById(numberAsLetter(dX - 1) + String(dY - 2)).innerHTML.search(opoColor) > 0
        ){
            showError('You will be in check');
            return 1;
        }
    } catch (e) {

    }
}