import {MongoClient, Collection, Db} from "mongodb";
import {config} from "dotenv";



let dbCollection : Collection;


async function connectToDatabase() {
  config();

  const client = new MongoClient(process.env.DB_URI!);

  await client.connect();

  const db: Db = client.db(process.env.DB_NAME);
  dbCollection = db.collection(process.env.DB_COLLECTION!);
  
  
}
connectToDatabase();

export {dbCollection}
