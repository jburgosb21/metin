const express = require('express');
const { prisma, calculateRequiredExp } = require('../utils/auth');
const router = express.Router();

// Get current user stats
router.get('/me', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        username: true,
        level: true,
        hp: true,
        exp: true,
        gold: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Calculate required exp for next level
    const requiredExp = calculateRequiredExp(user.level);

    res.json({
      ...user,
      requiredExp,
      expPercentage: Math.min((user.exp / requiredExp) * 100, 100)
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

// Update user stats (for admin or debug)
router.patch('/stats', async (req, res) => {
  try {
    const { level, hp, exp, gold } = req.body;

    const updateData = {};
    if (level !== undefined) updateData.level = level;
    if (hp !== undefined) updateData.hp = hp;
    if (exp !== undefined) updateData.exp = exp;
    if (gold !== undefined) updateData.gold = gold;

    const user = await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
      select: {
        id: true,
        level: true,
        hp: true,
        exp: true,
        gold: true
      }
    });

    res.json(user);
  } catch (error) {
    console.error('Update stats error:', error);
    res.status(500).json({ error: 'Failed to update stats' });
  }
});

module.exports = router;