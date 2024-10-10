// import Category from "../models/categoryModel.js";
// import { sendErrorResponse, sendSuccessResponse } from "../utils/responseHandler.js";
// import fs from "fs";
// import path from "path";
// import slugify from "slugify";

// // Create a new category
// export const createCategory = async (req, res) => {
//     try {
//         const { name} = req.body;
//         const logo = req.file ? req.file.filename : null;
//         const slug = slugify(name, { lower: true });

//         const category = new Category({ name, logo, slug });
//         await category.save();
//         console.log(category)
//         sendSuccessResponse(res, category, "Category created successfully", 201);
//     } catch (error) {
//         sendErrorResponse(res, error.message);
//     }
// };

// // Get all categories with optional search functionality
// export const getCategories = async (req, res) => {
//     try {
//         const { search } = req.query; 
//         const query = search ? { name: { $regex: search, $options: 'i' } } : {};

//         const categories = await Category.find(query);

//         sendSuccessResponse(res, categories, "Categories fetched successfully");
//     } catch (error) {
//         sendErrorResponse(res, error.message);
//     }
// };

// // Get a single category by ID
// export const getCategoryById = async (req, res) => {
//     try {
//         const categoryId = req.params.id;
//         const category = await Category.findById(categoryId);
        
//         if (!category) {
//             return sendErrorResponse(res, "Category not found", 404);
//         }

//         sendSuccessResponse(res, category, "Category fetched successfully");
//     } catch (error) {
//         sendErrorResponse(res, error.message);
//     }
// };

// // Update a category by ID
// export const updateCategory = async (req, res) => {
//     try {
//         const { name } = req.body;
//         const logo = req.file ? req.file.filename : req.body.logo;
//         const slug = slugify(name, { lower: true });

//         const category = await Category.findByIdAndUpdate(req.params.id, { name, logo, slug }, {
//             new: true,
//             runValidators: true,
//         });

//         if (!category) {
//             return sendErrorResponse(res, "Category not found", 404);
//         }

//         sendSuccessResponse(res, category, "Category updated successfully");
//     } catch (error) {
//         sendErrorResponse(res, error.message);
//     }
// };

// // Delete a category by ID
// export const deleteCategory = async (req, res) => {
//     try {
//         const category = await Category.findByIdAndDelete(req.params.id);
//         if (!category) {
//             return sendErrorResponse(res, "Category not found", 404);
//         }

//         if (category.logo) {
//             fs.unlinkSync(path.join("uploads", category.logo));
//         }

//         sendSuccessResponse(res, category, "Category deleted successfully");
//     } catch (error) {
//         sendErrorResponse(res, error.message);
//     }
// };

// // Get category by slug
// export const getCategoryBySlug = async (req, res) => {
//     try {
//         const slug = req.params.slug;
//         const category = await Category.findOne({ slug });

//         if (!category) {
//             return sendErrorResponse(res, "Category not found", 404);
//         }

//         sendSuccessResponse(res, category, "Category fetched successfully");
//     } catch (error) {
//         sendErrorResponse(res, error.message);
//     }
// };


import Category from "../models/categoryModel.js";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseHandler.js";
import fs from "fs";
import path from "path";
import slugify from "slugify";
import cloudinary from "cloudinary";

// Ensure Cloudinary is configured
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a category
export const createCategory = async (req, res) => {
    try {
        const { name } = req.body;

        // Upload logo to Cloudinary if file exists
        let logo;
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            logo = result.secure_url; // Save the secure URL returned by Cloudinary
        }

        const slug = slugify(name, { lower: true });
        const category = new Category({ name, logo, slug });
        await category.save();

        sendSuccessResponse(res, category, "Category created successfully", 201);
    } catch (error) {
        console.error("Error creating category:", error);
        sendErrorResponse(res, error.message || "Something went very wrong!", 500);
    }
};

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find(); // Retrieve all categories
        sendSuccessResponse(res, categories, "Categories fetched successfully");
    } catch (error) {
        console.error("Error fetching categories:", error);
        sendErrorResponse(res, error.message || "Error fetching categories", 500);
    }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);

        if (!category) {
            return sendErrorResponse(res, "Category not found", 404);
        }

        sendSuccessResponse(res, category, "Category fetched successfully");
    } catch (error) {
        console.error("Error fetching category by ID:", error);
        sendErrorResponse(res, error.message || "Error fetching category", 500);
    }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const slug = slugify(name, { lower: true });

        // Handle logo update if a new file is uploaded
        let logo;
        if (req.file) {
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            logo = result.secure_url; // New logo URL from Cloudinary
        } else {
            logo = req.body.logo; // Keep old logo if no new file is uploaded
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { name, logo, slug },
            { new: true, runValidators: true }
        );

        if (!updatedCategory) {
            return sendErrorResponse(res, "Category not found", 404);
        }

        sendSuccessResponse(res, updatedCategory, "Category updated successfully");
    } catch (error) {
        console.error("Error updating category:", error);
        sendErrorResponse(res, error.message || "Error updating category", 500);
    }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);

        if (!category) {
            return sendErrorResponse(res, "Category not found", 404);
        }

        // If the category has an associated logo, delete it from Cloudinary
        if (category.logo) {
            const publicId = category.logo.split('/').pop().split('.')[0]; // Extract public ID from URL
            await cloudinary.v2.uploader.destroy(publicId); // Delete from Cloudinary
        }

        sendSuccessResponse(res, category, "Category deleted successfully");
    } catch (error) {
        console.error("Error deleting category:", error);
        sendErrorResponse(res, error.message || "Error deleting category", 500);
    }
};

// Get category by slug
export const getCategoryBySlug = async (req, res) => {
    try {
        const slug = req.params.slug;
        const category = await Category.findOne({ slug });

        if (!category) {
            return sendErrorResponse(res, "Category not found", 404);
        }

        sendSuccessResponse(res, category, "Category fetched successfully");
    } catch (error) {
        console.error("Error fetching category by slug:", error);
        sendErrorResponse(res, error.message || "Error fetching category", 500);
    }
};
