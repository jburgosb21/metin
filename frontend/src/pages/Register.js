import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!email || !username || !password || !confirmPassword) {
      setError('Por favor, completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    const result = await register(email, password, username);
    if (result.success) {
      navigate('/');
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-metin-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* RPG Header */}
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-br from-metin-secondary to-emerald-900 rounded-xl mb-4">
            <span className="text-3xl font-bold text-white">METIN</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Crear Cuenta</h1>
          <p className="text-gray-400">Comienza tu aventura en la productividad RPG</p>
        </div>

        {/* Register Form */}
        <div className="rpg-border bg-metin-card p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-metin-primary text-white"
                placeholder="aventurero@ejemplo.com"
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Nombre de Aventurero</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-metin-primary text-white"
                placeholder="DragónSlayer42"
                disabled={loading}
              />
              <p className="mt-1 text-xs text-gray-500">Este será tu nombre en el juego</p>
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-metin-primary text-white"
                placeholder="••••••••"
                disabled={loading}
              />
              <p className="mt-1 text-xs text-gray-500">Mínimo 6 caracteres</p>
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-metin-primary text-white"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-metin-secondary to-emerald-700 hover:from-emerald-700 hover:to-metin-secondary text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creando personaje...
                </span>
              ) : (
                '⚔️ Comenzar Aventura'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-gray-500 text-sm">O</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <p className="text-gray-400">
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="text-metin-primary hover:text-violet-400 font-medium">
                Iniciar Sesión
              </Link>
            </p>
          </div>
        </div>

        {/* RPG Stats Preview */}
        <div className="mt-8 rpg-border bg-metin-card p-6">
          <h3 className="text-lg font-bold text-white mb-3">🌟 Tu Personaje Inicial</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-900/50 rounded">
              <div className="text-2xl mb-1">1</div>
              <div className="text-sm text-gray-400">Nivel</div>
            </div>
            <div className="text-center p-3 bg-gray-900/50 rounded">
              <div className="text-2xl mb-1">100</div>
              <div className="text-sm text-gray-400">HP</div>
            </div>
            <div className="text-center p-3 bg-gray-900/50 rounded">
              <div className="text-2xl mb-1">0</div>
              <div className="text-sm text-gray-400">EXP</div>
            </div>
            <div className="text-center p-3 bg-gray-900/50 rounded">
              <div className="text-2xl mb-1">0</div>
              <div className="text-sm text-gray-400">Oro</div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-500 text-center">
            Gana EXP completando tareas. Sube de nivel para desbloquear habilidades especiales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;