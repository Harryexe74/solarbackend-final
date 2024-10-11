export default (fn) => (req, res, next) => {
	fn(req, res, next).catch(next);
};


// const asyncHandler = (fn) => {
//     if (typeof fn !== 'function') {
//         throw new Error('The argument must be a function');
//     }

//     return (req, res, next) => {
//         Promise.resolve(fn(req, res, next))
//             .catch((err) => {
//                 // Optional: Log the error for debugging
//                 console.error(err);
                
//                 // Pass the error to the next middleware
//                 next(err);
//             });
//     };
// };

// export default asyncHandler;
