import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

// Create a singleton Prisma client
const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Direct database operations
export const dbOperations = {
  // User operations
  async findUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email }
    });
  },
  
  async createUser(email: string, password: string, name: string) {
    const hashedPassword = await bcrypt.hash(password, 12);
    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    });
  },
  
  async verifyPassword(plainPassword: string, hashedPassword: string) {
    return bcrypt.compare(plainPassword, hashedPassword);
  },
  
  // Ensure admin exists
  async ensureAdminExists() {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'M. Ikhsan Pasaribu';
    
    if (!adminEmail || !adminPassword) {
      throw new Error('Admin credentials not found in environment variables');
    }
    
    // Check if admin exists
    const existingAdmin = await this.findUserByEmail(adminEmail);
    if (existingAdmin) {
      return existingAdmin;
    }
    
    // Create admin if not exists
    return this.createUser(adminEmail, adminPassword, adminName);
  }
};