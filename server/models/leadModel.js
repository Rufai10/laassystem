const mongoose = require('mongoose');

const leadSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    company: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      enum: ['New', 'Contacting', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'],
      default: 'New',
    },
    source: {
      type: String,
      default: 'Website',
    },
    value: {
      type: Number,
      default: 0,
    },
    notes: {
      type: String,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
