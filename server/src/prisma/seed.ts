import bcrypt from "bcrypt";

import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

const seedAdmin = async () => {
  const hashedPassword = await bcrypt.hash("admin123", 10);

  const existingAdmin = await prisma.user.findUnique({
    where: {
      email: "admin@microfinance.com",
    },
  });

  if (existingAdmin) {
    console.log("Admin already exists");

    return;
  }

  await prisma.user.create({
    data: {
      firstName: "System",

      lastName: "Administrator",

      email: "admin@microfinance.com",

      phone: "255700000000",

      password: hashedPassword,

      role: UserRole.SUPER_ADMIN,
    },
  });

  console.log("Admin user seeded successfully");
};

seedAdmin()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
