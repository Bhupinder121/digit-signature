document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const userId = document.getElementById("userId").value;
  const message = document.getElementById("message").value;
  
  axios.post('/generateKeyPair', { userId, message })
   .then(response => alert('Key pair generated successfully'))
   .catch(error => alert('Error generating key pair'));
});

function verifySignature() {
  const userId = document.getElementById("userId").value;
  const message = document.getElementById("message").value;
  // Assume `signature` is obtained somehow...
  axios
    .post("/verifySignature", { userId, originalMessage: message, signature })
    .then((response) =>
      alert(
        response.data.verified
          ? "Signature verified successfully"
          : "Invalid signature"
      )
    )
    .catch((error) => alert("Error verifying signature"));
}
