const express = require('express');
const router = express.Router();
const {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
} = require('../controllers/leadController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getLeads).post(protect, createLead);
router
  .route('/:id')
  .get(protect, getLeadById)
  .put(protect, updateLead)
  .delete(protect, admin, deleteLead);

module.exports = router;
