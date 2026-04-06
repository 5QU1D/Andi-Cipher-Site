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
    keyword = sanKey(keyword);
    // console.log(keyword);
    keyLen = keyword.length;
    // console.log("Input received:", keyLen);

    var fullRows = Math.floor(keyLen / 5);
    // console.log(fullRows);
    var partialRow = keyLen % 5;
    // console.log(partialRow);

    var cipher = [[1,''],[2,''],[3,''],[4,''],[5,''],[8,''],[9,''],[10,''],[11,''],[6,''],[7,''],[12,''],[0,''], [12,''],[7,''],[6,''],[11,''],[10,''],[9,''],[8,''],[5,''],[4,''],[3,''],[2,''],[1,''],];
    // console.log("(", cipher[0[0]]+", " + cipher[0[1]] + ")");
    // console.log(cipher[0][0]); //returns 1
    // console.log(cipher[0][1]); //correctly returns value of second element of tuple

    for (let i=0; i<keyword.length; i++){
        cipher[i][1] = keyword[i];
    }
    // console.log(cipher);

    let alpha = new Set(['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'])

    for(let char in keyword){
        alpha.delete(keyword[char]);
    }
    // console.log(alpha);

    alpha = Array.from(alpha);
    let letterOrd = keyword;
    for (let el in alpha){
        letterOrd += alpha[el];
    }
    // console.log(letterOrd);





    if (cipherTable.style.display == "none") {
        cipherTable.style.display = "block";
    } else {
        if (keyword = '') cipherTable.style.display = "none";
    }

    //show nav change button
    if (toEncrypt.style.display == "none") {
        toEncrypt.style.display = "block";
    } else {
        toEncrypt.style.display = "none";
    }
}

function navChangeE() {
    location.replace("encrypt.html")
}