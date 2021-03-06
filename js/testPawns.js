function testPawns(dX, dY, color) {
    let pawnDirection;
    let opoColor;
    color == 'white' ? pawnDirection = 1 : pawnDirection = -1;
    color == 'white' ? opoColor = 'black' : opoColor = 'white';
    try {
        if  (
            document.getElementById(numberAsLetter(dX + 1) + String(dY + pawnDirection)).innerText == pawn &&
            document.getElementById(numberAsLetter(dX + 1) + String(dY + pawnDirection)).innerHTML.search(opoColor) > 0
            ){
                showError('You will be in check');
                return 1;
            }
    } catch (e){

    }
    try {
        if  (
            document.getElementById(numberAsLetter(dX - 1) + String(dY + pawnDirection)).innerText == pawn &&
            document.getElementById(numberAsLetter(dX - 1) + String(dY + pawnDirection)).innerHTML.search(opoColor) > 0
            ){
            showError('You will be in check');
            return 1;
        }
    } catch (e) {

    }
}