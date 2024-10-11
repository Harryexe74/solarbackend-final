// // import express from "express";
// // import cookieParser from "cookie-parser";
// // import cors from "cors";
// // import morgan from "morgan";
// // import globalErrorHandler from "./controllers/errorController.js";
// // import { fileURLToPath } from 'url';
// // import path, { dirname } from 'path';

// // // ROUTES

// // import userRoutes from "./routes/userRoutes.js";
// // import customerRoutes from "./routes/customerRoutes.js";

// // import categoryRoutes from "./routes/categoryRoutes.js";
// // import productRoutes from "./routes/productRoutes.js";
// // import oderRoutes from "./routes/orderRoutes.js";
// // import subscriber from "./routes/subscriberRoutes.js";
// // import { sendErrorResponse } from "./utils/responseHandler.js";
// // const __filename = fileURLToPath(import.meta.url);
// // const __dirname = dirname(__filename);


// // const app = express();

// // // app.use(cors({
// // //   origin: ['http://localhost:5173','http://localhost:5174','https://solarbackend-final.vercel.app'],
// // //   credentials: true,
// // // }));


// // // CORS options
// // app.use(cors({
// //   origin: ['http://localhost:5173', 'http://localhost:5174', 'https://solarbackend-final.vercel.app', 'https://solar-admin-frontend-amber.vercel.app'],
// //   methods: ['GET', 'POST', 'PUT', 'DELETE'],
// //   credentials: true,
// // }));
// // app.use(express.json());
// // app.use(express.urlencoded({ extended: true }));
// // app.use(cookieParser());

// // // Developing logging
// // if (process.env.NODE_ENV === "development") {
// //   app.use(morgan("dev"));
// // }

// // // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // // API ROUTES
// // app.use("/api/users", userRoutes);
// // app.use("/api/customers", customerRoutes);
// // app.use("/api/categories", categoryRoutes);
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// // app.use("/api/products", productRoutes);
// // app.use("/api/orders", oderRoutes);
// // app.use("/api/subscribers", subscriber );



// // app.use("/", (req, res) => {
// //   res.send("Ships Pharmacy  API is Running");
// // });

// // // Unhandled Routes Handling Middleware
// // app.all("*", (req, res, next) => {
// //   next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
// // });

// // // GLOBAL ERROR HANDLING MIDDLEWARE
// // app.use(globalErrorHandler);

// // export default app;



import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import globalErrorHandler from "./controllers/errorController.js"; // Ensure this exists and is correct
import AppError from "./utils/appError.js"; // Importing AppError for unhandled routes
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

// ROUTES
import userRoutes from "./routes/userRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; // Fixed typo from 'oderRoutes' to 'orderRoutes'
import subscriber from "./routes/subscriberRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// CORS Configuration - Add handling for preflight (OPTIONS) requests
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'https://solarbackend-final.vercel.app', 'https://solar-admin-frontend-amber.vercel.app'], // Allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Allow credentials (cookies, HTTP auth)
};
app.use(cors(corsOptions));

// Handle preflight (OPTIONS) requests globally
app.options('*', cors(corsOptions));

app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser()); // Parse cookies

// Logging for development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Serving static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes); // Use the fixed route name
app.use("/api/subscribers", subscriber);

// Default route to check if the server is running
app.use("/", (req, res) => {
  res.send("Ships Pharmacy API is Running");
});

// Unhandled Routes Handling Middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404)); // Corrected to use AppError
});

// Global Error Handling Middleware
app.use(globalErrorHandler); // Ensure this works correctly

export default app;



