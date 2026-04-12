require('dotenv').config();
const { prisma } = require('./config/db');
const bcrypt = require('bcryptjs');

const importData = async () => {
  try {
    // Delete existing data
    await prisma.lead.deleteMany();
    await prisma.user.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    // Create users
    await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@example.com',
        password,
        role: 'admin',
      },
    });

    const manager = await prisma.user.create({
      data: {
        name: 'Manager',
        email: 'manager@example.com',
        password,
        role: 'manager',
      },
    });

    // Create leads
    await prisma.lead.createMany({
      data: [],
    });


    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await prisma.lead.deleteMany();
    await prisma.user.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
