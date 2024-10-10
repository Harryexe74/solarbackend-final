// import jwt from "jsonwebtoken";

// import { promisify } from "util";
// import AppError from "./../utils/appError.js";
// import catchAsync from "./../utils/catchAsync.js";
// import User from "../models/userModel.js";

// const models = {
// 	user: User,
// 	admin: User,
	
// };

// export const protect = catchAsync(async (req, res, next) => {
// 	// 1) Getting token and check of it's there
// 	let token;

// 	if (
// 		req.headers.authorization &&
// 		req.headers.authorization.startsWith("Bearer")
// 	) {
// 		token = req.headers.authorization.split(" ")[1];
// 	}

// 	if (!token) {
// 		return next(
// 			new AppError("You are not logged in! Please log in to get access.", 401)
// 		);
// 	}

// 	// 2) Verification token
// 	const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

// 	console.log(decoded);
// 	// 3) Determine the model based on the user role in the token
// 	const userRole = decoded.role; // Assume role is included in the token payload
// 	const Model = models[userRole];
// 	if (!Model) {
// 		return next(new AppError("User role not recognized.", 401));
// 	}

// 	const { userId } = decoded;

// 	// 4) Check if user still exists
// 	const currentUser = await Model.findById(userId);

// 	if (!currentUser) {
// 		return next(
// 			new AppError(
// 				"The token belonging to this user does no longer exist.",
// 				401
// 			)
// 		);
// 	}

// 	// GRANT ACCESS TO PROTECTED ROUTE
// 	req.user = currentUser;

// 	next();
// });

// // restrictTo is a Wrapper function to return the middleware function
// export const restrictTo = (...roles) => {
// 	return (req, res, next) => {
// 		// roles is array: ['admin']

// 		if (!roles.includes(req.user.role)) {
// 			return next(
// 				new AppError("You do not have permission to perform this action.", 403)
// 			); // 403: Forbiden
// 		}

// 		next();
// 	};
// };


import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import AppError from './../utils/appError.js';
import catchAsync from './../utils/catchAsync.js';
import User from '../models/userModel.js';

const models = {
  user: User,
  admin: User,  // Assuming both roles use the User model
  // Add other role-to-model mappings if necessary
};

export const protect = catchAsync(async (req, res, next) => {
  let token;

  // 1) Check if token is provided in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('You are not logged in! Please log in to get access.', 401));
  }

  // 2) Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new AppError('Invalid token. Please log in again.', 401));
  }

  // 3) Determine the model based on the role in the token
  const userRole = decoded.role;  // Assuming 'role' exists in the token payload
  const Model = models[userRole];  // Find the correct model based on role

  if (!Model) {
    return next(new AppError('User role not recognized.', 401));
  }

  // 4) Check if the user still exists
  const currentUser = await Model.findById(decoded.id);  // Use the correct field from the token

  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exists.', 401));
  }

  // 5) Check if the user changed their password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(new AppError('User recently changed password. Please log in again.', 401));
  }

  // Grant access to the protected route
  req.user = currentUser;
  next();
});

// Role-based access control middleware
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if the user role is allowed to access the route
    if (!roles.includes(req.user.role)) {
      return next(new AppError('You do not have permission to perform this action.', 403));
    }

    next();
  };
};
