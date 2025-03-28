const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'alpaca-db';

let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  
  const client = await MongoClient.connect(MONGODB_URI);
  const db = client.db(DB_NAME);
  cachedDb = db;
  return db;
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  
  try {
    const db = await connectToDatabase();
    const collection = db.collection('stores');
    
    // 요청 메서드에 따라 다른 처리
    switch (event.httpMethod) {
      case 'GET':
        const stores = await collection.find({}).toArray();
        return {
          statusCode: 200,
          body: JSON.stringify(stores)
        };
        
      case 'POST':
        const storeData = JSON.parse(event.body);
        const result = await collection.insertOne({
          ...storeData,
          createdAt: new Date().toISOString()
        });
        return {
          statusCode: 201,
          body: JSON.stringify({ 
            id: result.insertedId,
            ...storeData
          })
        };
        
      default:
        return {
          statusCode: 405,
          body: JSON.stringify({ message: '허용되지 않는 메서드입니다' })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: '서버 오류: ' + error.message })
    };
  }
};
