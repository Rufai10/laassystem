const express = require('express');
const router = express.Router();
const {
  getLeads,
  getCustomers,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} = require('../controllers/leadController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/customers', protect, getCustomers);
router.route('/').get(protect, getLeads).post(protect, createLead);
router
  .route('/:id')
  .get(protect, getLeadById)
  .put(protect, updateLead)
  .delete(protect, admin, deleteLead);

module.exports = router;
