import express, { Express, Request, Response, Application } from "express";
import * as crypto from "crypto";
import { dbCollection } from "./DbConnection";

const app : Application = express();


app.use(express.static(__dirname + "/public"));
app.use(express.json());


app.listen(3000, () => console.log("Server started on port 3000"));

app.get("/", (req, res) => {
  res.render("./public/index.html");
});



app.post("/generateKeyPair", async (req, res) => {
  const { userId} = req.body;

  dbCollection.findOne({userId: userId}).then(async(result)=>{
    if(result == null){
      const {publicKey, privateKey} = createKeyPair();
      await dbCollection.insertOne({userId: userId, 
        publicKey: publicKey, 
        privateKey: privateKey})
      res.status(200).send({publicKey: publicKey, 
                            privateKey: privateKey});
    }
    else{
      res.status(200).send({publicKey: result.publicKey, 
      privateKey: result.privateKey});
    }
  }).catch((error)=>{
    console.log(error);
    res.status(503).send(error);
  });
});

app.post("/getHash", (req, res)=>{
  const {message} = req.body;
  let test = crypto.createHash('SHA256').update(message).digest("hex");
  
  res.status(200).json({hash: test});
});

app.post("/getSign", async (req, res)=>{
  const {userId, message} = req.body;
  const signer = crypto.createSign('RSA-SHA256');
  signer.write(message);
  signer.end();

  const result = await dbCollection.findOne({userId: userId});
  if(result != null){
    const signature = signer.sign(result.privateKey, 'hex');
    res.status(200).json({signature: signature})
  }
  else{
    res.status(404);
  }
});

app.post("/verifySignature", async (req, res) => {
  const { userId, originalMessage, signature } = req.body;
  const result = await dbCollection.findOne({userId: userId});
  if(result != null){
    const verifier = crypto.createVerify('RSA-SHA256');
    verifier.write(originalMessage);
    verifier.end();
    const verified = verifier.verify(result.publicKey, signature, 'hex');
    
    res.json({verified});
  }
  else{
    res.status(404);
  }
  
  
});


function createKeyPair(){
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 1024,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    }
  });
  return {publicKey, privateKey};
}
