
// import express from 'express';
// import multer from 'multer';
// import {
//     createProduct,
//     updateProductImages,
//     getAllProducts,
//     getProductById,
//     deleteProduct,
//     addReview,
//     getProductReviews,
//     updateProductStatus,  
//     getTopRatedProducts,
//     deleteReview,
//     updateProduct,
//     updateReviewStatus,   
  
// } from '../controllers/productController.js';

// const router = express.Router();

// // Set up multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const folder = file.fieldname === 'thumbnail' ? 'uploads/thumbnails/' : 'uploads/images/';
//         cb(null, folder);
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// const upload = multer({ storage });

// // // Product routes
// // router.post('/', upload.fields([{ name: 'thumbnail' }, { name: 'images', maxCount: 10 }]), createProduct);


// router.post('/', (req, res, next) => {
//     upload.fields([{ name: 'thumbnail' }, { name: 'images', maxCount: 10 }])(req, res, (err) => {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).json({ message: err.message });
//         } else if (err) {
//             return res.status(500).json({ message: 'File upload error', error: err });
//         }
//         next();
//     });
// }, createProduct);

// // router.post('/', createProduct);
// router.get('/', getAllProducts);

// // Static routes 

// router.get('/top-rated', getTopRatedProducts);
// router.get('/:productId/update-product-image', updateProductImages);
// router.post('/:productId/reviews', addReview);
// router.get('/:productId/reviews', getProductReviews);
// router.put('/:productId/reviews/:reviewId/status', updateReviewStatus);
// router.delete('/:productId/reviews/:reviewId', deleteReview);

// router.put('/:id/status', updateProductStatus);
// router.put('/:id', updateProduct);
// router.get('/:id', getProductById);
// router.delete('/:id', deleteProduct);


// // // router.get('/feature-product', getFeaturedProducts);
// // // router.get('/latest-product', getLatestProducts);
// // router.get('/top-rated', getTopRatedProducts);
// // // router.get('/pending', getAllPendingProducts);
// // // router.get('/approved', getAllApprovedProducts);
// // router.get('/filtered', getFilteredProducts);
// // // router.get('/newest', getNewestProducts);
// // // Dynamic routes
// // // router.get('/vendor/:vendorId/vendor-product', getProductsByVendor);
// // // router.get('/vendor/:vendorId/pending', getPendingProductsByVendor);
// // // router.get('/vendor/:vendorId/denied', getDeniedProductsByVendor);
// // // router.get('/vendor/:vendorId/approved', getApprovedProductsByVendor);
// // // router.get('/vendor/:vendorId/newest', getNewestProductByVendor);
// // router.post('/:productId/reviews', addReview);
// // router.get('/:productId/reviews', getProductReviews);

// // router.put('/:id/status', updateProductStatus);
// // router.put('/:id/feature', updateProductFeaturedStatus);
// // router.put('/:id', updateProduct);
// // router.get('/:id', getProductById);
// // router.delete('/:id', deleteProduct);

// // // Update review status







// export default router;



import express from 'express';
import multer from 'multer';
import {
    createProduct,
    updateProductImages,
    getAllProducts,
    getProductById,
    deleteProduct,
    addReview,
    getProductReviews,
    updateProductStatus,  
    getTopRatedProducts,
    deleteReview,
    updateProduct,
    updateReviewStatus,   
} from '../controllers/productController.js';

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = file.fieldname === 'thumbnail' ? 'uploads/thumbnails/' : 'uploads/images/';
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Product routes
// Create a new product with thumbnail and multiple images upload
router.post('/', (req, res, next) => {
    upload.fields([{ name: 'thumbnail' }, { name: 'images', maxCount: 10 }])(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(500).json({ message: 'File upload error', error: err });
        }
        next();
    });
}, createProduct);

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving products', error });
    }
});

// Get top-rated products
router.get('/top-rated', async (req, res) => {
    try {
        const topRatedProducts = await getTopRatedProducts();
        res.status(200).json(topRatedProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving top-rated products', error });
    }
});

// Product details and update routes
router.get('/:id', async (req, res) => {
    try {
        const product = await getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving product', error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedProduct = await updateProduct(req.params.id, req.body);
        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await deleteProduct(req.params.id);
        res.status(204).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
});

// Update product images route
router.put('/:productId/update-image', updateProductImages);

// Review routes
router.post('/:productId/reviews', addReview);
router.get('/:productId/reviews', getProductReviews);
router.put('/:productId/reviews/:reviewId/status', updateReviewStatus);
router.delete('/:productId/reviews/:reviewId', deleteReview);

// Update product status route
router.put('/:id/status', updateProductStatus);

export default router;

        