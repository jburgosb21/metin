import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import TaskColumn from '../components/TaskColumn';

const Dashboard = () => {
  const { api, user, refreshUser } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTaskUpdate = (updatedTask) => {
    setTasks(prevTasks =>
      prevTasks.map(task => task.id === updatedTask.id ? updatedTask : task)
    );
  };

  const handleTaskDelete = (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleNewTask = (newTask) => {
    setTasks(prevTasks => [newTask, ...prevTasks]);
  };

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'completed') return task.completed;
    if (activeFilter === 'pending') return !task.completed;
    return task.type.toUpperCase() === activeFilter;
  });

  const habits = tasks.filter(task => task.type.toUpperCase() === 'HABIT');
  const dailies = tasks.filter(task => task.type.toUpperCase() === 'DAILY');
  const todos = tasks.filter(task => task.type.toUpperCase() === 'TODO');

  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-metin-primary"></div>
          <p className="mt-4 text-gray-400">Cargando tu aventura...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Dashboard Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">🎯 Tu Tablero de Aventuras</h2>
            <p className="text-gray-400">Gestiona tus misiones y monitorea tu progreso</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={refreshUser}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200"
            >
              🔄 Actualizar
            </button>
            <button
              onClick={fetchTasks}
              className="px-4 py-2 bg-metin-primary hover:bg-violet-700 text-white rounded-lg transition-colors duration-200"
            >
              📥 Sincronizar
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="rpg-border bg-metin-card p-4">
            <div className="text-3xl font-bold text-white mb-1">{tasks.length}</div>
            <div className="text-sm text-gray-400">Misiones Totales</div>
          </div>
          <div className="rpg-border bg-metin-card p-4">
            <div className="text-3xl font-bold text-green-400 mb-1">{completedCount}</div>
            <div className="text-sm text-gray-400">Completadas</div>
          </div>
          <div className="rpg-border bg-metin-card p-4">
            <div className="text-3xl font-bold text-yellow-400 mb-1">{pendingCount}</div>
            <div className="text-sm text-gray-400">Pendientes</div>
          </div>
          <div className="rpg-border bg-metin-card p-4">
            <div className="text-3xl font-bold text-metin-gold mb-1">{user?.gold || 0}</div>
            <div className="text-sm text-gray-400">Oro Acumulado</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'all'
                ? 'bg-metin-primary text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'pending'
                ? 'bg-metin-primary text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Pendientes
          </button>
          <button
            onClick={() => setActiveFilter('completed')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'completed'
                ? 'bg-metin-primary text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Completadas
          </button>
          <button
            onClick={() => setActiveFilter('HABIT')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'HABIT'
                ? 'bg-metin-secondary text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Hábitos
          </button>
          <button
            onClick={() => setActiveFilter('DAILY')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'DAILY'
                ? 'bg-metin-primary text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Diarias
          </button>
          <button
            onClick={() => setActiveFilter('TODO')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeFilter === 'TODO'
                ? 'bg-metin-info text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            Pendientes (TODO)
          </button>
        </div>
      </div>

      {/* Task Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TaskColumn
          type="habit"
          title="Hábitos"
          description="Rutinas diarias que construyen tu disciplina"
          tasks={habits}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
        />
        <TaskColumn
          type="daily"
          title="Misiones Diarias"
          description="Tareas recurrentes que renuevan cada día"
          tasks={dailies}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
        />
        <TaskColumn
          type="todo"
          title="Pendientes"
          description="Tareas únicas que completar una vez"
          tasks={todos}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
        />
      </div>

      {/* Game Mechanics Info */}
      <div className="mt-8 rpg-border bg-metin-card p-6">
        <h3 className="text-lg font-bold text-white mb-4">🎮 Mecánicas del Juego</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold text-metin-secondary mb-2">📈 Sistema de Nivelación</h4>
            <p className="text-sm text-gray-400">
              EXP requerida = Nivel² × 50<br />
              Al subir de nivel, tu HP se restaura a 100.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-metin-primary mb-2">💰 Recompensas</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Fácil: 10 EXP, 5 oro</li>
              <li>• Normal: 25 EXP, 15 oro</li>
              <li>• Difícil: 50 EXP, 30 oro</li>
              <li>• Épico: 100 EXP, 60 oro</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-metin-info mb-2">⚔️ Tipos de Misiones</h4>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Hábitos: Rutinas repetibles</li>
              <li>• Diarias: Renuevan cada día</li>
              <li>• Pendientes: Una sola vez</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;