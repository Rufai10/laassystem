const { prisma } = require('../config/db');

// @desc    Get all deals
// @route   GET /api/deals
// @access  Private
const getDeals = async (req, res, next) => {
  try {
    const query = {
      include: {
        lead: {
          select: {
            name: true,
            email: true,
          },
        },
        owner: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    };

    // RBAC: Sales only see their own deals
    if (req.user.role === 'sales') {
      query.where = { ownerId: req.user.id };
    }

    const deals = await prisma.deal.findMany(query);
    res.json(deals);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single deal
// @route   GET /api/deals/:id
// @access  Private
const getDealById = async (req, res, next) => {
  try {
    const deal = await prisma.deal.findUnique({
      where: { id: req.params.id },
      include: {
        lead: true,
        owner: true,
      },
    });

    if (deal) {
      res.json(deal);
    } else {
      res.status(404);
      throw new Error('Deal not found');
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Create a deal
// @route   POST /api/deals
// @access  Private
const createDeal = async (req, res, next) => {
  try {
    const { title, amount, status, priority, dueDate, leadId } = req.body;

    const deal = await prisma.deal.create({
      data: {
        title,
        amount: parseFloat(amount) || 0,
        status,
        priority,
        dueDate: dueDate && dueDate !== "" ? new Date(dueDate) : null,
        leadId: leadId && leadId !== "" ? leadId : null,
        ownerId: req.user.id,
      },
    });

    res.status(201).json(deal);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a deal
// @route   PUT /api/deals/:id
// @access  Private
const updateDeal = async (req, res, next) => {
  try {
    const { title, amount, status, priority, dueDate, leadId } = req.body;

    const updatedDeal = await prisma.deal.update({
      where: { id: req.params.id },
      data: {
        title,
        amount: amount ? parseFloat(amount) : undefined,
        status,
        priority,
        dueDate: dueDate && dueDate !== "" ? new Date(dueDate) : dueDate === "" ? null : undefined,
        leadId: leadId && leadId !== "" ? leadId : leadId === "" ? null : undefined,
      },
    });
    res.json(updatedDeal);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a deal
// @route   DELETE /api/deals/:id
// @access  Private/Admin
const deleteDeal = async (req, res, next) => {
  try {
    await prisma.deal.delete({
      where: { id: req.params.id },
    });
    res.json({ message: 'Deal removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDeals,
  getDealById,
  createDeal,
  updateDeal,
  deleteDeal,
};
