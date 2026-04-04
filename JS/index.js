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

function genCipher() {
    keyword = document.getElementById("keyword").value;
    makeMatrix();

    keyLen = keyword.length;
    // console.log("Input received:", keyLen);





    //show cipher table
    if (cipherTable.style.display === "none") {
        cipherTable.style.display = "block";
    } else {
        cipherTable.style.display = "none";
    }

    //show nav change button
    if (toEncrypt.style.display === "none") {
        toEncrypt.style.display = "block";
    } else {
        toEncrypt.style.display = "none";
    }
}

function navChangeE() {
    location.replace("encrypt.html")
}