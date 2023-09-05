import { Db, MongoClient } from "mongodb";

class DbConnection {
  static db: Db;
  
  static async init() {
    const connectionString = process.env.DB || '';
    const client = new MongoClient(connectionString);
    try {
      const conn = await client.connect();
      DbConnection.db = conn.db("rtb");
    } catch(e) {
      throw e;
    }
  }
}

export default DbConnection;