// import express from "express";
// import {
// 	createCustomer,
// 	deleteCustomer,
// 	getCustomer,
// 	getCustomers,
// 	updateCustomer,
// } from "./../controllers/customerController.js";
// import {
// 	logout,
// 	loginCustomer,
// 	signupCustomer,
// } from "../controllers/authController.js";
// import { protect, restrictTo } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/login", loginCustomer);
// router.post("/register", signupCustomer);
// router.post("/logout", protect, logout);

// router
// 	.route("/")
// 	// .post(protect, restrictTo("admin"), createCustomer)
// 	// .get(protect, restrictTo("admin", "vendor"), getCustomers);
// 	.post(createCustomer)
// 	.get(getCustomers);

// router
// 	.route("/:id")
// 	.get(protect, getCustomer)
// 	.put(protect, restrictTo("admin", "customer"), updateCustomer)
// 	.delete(protect, restrictTo("admin", "customer"), deleteCustomer);

// export default router;


import express from "express";
import {
    createCustomer,
    deleteCustomer,
    getCustomer,
    getCustomers,
    updateCustomer,
} from "./../controllers/customerController.js";
import {
    logout,
    loginCustomer,
    signupCustomer,
} from "../controllers/authController.js";
import { protect, restrictTo } from "../middleware/authMiddleware.js";

const router = express.Router();

// Auth routes
router.post("/login", loginCustomer);
router.post("/register", signupCustomer);
router.post("/logout", protect, logout);

// Customer routes
router.route("/")
    .post(protect, restrictTo("admin"), async (req, res) => {
        try {
            const customer = await createCustomer(req.body);
            res.status(201).json({ message: "Customer created successfully!", customer });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
    .get(protect, restrictTo("admin", "vendor"), async (req, res) => {
        try {
            const customers = await getCustomers();
            res.status(200).json(customers);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    });

router.route("/:id")
    .get(protect, async (req, res) => {
        try {
            const customer = await getCustomer(req.params.id);
            res.status(200).json(customer);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    })
    .put(protect, restrictTo("admin", "customer"), async (req, res) => {
        try {
            const customer = await updateCustomer(req.params.id, req.body);
            res.status(200).json({ message: "Customer updated successfully!", customer });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    })
    .delete(protect, restrictTo("admin", "customer"), async (req, res) => {
        try {
            await deleteCustomer(req.params.id);
            res.status(204).json({ message: "Customer deleted successfully!" });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    });

export default router;
