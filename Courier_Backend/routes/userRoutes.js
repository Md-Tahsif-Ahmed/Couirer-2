const express = require('express');
const router = express.Router();
const { getUserById, updateUser, getAllUsers, deleteUser, getUserByEmail, updateUserProfile, getUserBalance, payMarchant, getUsersByRole,

 } = require('../controllers/userController');
router.get('/user', getAllUsers);
// GET user by ID
router.get('/user/:id', getUserById);
router.get('/user/email/:email', getUserByEmail);
router.patch('/user/update/:email', updateUserProfile);
// GET user by Role
router.get('/user/roleby/role', getUsersByRole);


// PATCH update user by ID
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);
router.get('/user/bal/:email/balance', getUserBalance);
router.post('/user/paymarchant', payMarchant),

module.exports = router;
