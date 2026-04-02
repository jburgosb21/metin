const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

async function comparePassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
}

function calculateRequiredExp(level) {
  return Math.pow(level, 2) * 50;
}

function calculateReward(difficulty) {
  const rewards = {
    ONE: { exp: 10, gold: 5 },
    TWO: { exp: 25, gold: 15 },
    THREE: { exp: 50, gold: 30 },
    FOUR: { exp: 100, gold: 60 }
  };
  return rewards[difficulty] || rewards.ONE;
}

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  calculateRequiredExp,
  calculateReward,
  prisma
};