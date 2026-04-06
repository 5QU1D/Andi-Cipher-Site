function printText() {
  document.getElementById("return").innerHTML = output;
  document.getElementById("return").style.display = "block";
}

// Source - https://stackoverflow.com/a/56150320
// Posted by Pawel, modified by community. See post 'Timeline' for change history
// Retrieved 2026-04-06, License - CC BY-SA 4.0

function reviver(key, value) {
  if(typeof value === 'object' && value !== null) {
    if (value.dataType === 'Map') {
      return new Map(value.value);
    }
  }
  return value;
}


function encrypt() {
  input = document.getElementById("plaintext").value;

  // code = localStorage.getItem("cipher");
  // code = new Map(JSON.parse(localStorage.cipher));
  var inward = localStorage.getItem("cipher");
  console.log(inward);
  code = JSON.parse(inward, reviver);
  console.log(code);

  console.log(code.entries());

  let dakeys = code.keys();
  console.log(dakeys.size);

  for(let i=0;i<dakeys.size;i++){
    console.log(dakeys.next().value);
  }

  //when encrypting, search code[i][0], return code[i][1]
  for (let char in input) {
    output += code.get(char);
  }
  printText();
}