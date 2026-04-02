import React, { useState } from 'react';
import TaskCard from './TaskCard';
import { useAuth } from '../contexts/AuthContext';

const TaskColumn = ({ type, title, description, tasks, onTaskUpdate, onTaskDelete }) => {
  const { api } = useAuth();
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDifficulty, setNewTaskDifficulty] = useState('ONE');

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const response = await api.post('/tasks', {
        title: newTaskTitle,
        type: type.toLowerCase(),
        difficulty: newTaskDifficulty
      });

      onTaskUpdate(response.data);
      setNewTaskTitle('');
      setNewTaskDifficulty('ONE');
      setIsAdding(false);
    } catch (error) {
      console.error('Failed to add task:', error);
      alert('Failed to add task: ' + (error.response?.data?.error || error.message));
    }
  };

  const difficultyOptions = [
    { value: 'ONE', label: 'Fácil', color: 'bg-green-500' },
    { value: 'TWO', label: 'Normal', color: 'bg-blue-500' },
    { value: 'THREE', label: 'Difícil', color: 'bg-orange-500' },
    { value: 'FOUR', label: 'Épico', color: 'bg-purple-500' },
  ];

  const typeColors = {
    habit: 'bg-metin-secondary',
    daily: 'bg-metin-primary',
    todo: 'bg-metin-info',
  };

  return (
    <div className="rpg-border bg-metin-card p-4 h-full">
      {/* Column Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-8 ${typeColors[type] || 'bg-gray-600'} rounded`}></div>
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
            {tasks.length} tareas
          </span>
        </div>
        <p className="text-gray-400 text-sm mb-4">{description}</p>
      </div>

      {/* Add Task Button */}
      {!isAdding ? (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full mb-6 p-3 border-2 border-dashed border-metin-border hover:border-metin-primary hover:bg-metin-border/30 rounded-lg transition-all duration-200 group"
        >
          <div className="flex items-center justify-center space-x-2 text-gray-400 group-hover:text-metin-primary">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Añadir {type === 'habit' ? 'hábito' : type === 'daily' ? 'diaria' : 'pendiente'}</span>
          </div>
        </button>
      ) : (
        <form onSubmit={handleAddTask} className="mb-6 p-4 bg-metin-border/30 rounded-lg border border-metin-border">
          <div className="mb-3">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Título de la tarea"
              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded focus:outline-none focus:border-metin-primary"
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-2">Dificultad:</label>
            <div className="flex flex-wrap gap-2">
              {difficultyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setNewTaskDifficulty(option.value)}
                  className={`px-3 py-1 rounded text-sm transition-all ${
                    newTaskDifficulty === option.value
                      ? `${option.color} text-white`
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-metin-primary hover:bg-violet-700 text-white rounded transition-colors duration-200"
            >
              Crear
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAdding(false);
                setNewTaskTitle('');
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors duration-200"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Tasks List */}
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p>No hay tareas {type === 'habit' ? 'hábitos' : type === 'daily' ? 'diarias' : 'pendientes'}</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onUpdate={onTaskUpdate}
              onDelete={onTaskDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskColumn;