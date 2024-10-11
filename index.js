// import config from "./config/index.js";
// import connectDB from "./config/db.js";

// import app from "./app.js";

// connectDB();

// const port = config.port || 4000;

// app.listen(port, () => {
// 	console.log(`Server is listening on port ${port}`);
// });

import express from 'express';
import connectDB from './config/db.js';

const app = express();

// Middleware, routes, etc.

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;


