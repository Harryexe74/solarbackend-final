// // class AppError extends Error {
// // 	constructor(message, statusCode) {
// // 		super(message);

// // 		this.statusCode = statusCode;
// // 		this.status = `${this.statusCode}`.startsWith(4) ? "fail" : "error";
// // 		this.isOperational = true;

// // 		Error.captureStackTrace(this, this.constructor); // this line used for older verison of node js (v < 12)
// // 		// above version 12 the node js automatic add this line of code (captureStackTrace).
// // 	}
// // }
// // export default AppError;
// class AppError extends Error {
// 	constructor(message, statusCode) {
// 	  super(message);
	  
// 	  this.statusCode = statusCode;
// 	  this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
// 	  this.isOperational = true;
  
// 	  Error.captureStackTrace(this, this.constructor);
// 	}
//   }
  
//   export default AppError;
  
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = this.getStatus(); // Determine status based on statusCode
        this.isOperational = true; // Indicates this is an operational error

        // Capture stack trace for easier debugging
        Error.captureStackTrace(this, this.constructor);
    }

    getStatus() {
        return `${this.statusCode}`.startsWith('4') ? 'fail' : 'error';
    }
}

export default AppError;
