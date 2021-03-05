function letterAsNumber(letter){
    if (letter === 'a' || letter === 'b' || letter === 'c' || letter === 'd' || letter === 'e' || letter === 'f' || letter === 'g' || letter === 'h'){
        switch (letter){
            case 'a':
                return 1;
            case 'b':
                return 2;
            case 'c':
                return 3;
            case 'd':
                return 4;
            case 'e':
                return 5;
            case 'f':
                return 6;
            case 'g':
                return 7;
            case 'h':
                return 8;
        }
    } else {
        showError('invalid input to letterAsNumber');
        return 1;
    }
}