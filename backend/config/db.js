const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bookmyvenue';
  const dbName = process.env.MONGODB_DBNAME || 'bookmyvenue';
  try {
    // Mongoose v6+ no longer needs parser/topology flags
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      dbName,
    });

    // Ensure collections exist (helps avoid seeing only `test`/no collections in Atlas UI)
    const collectionsToEnsure = ['users', 'venues', 'bookings'];
    await Promise.all(
      collectionsToEnsure.map(async (collectionName) => {
        try {
          await conn.connection.createCollection(collectionName);
        } catch (err) {
          // Ignore "already exists" errors
          if (err?.code === 48 || err?.codeName === 'NamespaceExists') return;
          throw err;
        }
      })
    );

    console.log(`MongoDB Connected: ${conn.connection.host} (db: ${conn.connection.name})`);
  } catch (error) {
    // Better error messages for common auth issues
    console.error('MongoDB connection error:', error.message);

    if (/authentication failed|bad auth/i.test(error.message)) {
      console.error('Authentication failed when connecting to MongoDB.');
      console.error('Please check `MONGODB_URI` in backend/.env — ensure username, password, and database name are correct.');
      console.error('Example Atlas URI: mongodb+srv://<user>:<pass>@cluster0.xyz.mongodb.net/bookmyvenue?retryWrites=true&w=majority');
    }

    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
};

module.exports = connectDB;
