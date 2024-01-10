function getKeyPair(){
  if(!check(0)){
    return null;
  }
  const userId = document.getElementById("userId").value;
  
  axios.post('/generateKeyPair', { userId })
   .then(response => {
      document.getElementById("privatekey").textContent = response.data.privateKey;
      document.getElementById("publickey").textContent = response.data.publicKey;
   })
   .catch(error => alert('Error generating key pair'));
}


function getHash(){
  if(!check(1)){
    return null;
  }
  const message = document.getElementById("message").value;
  axios.post("/getHash", {userId, message}).then((res)=>{
    document.getElementById("hash").textContent = res.data.hash;
  }).catch((error)=>{
    console.log(error);
    alert("ERRor");
  });
}

function getSign(){
  if(!check(0) || !check(1)){
    return null;
  }
  const userId = document.getElementById("userId").value;
  const message = document.getElementById("message").value;
  axios.post("/getSign", {userId, message}).then((res)=>{
    document.getElementById("sign").textContent = res.data.signature;
  }).catch((error)=>{
    console.log(error);
    alert("ERRor");
  });
}

function verifySignature() {
  if(!check(3)){
    return null;
  };
  const userId = document.getElementById("userId").value;
  const message = document.getElementById("message").value;
  const signature = document.getElementById("getSign").value;
  
  
  axios
    .post("/verifySignature", { userId, originalMessage: message , signature: signature})
    .then((response) =>
      alert(
        response.data.verified
          ? "Signature verified successfully"
          : "Invalid signature"
      )
    )
    .catch((error) => alert("Error verifying signature"));
}


function check(option){
  if(option == 0){
    let user = document.getElementById("userId");
    if(user.value == '' || user.value == user.defaultValue) {
      alert("Please enter the userId");
      return false;
    }
    
  }
  else if (option == 1){
    let mess = document.getElementById("message");
    if(mess.value == '' || mess.value == mess.defaultValue) {
      alert("Please enter the message");
      return false;
    }
  }
  else if (option == 2)
  {
    let sg = document.getElementById("getSign");
    if(sg.value == '' || sg.value == sg.defaultValue) {
      alert("Please enter the Signature");
      return false;
    }
  }
  else if (option == 3){
    for(let i = 0; i < 3; i++){
      if(!check(i)){
        return false;
      }
    }
  }
  return true;
}