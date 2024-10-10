// import express from 'express';
// import multer from 'multer';
// import {
//     createOrder,
//     getOrder,
//     getAllOrders,
//     updateOrderStatus,
//     deleteOrder
// } from '../controllers/orderControllers.js';

// const router = express.Router();

// // Configure Multer for file uploads (transaction proof)
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/transactionProofs/'); // Directory for storing the transaction proofs
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
//     }
// });

// // Multer upload configuration (only accept image files)
// const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//         if (file.mimetype.startsWith('image/')) {
//             cb(null, true);
//         } else {
//             cb(new Error('Only image files are allowed!'), false);
//         }
//     }
// });

// // Route to create a new order with transaction proof upload
// // router.post('/', upload.single('transactionProof'), createOrder);
// router.post('/', createOrder);

// // Route to get all orders
// router.get('/', getAllOrders);

// // Route to get a specific order by ID
// router.get('/:id', getOrder);

// // Route to update order status by ID
// router.put('/:id/status', updateOrderStatus);

// // Route to delete an order by ID
// router.delete('/:id', deleteOrder);

// export default router;


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
            cb(null, true); // Accept the file
        } else {
            cb(new Error('Only image files are allowed!'), false); // Reject the file
        }
    }
});

// Route to create a new order with transaction proof upload
router.post('/', upload.single('transactionProof'), async (req, res) => {
    try {
        const orderData = {
            ...req.body,
            transactionProof: req.file.path // Assuming the path to the file needs to be stored
        };
        const order = await createOrder(orderData);
        res.status(201).json({ message: 'Order created successfully!', order });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to get a specific order by ID
router.get('/:id', async (req, res) => {
    try {
        const order = await getOrder(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found!' });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to update order status by ID
router.put('/:id/status', async (req, res) => {
    try {
        const updatedOrder = await updateOrderStatus(req.params.id, req.body);
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found!' });
        }
        res.status(200).json({ message: 'Order status updated successfully!', updatedOrder });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Route to delete an order by ID
router.delete('/:id', async (req, res) => {
    try {
        await deleteOrder(req.params.id);
        res.status(204).json({ message: 'Order deleted successfully!' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;
