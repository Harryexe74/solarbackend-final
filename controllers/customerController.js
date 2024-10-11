import Customer from "../models/customerModel.js";
import {
	createOne,
	deleteOne,
	getAll,
	getOne,
	updateOne,
} from "./handleFactory.js";

export const createCustomer = createOne(Customer);
export const getCustomers = getAll(Customer);
export const getCustomer = getOne(Customer);
export const deleteCustomer = deleteOne(Customer);
export const updateCustomer = updateOne(Customer);


// import Customer from "../models/customerModel.js";
// import {
//     createOne,
//     deleteOne,
//     getAll,
//     getOne,
//     updateOne,
// } from "./handleFactory.js";
// import { sendErrorResponse, sendSuccessResponse } from "../utils/responseHandler.js";

// // Create a customer
// export const createCustomer = async (req, res) => {
//     try {
//         const customer = await createOne(Customer)(req, res);
//         sendSuccessResponse(res, customer, "Customer created successfully", 201);
//     } catch (error) {
//         console.error("Error creating customer:", error);
//         sendErrorResponse(res, error.message || "Failed to create customer", 500);
//     }
// };

// // Get all customers
// export const getCustomers = async (req, res) => {
//     try {
//         const customers = await getAll(Customer)(req, res);
//         sendSuccessResponse(res, customers, "Customers retrieved successfully");
//     } catch (error) {
//         console.error("Error fetching customers:", error);
//         sendErrorResponse(res, error.message || "Failed to fetch customers", 500);
//     }
// };

// // Get a single customer
// export const getCustomer = async (req, res) => {
//     try {
//         const customer = await getOne(Customer)(req, res);
//         sendSuccessResponse(res, customer, "Customer retrieved successfully");
//     } catch (error) {
//         console.error("Error fetching customer:", error);
//         sendErrorResponse(res, error.message || "Failed to fetch customer", 500);
//     }
// };

// // Update a customer
// export const updateCustomer = async (req, res) => {
//     try {
//         const customer = await updateOne(Customer)(req, res);
//         sendSuccessResponse(res, customer, "Customer updated successfully");
//     } catch (error) {
//         console.error("Error updating customer:", error);
//         sendErrorResponse(res, error.message || "Failed to update customer", 500);
//     }
// };

// // Delete a customer
// export const deleteCustomer = async (req, res) => {
//     try {
//         const customer = await deleteOne(Customer)(req, res);
//         sendSuccessResponse(res, customer, "Customer deleted successfully");
//     } catch (error) {
//         console.error("Error deleting customer:", error);
//         sendErrorResponse(res, error.message || "Failed to delete customer", 500);
//     }
// };
