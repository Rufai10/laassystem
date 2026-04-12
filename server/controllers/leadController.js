const { prisma } = require('../config/db');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res) => {
  const leads = await prisma.lead.findMany({
    include: {
      assignedTo: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });
  res.json(leads);
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
const getLeadById = async (req, res) => {
  const lead = await prisma.lead.findUnique({
    where: { id: req.params.id },
    include: {
      assignedTo: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  if (lead) {
    res.json(lead);
  } else {
    res.status(404);
    throw new Error('Lead not found');
  }
};

// @desc    Create a lead
// @route   POST /api/leads
// @access  Private
const createLead = async (req, res) => {
  const { name, email, phone, company, status, source, value, notes } = req.body;

  const lead = await prisma.lead.create({
    data: {
      name,
      email,
      phone,
      company,
      status,
      source,
      value: parseFloat(value) || 0,
      notes,
      assignedToId: req.user.id,
    },
  });

  res.status(201).json(lead);
};

// @desc    Update a lead
// @route   PUT /api/leads/:id
// @access  Private
const updateLead = async (req, res) => {
  const { name, email, phone, company, status, source, value, notes } = req.body;

  try {
    const updatedLead = await prisma.lead.update({
      where: { id: req.params.id },
      data: {
        name,
        email,
        phone,
        company,
        status,
        source,
        value: value ? parseFloat(value) : undefined,
        notes,
      },
    });
    res.json(updatedLead);
  } catch (error) {
    res.status(404);
    throw new Error('Lead not found');
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private/Admin
const deleteLead = async (req, res) => {
  try {
    await prisma.lead.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Lead removed' });
  } catch (error) {
    res.status(404);
    throw new Error('Lead not found');
  }
};

module.exports = {
  getLeads,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};
