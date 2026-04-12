const express = require('express');
const router = express.Router();
const {
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getUsers);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
