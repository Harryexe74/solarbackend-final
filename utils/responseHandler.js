// import logger from './logger.js';
// // utils/responseHandler.js
// export const sendSuccessResponse = (res, data, message) => {
//     res.status(200).json({
//         success: true,
//         message,
//         docs: data || null  
//     });
// };



// export const sendErrorResponse = (res, error) => {
//     logger.error(error.message || error);
//     res.status(500).json({
//         success: false,
//          message: 'Internal Server Error',
//          error: error.message });
// };


import logger from './logger.js';

// utils/responseHandler.js
export const sendSuccessResponse = (res, data, message = 'Operation successful') => {
    res.status(200).json({
        success: true,
        message,
        docs: data || null
    });
};

export const sendErrorResponse = (res, error, customMessage = 'Internal Server Error') => {
    // Log the error message, stack trace if available
    logger.error(error.message || error);

    // Optionally log the stack trace for debugging purposes
    if (error.stack) {
        logger.error(error.stack);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        message: customMessage,
        error: error.message || 'An unexpected error occurred.'
    });
};
