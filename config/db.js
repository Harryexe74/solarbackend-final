// import mongoose from "mongoose";
// import config from "./index.js";

// mongoose.set("strictQuery", false);

// const connectDB = async () => {
// 	try {
// 		const connect = await mongoose.connect(config.dbURI);

// 		console.log(`Mongodb connected: ${connect.connection.host}`);
// 	} catch (error) {
// 		console.log(`Error: ${error.message}`);
// 	}
// };

// export default connectDB;

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Stop the server if the database connection fails
  }
};

export default connectDB;
