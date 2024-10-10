// import winston from 'winston';

// const { combine, timestamp, printf, errors } = winston.format;

// // Define a custom format for log messages
// const logFormat = printf(({ level, message, timestamp, stack }) => {
//     return stack
//         ? `${timestamp} [${level}]: ${message}\n${stack}`
//         : `${timestamp} [${level}]: ${message}`;
// });

// const logger = winston.createLogger({
//     level: 'info',
//     format: combine(
//         timestamp(),
//         errors({ stack: true }),
//         logFormat
//     ),
//     transports: [
//         new winston.transports.Console(), // Output to console
//         new winston.transports.File({ filename: 'error.log', level: 'error' }), // Save error logs to file
//         new winston.transports.File({ filename: 'combined.log' }) // Save all logs to file
//     ]
// });

// export default logger;

import winston from 'winston';

const { combine, timestamp, printf, errors } = winston.format;

// Define a custom format for log messages
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return stack
        ? `${timestamp} [${level}]: ${message}\n${stack}`
        : `${timestamp} [${level}]: ${message}`;
});

// Determine log level based on the environment
const logLevel = process.env.NODE_ENV === 'production' ? 'error' : 'info';

const logger = winston.createLogger({
    level: logLevel, // Set log level based on environment
    format: combine(
        timestamp(),
        errors({ stack: true }),
        logFormat
    ),
    transports: [
        new winston.transports.Console({
            format: combine(
                winston.format.colorize(), // Add color to console logs
                logFormat
            ),
        }), // Output to console
        new winston.transports.File({ 
            filename: 'error.log', 
            level: 'error', 
            format: logFormat // Custom format for file logging
        }), // Save error logs to file
        new winston.transports.File({ 
            filename: 'combined.log', 
            format: logFormat // Custom format for file logging
        }) // Save all logs to file
    ]
});

// Handle unhandled exceptions and rejections
logger.exceptions.handle(
    new winston.transports.File({ filename: 'exceptions.log' })
);
logger.rejections.handle(
    new winston.transports.File({ filename: 'rejections.log' })
);

export default logger;
