const express = require('express');
const { prisma, calculateReward, calculateRequiredExp } = require('../utils/auth');
const router = express.Router();

// Helper function to transform task for API response
const transformTask = (task) => ({
  ...task,
  type: task.type.toUpperCase(),
  // difficulty is already uppercase in DB
});

// Get all tasks for the authenticated user
router.get('/', async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks.map(transformTask));
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get tasks by type
router.get('/type/:type', async (req, res) => {
  try {
    const { type } = req.params;
    const normalizedType = type.toLowerCase();
    if (!['habit', 'daily', 'todo'].includes(normalizedType)) {
      return res.status(400).json({ error: 'Invalid task type' });
    }

    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.id,
        type: normalizedType
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tasks.map(transformTask));
  } catch (error) {
    console.error('Get tasks by type error:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, type, difficulty } = req.body;

    if (!title || !type || !difficulty) {
      return res.status(400).json({ error: 'Title, type, and difficulty are required' });
    }

    const task = await prisma.task.create({
      data: {
        title,
        type: type.toLowerCase(),
        difficulty: difficulty.toUpperCase(),
        userId: req.user.id
      }
    });

    res.status(201).json(transformTask(task));
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, difficulty, completed } = req.body;

    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: {
        title: title !== undefined ? title : task.title,
        type: type !== undefined ? type.toLowerCase() : task.type,
        difficulty: difficulty !== undefined ? difficulty.toUpperCase() : task.difficulty,
        completed: completed !== undefined ? completed : task.completed
      }
    });

    res.json(transformTask(updatedTask));
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Complete a task (Metin game logic)
router.patch('/:id/complete', async (req, res) => {
  try {
    const { id } = req.params;

    // Find task
    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found' });
    }

    if (task.completed) {
      return res.status(400).json({ error: 'Task already completed' });
    }

    // Calculate reward based on difficulty
    const reward = calculateReward(task.difficulty);

    // Get current user stats
    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    let newExp = user.exp + reward.exp;
    let newGold = user.gold + reward.gold;
    let newLevel = user.level;
    let newHp = user.hp;

    // Level up logic
    let requiredExp = calculateRequiredExp(newLevel);
    while (newExp >= requiredExp) {
      newExp -= requiredExp;
      newLevel++;
      newHp = 100; // Restore HP on level up
      requiredExp = calculateRequiredExp(newLevel);
    }

    // Update task and user in a transaction
    const [updatedTask, updatedUser] = await prisma.$transaction([
      prisma.task.update({
        where: { id },
        data: { completed: true }
      }),
      prisma.user.update({
        where: { id: req.user.id },
        data: {
          exp: newExp,
          gold: newGold,
          level: newLevel,
          hp: newHp
        }
      })
    ]);

    res.json({
      task: transformTask(updatedTask),
      user: {
        id: updatedUser.id,
        level: updatedUser.level,
        exp: updatedUser.exp,
        gold: updatedUser.gold,
        hp: updatedUser.hp
      },
      reward
    });
  } catch (error) {
    console.error('Complete task error:', error);
    res.status(500).json({ error: 'Failed to complete task' });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const task = await prisma.task.findUnique({
      where: { id }
    });

    if (!task || task.userId !== req.user.id) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await prisma.task.delete({
      where: { id }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;