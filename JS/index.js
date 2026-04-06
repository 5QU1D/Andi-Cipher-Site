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

function updateFields() {
    // let a = 1;
    // console.log(document.getElementById(a)); //successfully pulls intended element
    //update the grid input values (0-24)
    let keys = code.keys();
    for(let i=0;i<25;i++){
        document.getElementById(i).value = keys.next().value;
    }
}

function genCipher() {
    keyword = document.getElementById("keyword").value;
    keyword = keyword.toLowerCase();

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

    var cipher = [[1,''],[2,''],[3,''],[4,''],[5,''],[8,''],[9,''],[10,''],[11,''],[6,''],[7,''],[12,''],[13,''], [12,''],[7,''],[6,''],[11,''],[10,''],[9,''],[8,''],[5,''],[4,''],[3,''],[2,''],[1,''],];
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

    var pairing = [[1,[]], [2,[]], [3,[]], [4,[]], [5,[]], [6,[]], [7,[]], [8,[]], [9,[]], [10,[]], [11,[]], [12,[]],[13,[]]];
    
    for(let i=0; i<cipher.length;i++){
        let key = cipher[i][0];
        for(let j=0;j<pairing.length;j++){
            if (key == pairing[j][0]){
                pairing[j][1].push(cipher[i][1]);
                break;
            }
        }
    }
    var mirror = pairing[12][1][0];
    pairing[12][1].push(mirror);
    // console.log(pairing);

    //new map (code) pairing pairing[j][1][0] and pairing[j][1][1] as two pushes (j10=j11 and j11=j10)
    code = new Map();
    for(let i=0;i<pairing.length;i++){
        code.set(pairing[i][1][0], pairing[i][1][1]);
    }
    for(let i=pairing.length-1; i>=0;i--){
        code.set(pairing[i][1][1], pairing[i][1][0]);
    }
    // console.log(code.get('a')); //'a' and "a" return same

    updateFields();

    //show cipher table
    if (cipherTable.style.display == "none") {
        cipherTable.style.display = "flex";
    } else {
        cipherTable.style.display = "none";
    }

    if(updateCipher.style.display == "none"){
        updateCipher.style.display = "block";
    } else {
        updateCipher.style.display = "none";
    }

    //show nav change button
    if (toEncrypt.style.display == "none") {
        toEncrypt.style.display = "block";
    } else {
        toEncrypt.style.display = "none";
    }
}

function updateCi() {
    var newKeys = new Array();
    for(let i=0;i<25;i++){
        newKeys.push(document.getElementById(i).value);
    }
    // console.log(newKeys);

    //read values from the ends inward to pair for keys:values
    newCode = new Map();
    //front:back inward
    for(let i=0; i<13;i++){
        // console.log(newKeys[i] + ", " + newKeys[24-i])
        newCode.set(newKeys[i],newKeys[24-1]);
    }

    //back:front inward
    for(let i=12; i>=0;i--){
        // console.log(newKeys[24-i] + ", " + newKeys[i]);
        newCode.set(newKeys[24-i], newKeys[i]);
    }

    code = newCode;
    updateFields();
}

function navChangeE() {
    location.replace("encrypt.html")
}