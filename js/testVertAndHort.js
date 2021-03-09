function testVertAndHort(dX, dY, color) {

    let opoColor;
    color == 'white' ? opoColor = 'black' : opoColor = 'white';

    if (dY == 1){
        for (i = dY + 1; i <= 8; i++){
            if (document.getElementById(numberAsLetter(dX) + String(i)).innerHTML.search(color) > 0){
                break;
            }
            else if 
            (document.getElementById(numberAsLetter(dX) + String(i)).innerHTML.search(opoColor) > 0 
            &&
            (document.getElementById(numberAsLetter(dX) + String(i)).innerText != rook
            &&
            document.getElementById(numberAsLetter(dX) + String(i)).innerText != queen 
            ))
            {
                break
            }
            else if (
            document.getElementById(numberAsLetter(dX) + String(i)).innerText == rook ||
            document.getElementById(numberAsLetter(dX) + String(i)).innerText == queen
            ){
                showError('cannot put yourself in check');
                return 1;
            }
        }
    } else if (dY == 8){
        for (i = dY - 1; i >= 1; i--){
            if (document.getElementById(numberAsLetter(dX) + String(i)).innerHTML.search(color) > 0){
                break;
            }
            else if 
            (document.getElementById(numberAsLetter(dX) + String(i)).innerHTML.search(opoColor) > 0 
            &&
            (document.getElementById(numberAsLetter(dX) + String(i)).innerText != rook
            &&
            document.getElementById(numberAsLetter(dX) + String(i)).innerText != queen 
            ))
            {
                break
            }
            else if (
            document.getElementById(numberAsLetter(dX) + String(i)).innerText == rook ||
            document.getElementById(numberAsLetter(dX) + String(i)).innerText == queen
            ){
                showError('cannot put yourself in check');
                return 1;
            }
        }
    } else {
        // above
        for (i = dY + 1; i <= 8; i++){
            if (document.getElementById(numberAsLetter(dX) + String(i)).innerHTML.search(color) > 0){
                break;
            }
            else if 
            (document.getElementById(numberAsLetter(dX) + String(i)).innerHTML.search(opoColor) > 0 
            &&
            (document.getElementById(numberAsLetter(dX) + String(i)).innerText != rook
            &&
            document.getElementById(numberAsLetter(dX) + String(i)).innerText != queen 
            ))
            {
                break
            }
            else if (
            document.getElementById(numberAsLetter(dX) + String(i)).innerText == rook ||
            document.getElementById(numberAsLetter(dX) + String(i)).innerText == queen
            ){
                showError('cannot put yourself in check');
                return 1;
            }
        }
        // below
        for (i = dY - 1; i >= 1; i--){
            if (document.getElementById(numberAsLetter(dX) + String(i)).innerHTML.search(color) > 0){
                break;
            }
            else if 
            (document.getElementById(numberAsLetter(dX) + String(i)).innerHTML.search(opoColor) > 0 
            &&
            (document.getElementById(numberAsLetter(dX) + String(i)).innerText != rook
            &&
            document.getElementById(numberAsLetter(dX) + String(i)).innerText != queen 
            ))
            {
                break
            }
            else if (
            document.getElementById(numberAsLetter(dX) + String(i)).innerText == rook ||
            document.getElementById(numberAsLetter(dX) + String(i)).innerText == queen
            ){
                showError('cannot put yourself in check');
                return 1;
            }
        }
    }

    // horizontals
    if (dX == 1){
        for (i = dX + 1; i <= 8; i++){
            if (document.getElementById(numberAsLetter(i) + String(dY)).innerHTML.search(color) > 0){
                break;
            }
            else if 
            (document.getElementById(numberAsLetter(i) + String(dY)).innerHTML.search(opoColor) > 0 
            &&
            (document.getElementById(numberAsLetter(i) + String(dY)).innerText != rook
            &&
            document.getElementById(numberAsLetter(i) + String(dY)).innerText != queen 
            ))
            {
                break
            }
            else if (
            document.getElementById(numberAsLetter(i) + String(dY)).innerText == rook ||
            document.getElementById(numberAsLetter(i) + String(dY)).innerText == queen
            ){
                showError('cannot put yourself in check');
                return 1;
            }
        }
    } else if (dX == 8){
        for (i = dX - 1; i >= 1; i--){
            if (document.getElementById(numberAsLetter(i) + String(dY)).innerHTML.search(color) > 0){
                break;
            }
            else if 
            (document.getElementById(numberAsLetter(i) + String(dY)).innerHTML.search(opoColor) > 0 
            &&
            (document.getElementById(numberAsLetter(i) + String(dY)).innerText != rook
            &&
            document.getElementById(numberAsLetter(i) + String(dY)).innerText != queen 
            ))
            {
                break
            }
            else if (
            document.getElementById(numberAsLetter(i) + String(dY)).innerText == rook ||
            document.getElementById(numberAsLetter(i) + String(dY)).innerText == queen
            ){
                showError('cannot put yourself in check');
                return 1;
            }
        }
    } else {
        // above
        for (i = dX + 1; i <= 8; i++){
            if (document.getElementById(numberAsLetter(i) + String(dY)).innerHTML.search(color) > 0){
                break;
            }
            else if 
            (document.getElementById(numberAsLetter(i) + String(dY)).innerHTML.search(opoColor) > 0 
            &&
            (document.getElementById(numberAsLetter(i) + String(dY)).innerText != rook
            &&
            document.getElementById(numberAsLetter(i) + String(dY)).innerText != queen 
            ))
            {
                break
            }
            else if (
            document.getElementById(numberAsLetter(i) + String(dY)).innerText == rook ||
            document.getElementById(numberAsLetter(i) + String(dY)).innerText == queen
            ){
                showError('cannot put yourself in check');
                return 1;
            }
        }
        // below
        for (i = dX - 1; i >= 1; i--){
            if (document.getElementById(numberAsLetter(i) + String(dY)).innerHTML.search(color) > 0){
                break;
            }
            else if 
            (document.getElementById(numberAsLetter(i) + String(dY)).innerHTML.search(opoColor) > 0 
            &&
            (document.getElementById(numberAsLetter(i) + String(dY)).innerText != rook
            &&
            document.getElementById(numberAsLetter(i) + String(dY)).innerText != queen 
            ))
            {
                break
            }
            else if (
            document.getElementById(numberAsLetter(i) + String(dY)).innerText == rook ||
            document.getElementById(numberAsLetter(i) + String(dY)).innerText == queen
            ){
                showError('cannot put yourself in check');
                return 1;
            }
        }
    }

}