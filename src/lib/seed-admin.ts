import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedAdmin() {
  try {
    // Cek apakah sudah ada user
    const userCount = await prisma.user.count();
    
    if (userCount === 0) {
      // Gunakan environment variables untuk kredensial
      const adminEmail = process.env.ADMIN_EMAIL;
      const adminPassword = process.env.ADMIN_PASSWORD;
      const adminName = process.env.ADMIN_NAME || 'M. Ikhsan Pasaribu';
      
      if (!adminEmail || !adminPassword) {
        console.error('Admin credentials not found in environment variables');
        return;
      }
      
      // Buat user admin jika belum ada
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      
      await prisma.user.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
          name: adminName
        }
      });
      
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
  } catch (error) {
    console.error('Error seeding admin user:', error);
  } finally {
    await prisma.$disconnect();
  }
}