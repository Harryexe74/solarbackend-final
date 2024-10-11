import express from 'express';
import multer from 'multer';
import {
    createOrder,
    getOrder,
    getAllOrders,
    updateOrderStatus,
    deleteOrder
} from '../controllers/orderControllers.js';

const router = express.Router();

// Configure Multer for file uploads (transaction proof)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/transactionProofs/'); // Directory for storing the transaction proofs
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

// Multer upload configuration (only accept image files)
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Route to create a new order with transaction proof upload
// router.post('/', upload.single('transactionProof'), createOrder);
router.post('/', createOrder);

// Route to get all orders
router.get('/', getAllOrders);

// Route to get a specific order by ID
router.get('/:id', getOrder);

// Route to update order status by ID
router.put('/:id/status', updateOrderStatus);

// Route to delete an order by ID
router.delete('/:id', deleteOrder);

export default router;
