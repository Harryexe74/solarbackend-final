
// import Order from '../models/orderModel.js';
// import Product from '../models/ProductModels.js';
// import User from '../models/userModel.js';

// // Create a new order
// export const createOrder = async (req, res) => {
//     try {
//         const { userId, products, totalPrice, shippingAddress, paymentMethod } = req.body;

//         console.log('Received Data:', { userId, products, totalPrice, shippingAddress, paymentMethod });

//         if ( !products || !totalPrice || !shippingAddress || !paymentMethod) {
//             throw new Error('Missing required fields.');
//         }

//         // Check if user exists
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(400).json({ error: 'User not found' });
//         }

//         // Check if a file (transaction proof) is uploaded
//         const transactionProof = req.file ? req.file.path : null;

//         // if (!transactionProof) {
//         //     return res.status(400).json({ message: 'Transaction proof is required.' });
//         // }

//         // Create the order
//         const order = await Order.create({
//             user: userId,
//             products: products.map(p => ({ product: p.productId, quantity: p.quantity })),
//             totalPrice,
//             shippingAddress,
//             paymentMethod,
//             transactionProof, // Store the path of the uploaded transaction proof
//         });

//         res.status(201).json(order);
//     } catch (error) {
//         console.error('Error creating order:', error.message);
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get an order by ID with full product population (including thumbnail, userId, userType)
// export const getOrder = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const order = await Order.findById(id)
//             .populate('user', 'name email phoneNumber')  // Populate user details
//             .populate({
//                 path: 'products.product',
//                 select: 'name price sku thumbnail userId userType category',  // Populate product fields including thumbnail, userId, userType
//                 populate: {
//                     path: 'category',
//                     select: 'name' // Populate category name within product
//                 }
//             })
//             .exec();

//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         res.json(order);
//     } catch (error) {
//         console.error('Error fetching order:', error.message);
//         res.status(500).json({ error: error.message });
//     }
// };

// // Get all orders with full product population (including thumbnail, userId, userType)
// export const getAllOrders = async (req, res) => {
//     try {
//         const orders = await Order.find()
//             .populate('user', 'name email phoneNumber')  // Populate user details
//             .populate({  
//                 path: 'products.product',
//                 select: 'name price sku thumbnail userId userType category',  // Populate product fields including thumbnail, userId, userType
//                 populate: {
//                     path: 'category',
//                     select: 'name'  // Populate category within product
//                 }
//             })
//             .exec();

//         res.json(orders);
//     } catch (error) {
//         console.error('Error fetching all orders:', error.message);
//         res.status(500).json({ error: error.message });
//     }
// };

// // Update order status
// export const updateOrderStatus = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body;

//         const order = await Order.findById(id);

//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         order.status = status;
//         await order.save();

//         res.json({ message: 'Order status updated successfully', order });
//     } catch (error) {
//         console.error('Error updating order status:', error.message);
//         res.status(500).json({ error: error.message });
//     }
// };
// // Delete an order
// export const deleteOrder = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const order = await Order.findByIdAndDelete(id);

//         if (!order) {
//             return res.status(404).json({ error: 'Order not found' });
//         }

//         res.json({ message: 'Order deleted successfully' });
//     } catch (error) {
//         console.error('Error deleting order:', error.message);
//         res.status(500).json({ error: error.message });
//     }
// };


import Order from '../models/orderModel.js';
import Product from '../models/ProductModels.js';
import User from '../models/userModel.js';

// Create a new order
export const createOrder = async (req, res) => {
    try {
        const { userId, products, totalPrice, shippingAddress, paymentMethod } = req.body;

        console.log('Received Data:', { userId, products, totalPrice, shippingAddress, paymentMethod });

        // Validate required fields
        if (!products || !totalPrice || !shippingAddress || !paymentMethod) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Check if a file (transaction proof) is uploaded
        const transactionProof = req.file ? req.file.path : null;

        // Uncomment the following if transaction proof is mandatory
        // if (!transactionProof) {
        //     return res.status(400).json({ message: 'Transaction proof is required.' });
        // }

        // Create the order
        const order = await Order.create({
            user: userId,
            products: products.map(p => ({ product: p.productId, quantity: p.quantity })),
            totalPrice,
            shippingAddress,
            paymentMethod,
            transactionProof, // Store the path of the uploaded transaction proof
        });

        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error.message);
        res.status(500).json({ error: 'Failed to create order. Please try again later.' });
    }
};

// Get an order by ID with full product population (including thumbnail, userId, userType)
export const getOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id)
            .populate('user', 'name email phoneNumber')  // Populate user details
            .populate({  
                path: 'products.product',
                select: 'name price sku thumbnail userId userType category',  // Populate product fields
                populate: {
                    path: 'category',
                    select: 'name' // Populate category name within product
                }
            })
            .exec();

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error fetching order:', error.message);
        res.status(500).json({ error: 'Failed to fetch order. Please try again later.' });
    }
};

// Get all orders with full product population (including thumbnail, userId, userType)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email phoneNumber')  // Populate user details
            .populate({  
                path: 'products.product',
                select: 'name price sku thumbnail userId userType category',  // Populate product fields
                populate: {
                    path: 'category',
                    select: 'name'  // Populate category within product
                }
            })
            .exec();

        res.json(orders);
    } catch (error) {
        console.error('Error fetching all orders:', error.message);
        res.status(500).json({ error: 'Failed to fetch orders. Please try again later.' });
    }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.json({ message: 'Order status updated successfully', order });
    } catch (error) {
        console.error('Error updating order status:', error.message);
        res.status(500).json({ error: 'Failed to update order status. Please try again later.' });
    }
};

// Delete an order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findByIdAndDelete(id);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error.message);
        res.status(500).json({ error: 'Failed to delete order. Please try again later.' });
    }
};
