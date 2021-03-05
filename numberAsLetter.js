function numberAsLetter(number){
    if (number === 1 || number === 2 || number === 3 || number === 4 || number === 5 || number === 6 || number === 7 || number === 8){
        switch(number){
            case 1:
                return 'a';
            case 2:
                return 'b';
            case 3:
                return 'c';
            case 4:
                return 'd';
            case 5:
                return 'e';
            case 6:
                return 'f';
            case 7:
                return 'g';
            case 8:
                return 'h';
        }
    } else {
        console.log(number, 'nee', numberAsLetter.caller)
        showError('invalid input to numberAsLetter');
        return 1;
    }
}