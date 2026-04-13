const { prisma } = require('../config/db');

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private
const getLeads = async (req, res, next) => {
  try {
    const query = {
      where: {
        type: "LEAD"
      },
      include: {
        assignedTo: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    };

    // RBAC: Sales only see their own leads
    if (req.user.role === 'sales') {
      query.where.assignedToId = req.user.id;
    }

    const leads = await prisma.lead.findMany(query);
    res.json(leads);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all customers
// @route   GET /api/customers
// @access  Private
const getCustomers = async (req, res, next) => {
  try {
    const query = {
      where: {
        type: "CUSTOMER"
      },
      include: {
        assignedTo: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    };

    // RBAC: Sales only see their own customers
    if (req.user.role === 'sales') {
      query.where.assignedToId = req.user.id;
    }

    const customers = await prisma.lead.findMany(query);
    res.json(customers);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single lead
// @route   GET /api/leads/:id
// @access  Private
const getLeadById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

// @desc    Create a lead
// @route   POST /api/leads
// @access  Private
const createLead = async (req, res, next) => {
  try {
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
        assignedToId: req.user ? req.user.id : null,
      },
    });

    res.status(201).json(lead);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a lead
// @route   PUT /api/leads/:id
// @access  Private
const updateLead = async (req, res, next) => {
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
    next(error);
  }
};

// @desc    Delete a lead
// @route   DELETE /api/leads/:id
// @access  Private/Admin
const deleteLead = async (req, res, next) => {
  try {
    await prisma.lead.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Lead removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getLeads,
  getCustomers,
  getLeadById,
  createLead,
  updateLead,
  deleteLead,
};
