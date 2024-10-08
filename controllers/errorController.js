// import logger from '../utils/logger.js'; // Import your Winston logger
// import AppError from './../utils/appError.js';

// const handleCastErrorDB = (err) => {
//     const message = `Invalid ${err.path}: ${err.value}.`;
//     return new AppError(message, 400);
// };

// const handleDuplicateFieldDB = (err) => {
//     const valueMatch = err.message.match(/(["'])(.*?)\1/);
//     const value = valueMatch ? valueMatch[0] : "";
//     const message = `Duplicate field value ${value}, please use another value.`;
//     return new AppError(message, 400);
// };

// const handleValidationErrorDB = (err) => {
//     const errors = Object.values(err.errors).map((el) => el.message);
//     const message = `Invalid input data: ${errors.join(". ")}`;
//     return new AppError(message, 400);
// };

// const handleJWTError = () =>
//     new AppError("Invalid Token! Please log in again.", 401);

// const handleJWTExpiredError = () =>
//     new AppError("Your Token has expired! Please log in again.", 401);

// const sendErrorDev = (err, res) => {
//     // Log the error
//     logger.error(err.stack);

//     res.status(err.statusCode).json({
//         status: err.status,
//         error: err,
//         message: err.message,
//         stack: err.stack,
//     });
// };

// const sendErrorProd = (err, res) => {
//     // Log the error
//     logger.error(err.message);

//     if (err.isOperational) {
//         res.status(err.statusCode).json({
//             status: err.status,
//             message: err.message,
//         });
//     } else {
//         res.status(500).json({
//             status: "error",
//             message: "Something went very wrong!",
//         });
//     }
// };

// export default (err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || "error";

//     if (process.env.NODE_ENV === "development") {
//         sendErrorDev(err, res);
//     } else if (process.env.NODE_ENV === "production") {
//         let error;

//         if (err.name === "CastError") {
//             error = handleCastErrorDB(err);
//         }
//         if (err.code === 11000) {
//             error = handleDuplicateFieldDB(err);
//         }
//         if (err.name === "ValidationError") {
//             error = handleValidationErrorDB(err);
//         }
//         if (err.name === "JsonWebTokenError") error = handleJWTError();
//         if (err.name === "TokenExpiredError") error = handleJWTExpiredError();

//         if (error) {
//             sendErrorProd(error, res);
//         } else {
//             sendErrorProd(err, res);
//         }
//     }
// };



import logger from '../utils/logger.js'; // Import your Winston logger
import AppError from './../utils/appError.js';

// Handle specific error types
const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldDB = (err) => {
    const valueMatch = err.message.match(/(["'])(.*?)\1/);
    const value = valueMatch ? valueMatch[0] : "";
    const message = `Duplicate field value ${value}, please use another value.`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data: ${errors.join(". ")}`;
    return new AppError(message, 400);
};

const handleJWTError = () =>
    new AppError("Invalid Token! Please log in again.", 401);

const handleJWTExpiredError = () =>
    new AppError("Your Token has expired! Please log in again.", 401);

// Send error responses based on the environment
const sendErrorDev = (err, res) => {
    // Log the error stack
    logger.error(err.stack);
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, res) => {
    // Log the error message
    logger.error(err.message);

    if (err.isOperational) {
        // Operational errors are sent to the client
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        // Programming or unknown errors
        res.status(500).json({
            status: "error",
            message: "Something went very wrong!",
        });
    }
};

// Main error handling middleware
export default (err, req, res, next) => {
    err.statusCode = err.statusCode || 500; // Default to 500 if not set
    err.status = err.status || "error"; // Default to "error" if not set

    // Different error handling for development vs production
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        let error;

        // Check for specific error types
        if (err.name === "CastError") {
            error = handleCastErrorDB(err);
        } else if (err.code === 11000) {
            error = handleDuplicateFieldDB(err);
        } else if (err.name === "ValidationError") {
            error = handleValidationErrorDB(err);
        } else if (err.name === "JsonWebTokenError") {
            error = handleJWTError();
        } else if (err.name === "TokenExpiredError") {
            error = handleJWTExpiredError();
        } else {
            error = err; // If no specific error was caught, use the original error
        }

        // Send the appropriate error response
        sendErrorProd(error, res);
    }
};
