
// import express from 'express';
// import {
//   registerUser,
//   loginUser,
//   getAllUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
//   updateUserPassword,
//   updateUserRole
// } from '../controllers/userController.js';

// const router = express.Router();

// // POST /users/register - Register a new user
// router.post('/register', registerUser);

// // POST /users/login - User login
// router.post('/login', loginUser);

// // GET /users - Get all users
// router.get('/', getAllUsers);

// // GET /users/:userId - Get user by ID
// router.get('/:userId', getUserById);

// // PUT /users/:userId - Update user details
// router.put('/:userId', updateUser);

// // PUT /users/:userId/password - Update user password
// router.put('/:userId/password', updateUserPassword);
// router.put('/:userId/role', updateUserRole);

// // DELETE /users/:userId - Delete user
// router.delete('/:userId', deleteUser);

// export default router;



import express from 'express';
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateUserPassword,
  updateUserRole,
} from '../controllers/userController.js';

const router = express.Router();

// POST /users/register - Register a new user
router.post('/register', async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
});

// POST /users/login - User login
router.post('/login', async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials', error });
  }
});

// GET /users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error });
  }
});

// GET /users/:userId - Get user by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error });
  }
});

// PUT /users/:userId - Update user details
router.put('/:userId', async (req, res) => {
  try {
    const updatedUser = await updateUser(req.params.userId, req.body);
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
});

// PUT /users/:userId/password - Update user password
router.put('/:userId/password', async (req, res) => {
  try {
    await updateUserPassword(req.params.userId, req.body);
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error updating password', error });
  }
});

// PUT /users/:userId/role - Update user role
router.put('/:userId/role', async (req, res) => {
  try {
    const updatedUser = await updateUserRole(req.params.userId, req.body);
    res.status(200).json({ message: 'User role updated successfully', updatedUser });
  } catch (error) {
    res.status(400).json({ message: 'Error updating user role', error });
  }
});

// DELETE /users/:userId - Delete user
router.delete('/:userId', async (req, res) => {
  try {
    await deleteUser(req.params.userId);
    res.status(204).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

export default router;
