function checkForKings(cur, next){
    curElem = document.getElementById(cur);
    nextElem = document.getElementById(next);

    let curNumber = Number(Array.from(cur)[1]);
    let curLetter = Array.from(cur)[0];
    let curLetterAsNumber = letterAsNumber(curLetter);

    let nextNumber = Number(Array.from(next)[1]);
    let nextLetter = Array.from(next)[0];
    let nextLetterAsNumber = letterAsNumber(nextLetter);

    // check for castle
    if (curElem.innerHTML.search('white') > 0) { // for white
        // if castle right
        if (nextLetterAsNumber == curLetterAsNumber + 2)
            {
                if (white_castle_right && 
                document.getElementById('f1').innerText == '' &&
                document.getElementById('g1').innerText == ''){
                    white_castle_right = 0;
                    white_castle_left = 0;
                    document.getElementById('f1').innerHTML = document.getElementById('h1').innerHTML;
                    document.getElementById('h1').innerHTML = '';
                    return 0;
                        
                }
            }
        // if castle left
        else if (nextLetterAsNumber == curLetterAsNumber -2)
            {
                if (white_castle_left && 
                document.getElementById('d1').innerText == '' &&
                document.getElementById('c1').innerText == '' &&
                document.getElementById('b1').innerText == ''){
                    white_castle_right = 0;
                    white_castle_left = 0;
                    document.getElementById('d1').innerHTML = document.getElementById('a1').innerHTML;
                    document.getElementById('a1').innerHTML = '';
                    return 0;
                        
                }
            }
    } 
    else if (curElem.innerHTML.search('black') > 0) { // for black
// if castle right
if (nextLetterAsNumber == curLetterAsNumber + 2)
{
    if (black_castle_right && 
    document.getElementById('f8').innerText == '' &&
    document.getElementById('g8').innerText == ''){
        black_castle_right = 0;
        black_castle_left = 0;
        document.getElementById('f8').innerHTML = document.getElementById('h8').innerHTML;
        document.getElementById('h8').innerHTML = '';
        return 0;
            
    }
}
// if castle left
else if (nextLetterAsNumber == curLetterAsNumber -2)
{
    if (black_castle_left && 
    document.getElementById('d8').innerText == '' &&
    document.getElementById('c8').innerText == '' &&
    document.getElementById('b8').innerText == ''){
        black_castle_right = 0;
        black_castle_left = 0;
        document.getElementById('d8').innerHTML = document.getElementById('a8').innerHTML;
        document.getElementById('a8').innerHTML = '';
        return 0;
            
    }
}
    }

    if (nextNumber > curNumber + 1 || nextNumber < curNumber - 1 ||
        nextLetterAsNumber > curLetterAsNumber + 1 || nextLetterAsNumber < curLetterAsNumber - 1){
            showError('Illegal King Move');
            return 1;
        }

    turn % 2 == 0 ? white_castle_left = 0 : black_castle_left = 0;
    turn % 2 == 0 ? white_castle_right = 0 : black_castle_right = 0;
}