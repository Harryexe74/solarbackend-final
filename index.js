// import config from "./config/index.js";
// import connectDB from "./config/db.js";

// import app from "./app.js";

// connectDB();

// const port = config.port || 4000;

// app.listen(port, () => {
// 	console.log(`Server is listening on port ${port}`);
// });


import config from "./config/index.js"; // Import configuration settings
import connectDB from "./config/db.js"; // Import database connection function
import app from "./app.js"; // Import the Express app

// Connect to the database
connectDB().then(() => {
    const port = config.port || 4000; // Set the port, defaulting to 4000 if not specified

    // Start the server
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`); // Log successful server start
    });
}).catch((error) => {
    console.error('Database connection failed:', error.message); // Log any errors during database connection
    process.exit(1); // Exit the process with failure
});
const server = app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// Handle termination signals for graceful shutdown
const shutdown = (signal) => {
    console.log(`Received ${signal}. Closing server...`);
    server.close(() => {
        console.log('Server closed.');
        process.exit(0); // Exit the process successfully
    });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
