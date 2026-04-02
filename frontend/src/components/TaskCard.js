import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const { api, updateUserStats } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [isCompleting, setIsCompleting] = useState(false);
  const taskType = task.type.toLowerCase();

  const difficultyLabels = {
    ONE: { label: 'Fácil', color: 'bg-green-500', exp: 10, gold: 5 },
    TWO: { label: 'Normal', color: 'bg-blue-500', exp: 25, gold: 15 },
    THREE: { label: 'Difícil', color: 'bg-orange-500', exp: 50, gold: 30 },
    FOUR: { label: 'Épico', color: 'bg-purple-500', exp: 100, gold: 60 },
  };

  const typeIcons = {
    habit: '🔄',
    daily: '📅',
    todo: '✅',
  };

  const difficulty = difficultyLabels[task.difficulty] || difficultyLabels.ONE;

  const handleComplete = async () => {
    if (isCompleting) return;
    setIsCompleting(true);

    try {
      const response = await api.patch(`/tasks/${task.id}/complete`);
      onUpdate(response.data.task);
      updateUserStats(response.data.user);
      
      // Show reward notification
      const reward = response.data.reward;
      alert(`🎉 ¡Tarea completada!\n+${reward.exp} EXP\n+${reward.gold} oro`);
    } catch (error) {
      console.error('Failed to complete task:', error);
      alert('Failed to complete task: ' + (error.response?.data?.error || error.message));
    } finally {
      setIsCompleting(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await api.put(`/tasks/${task.id}`, {
        title: editTitle,
      });
      onUpdate(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task:', error);
      alert('Failed to update task: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('¿Eliminar esta tarea?')) return;

    try {
      await api.delete(`/tasks/${task.id}`);
      onDelete(task.id);
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert('Failed to delete task: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleToggle = async () => {
    try {
      const response = await api.put(`/tasks/${task.id}`, {
        completed: !task.completed,
      });
      onUpdate(response.data);
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  return (
    <div className={`rpg-border p-4 transition-all duration-200 hover:border-metin-border ${
      task.completed ? 'bg-gray-900/50 opacity-75' : 'bg-gray-900'
    }`}>
      {/* Task Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-xl">{typeIcons[taskType]}</span>
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="px-2 py-1 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-metin-primary"
              autoFocus
            />
          ) : (
            <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
              {task.title}
            </h4>
          )}
        </div>
        <span className={`px-2 py-1 text-xs rounded ${difficulty.color} text-white`}>
          {difficulty.label}
        </span>
      </div>

      {/* Task Info */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-400">
          <span className="inline-flex items-center mr-4">
            <span className="mr-1">⭐</span>
            <span>{difficulty.exp} EXP</span>
          </span>
          <span className="inline-flex items-center">
            <span className="mr-1">💰</span>
            <span>{difficulty.gold} oro</span>
          </span>
        </div>
        <div className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
        <div className="flex items-center space-x-2">
          {taskType !== 'habit' && (
            <button
              onClick={handleComplete}
              disabled={task.completed || isCompleting}
              className={`px-3 py-1 text-sm rounded transition-all ${
                task.completed || isCompleting
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-green-700 hover:bg-green-600 text-white'
              }`}
            >
              {isCompleting ? 'Procesando...' : 'Completar'}
            </button>
          )}
          
          {taskType === 'habit' && (
            <button
              onClick={handleToggle}
              className={`px-3 py-1 text-sm rounded transition-all ${
                task.completed
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-blue-700 hover:bg-blue-600 text-white'
              }`}
            >
              {task.completed ? 'Reiniciar' : 'Marcar'}
            </button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleUpdate}
                className="px-2 py-1 text-xs bg-metin-primary hover:bg-violet-700 text-white rounded"
              >
                Guardar
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditTitle(task.title);
                }}
                className="px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-white"
                title="Editar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button
                onClick={handleDelete}
                className="p-1 text-gray-400 hover:text-red-400"
                title="Eliminar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Completion Status */}
      {task.completed && (
        <div className="mt-3 pt-2 border-t border-gray-800 text-xs text-green-400">
          ✅ Completada el {new Date(task.updatedAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default TaskCard;