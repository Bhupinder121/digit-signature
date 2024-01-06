const express = require("express");
const crypto = require('crypto')
const { MongoClient } = require("mongodb");
const app = express();

const uri =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1";
const client = MongoClient(uri);

client.connect().then((res)=>{console.log("connected")});

app.listen(3000, () => console.log("Server started on port 3000"));
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.get("/", (req, res) => {
  res.render("./public/index.html");
});



app.post("/generateKeyPair", (req, res) => {
  const { userId, message } = req.body;
  console.log(req.body);
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
  });
  crypto.crea
  console.log(crypto.createHash("SHA256", "key").update(message).digest("hex"))
  res.status(200).send({publicKey, privateKey});
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
