const express = require("express");
const crypto = require('crypto')
const app = express();
app.listen(3000, () => console.log("Server started on port 3000"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.get("/", (req, res) => {
  res.render("./public/index.html");
});

app.post("/generateKeyPair", (req, res) => {
  const { userId } = req.body;
  console.log(req.body);
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  console.log(userId, publicKey, privateKey);
  res.status(200).send("Ok");
  // Save the keys associated with the user ID...
});

app.post("/verifySignature", (req, res) => {
  const { userId, originalMessage, signature } = req.body;
  // Retrieve the public key associated with the user ID...
  const verified = crypto.verify(
    null,
    Buffer.from(originalMessage),
    publicKey,
    signature
  );
  res.json({ verified });
});
