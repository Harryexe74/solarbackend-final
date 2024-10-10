
// // import express from "express";
// // import multer from "multer";
// // import path from "path";
// // import {
// //     createCategory,
// //     getCategories,
// //     getCategoryById,
// //     updateCategory,
// //     deleteCategory,
// // 	getCategoryBySlug
// // } from "../controllers/categoryController.js";

// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, "uploads/");
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, `${Date.now()}_${file.originalname}`);
// //     }
// // });

// // const upload = multer({
// //     storage: storage,
// //     limits: { fileSize: 1000000 }, 
// //     fileFilter: (req, file, cb) => {
// //         checkFileType(file, cb);
// //     }
// // });

// // const checkFileType = (file, cb) => {
// //     const filetypes = /jpeg|jpg|png/;
// //     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
// //     const mimetype = filetypes.test(file.mimetype);

// //     if (extname && mimetype) {
// //         return cb(null, true);
// //     } else {
// //         cb("Error: Images Only!");
// //     }
// // };

// // const router = express.Router();

// // router.route("/")
// //     .post(upload.single("logo"), createCategory)
// //     .get(getCategories);

// // router.route("/:id")
// //     .get(getCategoryById)
// //     .put(upload.single("logo"), updateCategory)
// //     .delete(deleteCategory);

// // router.route("/slug/:slug")
// //     .get(getCategoryBySlug);

// // export default router;



// import express from "express";
// import multer from "multer";
// import path from "path";
// import {
//     createCategory,
//     getCategories,
//     getCategoryById,
//     updateCategory,
//     deleteCategory,
//     getCategoryBySlug
// } from "../controllers/categoryController.js";

// // Set up storage options for multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         // Use current timestamp and original filename for uniqueness
//         cb(null, `${Date.now()}_${file.originalname}`);
//     }
// });

// // Initialize multer with storage options and limits
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }, // Limit file size to 1MB
//     fileFilter: (req, file, cb) => {
//         checkFileType(file, cb);
//     }
// });

// // Check the file type for uploads
// const checkFileType = (file, cb) => {
//     const filetypes = /jpeg|jpg|png/; // Acceptable file types
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);

//     if (extname && mimetype) {
//         return cb(null, true); // Accept file
//     } else {
//         cb("Error: Only images are allowed!"); // Reject file
//     }
// };

// const router = express.Router();

// // Define routes for categories
// router.route("/")
//     .post(upload.single("logo"), createCategory) // Create category
//     .get(getCategories); // Get all categories

// router.route("/:id")
//     .get(getCategoryById) // Get category by ID
//     .put(upload.single("logo"), updateCategory) // Update category by ID
//     .delete(deleteCategory); // Delete category by ID

// router.route("/slug/:slug")
//     .get(getCategoryBySlug); // Get category by slug

// export default router;


import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getCategoryBySlug
} from "../controllers/categoryController.js";

// Create uploads directory if it doesn't exist
const ensureUploadsDirectory = (req, res, next) => {
    const dir = "uploads/";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    next();
};

// Set up storage options for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // Use current timestamp and original filename for uniqueness
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

// Initialize multer with storage options and limits
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

// Check the file type for uploads
const checkFileType = (file, cb) => {
    const filetypes = /jpeg|jpg|png/; // Acceptable file types
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true); // Accept file
    } else {
        return cb(new Error("Error: Only images are allowed!")); // Reject file
    }
};

const router = express.Router();

// Middleware to ensure the uploads directory exists
router.use(ensureUploadsDirectory);

// Define routes for categories
router.route("/")
    .post(upload.single("logo"), async (req, res) => {
        try {
            const category = await createCategory(req, res); // Create category
            res.status(201).json(category); // Respond with the created category
        } catch (error) {
            res.status(400).json({ message: error.message }); // Respond with error message
        }
    })
    .get(getCategories); // Get all categories

router.route("/:id")
    .get(getCategoryById) // Get category by ID
    .put(upload.single("logo"), async (req, res) => {
        try {
            const category = await updateCategory(req, res); // Update category by ID
            res.status(200).json(category); // Respond with the updated category
        } catch (error) {
            res.status(400).json({ message: error.message }); // Respond with error message
        }
    })
    .delete(deleteCategory); // Delete category by ID

router.route("/slug/:slug")
    .get(getCategoryBySlug); // Get category by slug

export default router;
