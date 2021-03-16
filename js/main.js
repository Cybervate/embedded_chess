const pawn = 'o'
const bishop = 'v'
const knight = 'm'
const rook = 't'
const queen = 'w'
const king = 'l'

var turn = 0; // even = white, odd = black

var white_castle_right = 1 // 1 = true, 0 = false
var white_castle_left = 1 
var black_castle_right = 1 
var black_castle_left = 1

var alertError = 1

// called every move
function move(cur, next, test){
    document.querySelector('.messageBox').innerText = '';
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    if (checkForUnrealMove(cur, next)) {return 0};
    if (checkForTurn(curElem)) {return 0};
    if (checkForRealMove(curElem)) {return 0};
    if (checkForCaptureOwnPiece(curElem, nextElem)) {return 0};
    if (checkForChecks(cur, next)) {return 0};

    if (curElem.innerText == pawn) {
        if (checkForPawns(cur, next)) {return 0};
    }

    if (curElem.innerText == rook) {
        if (checkForRooks(cur, next, 'rook')) {return 0};
    }

    if (curElem.innerText == knight) {
        if (checkForKnights(cur, next)) {return 0};
    }

    if (curElem.innerText == bishop) {
        if(checkForBishops(cur, next, 'bishop')) {return 0};
        if(checkForBishopBlockers(cur, next, 'bishop')) {return 0};
    }

    if (curElem.innerText == queen) {
        if(checkForQueens(cur, next)) {return 0};
    }

    if (curElem.innerText == king) {
        if(checkForKings(cur, next)) {return 0};
    }

    if (test == 0) {
        nextElem.innerHTML = curElem.innerHTML;
        curElem.innerHTML = ''
        if (checkForChecksForCheckmate(cur, next)){
        } else {
            checkForStalemates(cur, next);
        }
        alertError = 1
        if (turn % 2 == 0) {
            flip = 0;
            boardFlip();
        } else {
            flip = 1;
            boardFlip();
        }
        turn += 1;    
    }    

    console.log(turn)
    return 1;
}


function showError(message){
    if (alertError){
        // alert(message)
        document.querySelector('.messageBox').innerText = message;
    } else {
        console.log(message) 
    }
}

function checkForUnrealMove(cur, next){
    letterAsNumber(Array.from(cur)[0]);
    letterAsNumber(Array.from(next)[0]);

    let curNumber = Number(Array.from(cur)[1]);
    let nextNumber = Number(Array.from(next)[1]);

    if (curNumber < 1 || curNumber > 8 || nextNumber < 1 || nextNumber > 8){
        showError('That square does note exits')
        return 1;
    }
}



function checkForTurn(curElem){
    if (turn % 2 == 0 && curElem.innerHTML.search('black') > 0){
        showError("White's turn")
        return 1;
    }
    else if (turn % 2 != 0 && curElem.innerHTML.search('white') > 0){
        showError("Black's turn")
        return 1;
    }
}



function checkForRealMove(curElem){
    if (curElem.innerText == ''){
        showError('No Piece There');
        return 1;
    }
}



function checkForCaptureOwnPiece(curElem, nextElem){
    if (curElem.innerHTML.search('white') > 0 && nextElem.innerHTML.search('white') > 0){ // for white
        showError('Cannot take own piece');
        return 1;
    } 
    else if (curElem.innerHTML.search('black') > 0 && nextElem.innerHTML.search('black') > 0) { // for black
        showError('Cannot take own piece');
        return 1;
    }
}

function resetGame(){
    location.reload();
    return false;
    // var turn = 0; // even = white, odd = black

    // var white_castle_right = 1 // 1 = true, 0 = false
    // var white_castle_left = 1 
    // var black_castle_right = 1 
    // var black_castle_left = 1

    // var alertError = 1

    // document.querySelector('.board').innerHTML = `
    // <div id="a8" class="square light"><div class="piece black">t</div></div>
    // <div id="b8" class="square dark"><div class="piece black">m</div></div>
    // <div id="c8" class="square light"><div class="piece black">v</div></div>
    // <div id="d8" class="square dark"><div class="piece black">w</div></div>
    // <div id="e8" class="square light"><div class="piece black">l</div></div>
    // <div id="f8" class="square dark"><div class="piece black">v</div></div>
    // <div id="g8" class="square light"><div class="piece black">m</div></div>
    // <div id="h8" class="square dark"><div class="piece black">t</div></div>

    // <div id="a7" class="square dark"><div class="piece black">o</div></div>
    // <div id="b7" class="square light"><div class="piece black">o</div></div>
    // <div id="c7" class="square dark"><div class="piece black">o</div></div>
    // <div id="d7" class="square light"><div class="piece black">o</div></div>
    // <div id="e7" class="square dark"><div class="piece black">o</div></div>
    // <div id="f7" class="square light"><div class="piece black">o</div></div>
    // <div id="g7" class="square dark"><div class="piece black">o</div></div>
    // <div id="h7" class="square light"><div class="piece black">o</div></div>
    
    // <div id="a6" class="square light"><div class="piece"></div></div>
    // <div id="b6" class="square dark"><div class="piece"></div></div>
    // <div id="c6" class="square light"><div class="piece"></div></div>
    // <div id="d6" class="square dark"><div class="piece"></div></div>
    // <div id="e6" class="square light"><div class="piece"></div></div>
    // <div id="f6" class="square dark"><div class="piece"></div></div>
    // <div id="g6" class="square light"><div class="piece"></div></div>
    // <div id="h6" class="square dark"><div class="piece"></div></div>

    // <div id="a5" class="square dark"><div class="piece"></div></div>
    // <div id="b5" class="square light"><div class="piece"></div></div>
    // <div id="c5" class="square dark"><div class="piece"></div></div>
    // <div id="d5" class="square light"><div class="piece"></div></div>
    // <div id="e5" class="square dark"><div class="piece"></div></div>
    // <div id="f5" class="square light"><div class="piece"></div></div>
    // <div id="g5" class="square dark"><div class="piece"></div></div>
    // <div id="h5" class="square light"><div class="piece"></div></div>
    
    // <div id="a4" class="square light"><div class="piece"></div></div>
    // <div id="b4" class="square dark"><div class="piece"></div></div>
    // <div id="c4" class="square light"><div class="piece"></div></div>
    // <div id="d4" class="square dark"><div class="piece"></div></div>
    // <div id="e4" class="square light"><div class="piece"></div></div>
    // <div id="f4" class="square dark"><div class="piece"></div></div>
    // <div id="g4" class="square light"><div class="piece"></div></div>
    // <div id="h4" class="square dark"><div class="piece"></div></div>
    
    // <div id="a3" class="square dark"><div class="piece"></div></div>
    // <div id="b3" class="square light"><div class="piece"></div></div>
    // <div id="c3" class="square dark"><div class="piece"></div></div>
    // <div id="d3" class="square light"><div class="piece"></div></div>
    // <div id="e3" class="square dark"><div class="piece"></div></div>
    // <div id="f3" class="square light"><div class="piece"></div></div>
    // <div id="g3" class="square dark"><div class="piece"></div></div>
    // <div id="h3" class="square light"><div class="piece"></div></div>
    
    // <div id="a2" class="square light"><div class="piece white">o</div></div>
    // <div id="b2" class="square dark"><div class="piece white">o</div></div>
    // <div id="c2" class="square light"><div class="piece white">o</div></div>
    // <div id="d2" class="square dark"><div class="piece white">o</div></div>
    // <div id="e2" class="square light"><div class="piece white">o</div></div>
    // <div id="f2" class="square dark"><div class="piece white">o</div></div>
    // <div id="g2" class="square light"><div class="piece white">o</div></div>
    // <div id="h2" class="square dark"><div class="piece white">o</div></div>

    // <div id="a1" class="square dark"><div class="piece white">t</div></div>
    // <div id="b1" class="square light"><div class="piece white">m</div></div>
    // <div id="c1" class="square dark"><div class="piece white">v</div></div>
    // <div id="d1" class="square light"><div class="piece white">w</div></div>
    // <div id="e1" class="square dark"><div class="piece white">l</div></div>
    // <div id="f1" class="square light"><div class="piece white">v</div></div>
    // <div id="g1" class="square dark"><div class="piece white">m</div></div>
    // <div id="h1" class="square light"><div class="piece white">t</div></div>
    // `

    // var click = 1
    // var spots = ['', '']
}



function handleCommands(){
    const command = document.getElementById('commands');
    let forMove = command.value.split(' ');

    move(forMove[0], forMove[1], 0, 1);
    command.value = '';
}

var click = 1
var spots = ['', '']

// handles clicking pieces
function clicks(e){
    if (click >= 3) {
        click = 1
        spots = ['', '']
    }
    let target = e.srcElement || e.target;
    if (click == 1) {
        spots[0] = target.id || target.parentElement.id
    } else if (click == 2) {
        spots[1] = target.id || target.parentElement.id
    }
    if (spots[0] != '' && spots[1] != ''){
        move(spots[0], spots[1], 0);    
    }
    click += 1
    // console.log(spots)
    // console.log(target.id || target.parentElement.id)
}


document.getElementById('commands').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        handleCommands()
    } 
    else if (event.keyIdentifier === 13) {
        handleCommands()
    } 
    else if (event.keyCode === 13) {
        handleCommands()
    }
})

const move_list = [
    // 'e2', 'e4', 'e7', 'e5', 'f1', 'c4', 'f8', 'c5', 'd1', 'f3', 'a7', 'a6', 'h2', 'h4', 'a6', 'a5', 'h1', 'h3', 'a5', 'a4', 'f3', 'c3', 'a4', 'a3', 'h3', 'g3', 'b7', 'b6', 'g3', 'g5', 'c8', 'b7'
]

let moveVar = 0
let moveLoc = ['', '']
move_list.forEach((element) => {
    if (moveVar % 2 == 0) {
        moveLoc[0] = element;
        moveVar += 1;
    } else {
        moveLoc[1] = element;
        moveVar += 1;
    }
    if (moveLoc[0] !== '' && moveLoc[1] !== '') {
        move(moveLoc[0], moveLoc[1], 0);
        moveLoc = ['', ''];
    }
});