function makeMatrix() {
    let square = new Array();
    for (let i=0; i<5; i++){
        square[i] = new Array();
        for (let j=0; j<5; j++){
            square[i][j] = new Array();
        }
    }
    //https://slbuchanan.wordpress.com/2013/02/06/codes-and-ciphers/
    //populate square according to model
    square[0][0] = square[4][4] = 1;
    square[1][0] = square[3][4] = 2;
    square[2][0] = square[2][4] = 3;
    square[3][0] = square[1][4] = 4;
    square[4][0] = square[0][4] = 5;
    square[0][1] = square[4][3] = 8;
    square[1][1] = square[3][3] = 9;
    square[2][1] = square[2][3] = 10;
    square[3][1] = square[1][3] = 11;
    square[4][1] = square[0][3] = 6;
    square[0][2] = square[4][2] = 7;
    square[1][2] = square[3][2] = 12;
    square[2][2] = "0";
}

function sanKey(key) {
    let seen = new Set();
    let result = '';

    for (let char of key){
        if (!seen.has(char)){
            result += char;
            seen.add(char);
        }
    }
    return result;
}

function genCipher() {
    keyword = document.getElementById("keyword").value;
    keyword = keyword.toLowerCase();
    // makeMatrix();
    // console.log(keyword);

    //replace any J's with I's
    key = Array.from(keyword);
    for (let i=0; i<key.length; i++){
        if (key[i] == "j") {
            key[i] = "i";
            break;
        }
    }
    keyword = "";
    for (let char in key){
        keyword += key[char];
    }

    keyword = sanKey(keyword); //remove duplicate letters from key
    // console.log(keyword);

    var cipher = [[1,''],[2,''],[3,''],[4,''],[5,''],[8,''],[9,''],[10,''],[11,''],[6,''],[7,''],[12,''],[0,''], [12,''],[7,''],[6,''],[11,''],[10,''],[9,''],[8,''],[5,''],[4,''],[3,''],[2,''],[1,''],];
    // console.log(cipher[0][0]); //returns 1
    // console.log(cipher[0][1]); //correctly returns value of second element of tuple

    //NO J ON PURPOSE - j in key converted to I early on
    //this means encryption solution will need to convert Js to Is on the fly as needed
    let alpha = new Set(['a','b','c','d','e','f','g','h','i','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'])

    for(let char in keyword){
        alpha.delete(keyword[char]); //remove letters in keyword from alphabet set
    }
    // console.log(alpha);
    alpha = Array.from(alpha);
    let letterOrd = keyword; //string starts with keyword, then follows with remaining letters in order
    for (let el in alpha){
        letterOrd += alpha[el];
    }

    //load cipher array with the string elements
    for (let i=0; i<letterOrd.length; i++) {
        cipher[i][1] = letterOrd[i];
    }
    // console.log(cipher);

    var pairing = [[0,[]], [1,[]], [2,[]], [3,[]], [4,[]], [5,[]], [6,[]], [7,[]], [8,[]], [9,[]], [10,[]], [11,[]], [12,[]]];
    
    for(let i=0; i<cipher.length;i++){
        let key = cipher[i][0];
        for(let j=0;j<pairing.length;j++){
            if (key == pairing[j][0]){
                pairing[j][1].push(cipher[i][1]);
                break;
            }
        }
    }
    var mirror = pairing[0][1][0];
    pairing[0][1].push(mirror);

    //new map, code, pairing pairing[j][1][0] and pairing[j][1][1] as two pushes (j10=j11 and j11=j10)
    var code = new Map();
    for(let i=0;i<pairing.length;i++){
        code.set(pairing[i][1][0], pairing[i][1][1]);
        code.set(pairing[i][1][1], pairing[i][1][0]);
    } //can confirm map appears to be correctly populated
    // console.log(code.get('a')); //'a' and "a" return same

    



    //when encrypting, search code[i][0], return code[i][1]

    if (cipherTable.style.display == "none") {
        cipherTable.style.display = "block";
    } else {
        if (keyword = '') cipherTable.style.display = "none";
    }

    //show nav change button
    if (toEncrypt.style.display == "none") {
        toEncrypt.style.display = "block";
    } else {
        if (keyword = '') toEncrypt.style.display = "none";
    }
}

function navChangeE() {
    location.replace("encrypt.html")
}