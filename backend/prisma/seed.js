const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clean up existing data
  await prisma.task.deleteMany();
  await prisma.user.deleteMany();

  // Create test user
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const user = await prisma.user.create({
    data: {
      email: 'aventurero@metin.com',
      username: 'DragónSlayer',
      password: hashedPassword,
      level: 5,
      hp: 100,
      exp: 1250,
      gold: 500,
    },
  });

  console.log(`✅ Created user: ${user.username} (${user.email})`);

  // Create sample tasks (CORREGIDO: type en minúsculas)
  const tasks = [
    {
      title: 'Ejercicio matutino',
      type: 'habit',
      difficulty: 'TWO',
      userId: user.id,
    },
    {
      title: 'Leer 30 páginas',
      type: 'daily',
      difficulty: 'ONE',
      userId: user.id,
    },
    {
      title: 'Completar proyecto React',
      type: 'todo',
      difficulty: 'FOUR',
      userId: user.id,
    },
    {
      title: 'Meditar 10 minutos',
      type: 'habit',
      difficulty: 'ONE',
      userId: user.id,
    },
    {
      title: 'Aprender nueva habilidad',
      type: 'daily',
      difficulty: 'THREE',
      userId: user.id,
    },
    {
      title: 'Organizar espacio de trabajo',
      type: 'todo',
      difficulty: 'TWO',
      userId: user.id,
      completed: true,
    },
  ];

  for (const taskData of tasks) {
    const task = await prisma.task.create({
      data: taskData,
    });
    console.log(`📝 Created task: ${task.title} (${task.type})`);
  }

  console.log('🎉 Database seed completed!');
  console.log(`👤 Test user credentials:`);
  console.log(`   Email: aventurero@metin.com`);
  console.log(`   Password: password123`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });