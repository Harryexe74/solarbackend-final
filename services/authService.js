// import jwt from "jsonwebtoken";
// import config from "../config/index.js";

// function generateAccessToken(userId, role) {
// 	return jwt.sign({ userId, role }, config.jwtSecret, {
// 		expiresIn: config.jwtAccessTime,
// 	});
// }

// export async function loginService(user) {
// 	const accessToken = generateAccessToken(user._id, user.role);

// 	return { accessToken };
// }


import jwt from 'jsonwebtoken';
import config from '../config/index.js';

// Function to generate access token
function generateAccessToken(userId, role) {
    return jwt.sign({ userId, role }, config.jwtSecret, {
        expiresIn: config.jwtAccessTime,
    });
}

// Login service function
export async function loginService(user) {
    try {
        // Ensure user object has the necessary properties
        if (!user || !user._id || !user.role) {
            throw new Error('User data is incomplete.');
        }

        // Generate the access token
        const accessToken = generateAccessToken(user._id, user.role);

        // Return the access token
        return { accessToken };
    } catch (error) {
        console.error('Error generating access token:', error.message);
        throw new Error('Could not log in. Please try again.'); // Provide a generic error message to avoid revealing sensitive info
    }
}
