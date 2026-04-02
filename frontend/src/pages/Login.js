import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    const result = await login(email, password);
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
          <div className="inline-block p-4 bg-gradient-to-br from-metin-primary to-purple-900 rounded-xl mb-4">
            <span className="text-3xl font-bold text-white">METIN</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Iniciar Sesión</h1>
          <p className="text-gray-400">Aventúrate en la productividad RPG</p>
        </div>

        {/* Login Form */}
        <div className="rpg-border bg-metin-card p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-900/30 border border-red-700 rounded text-red-300 text-sm">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
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

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-metin-primary text-white"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-metin-primary to-violet-700 hover:from-violet-700 hover:to-metin-primary text-white font-semibold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Conectando...
                </span>
              ) : (
                '🎮 Ingresar al Reino'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 h-px bg-gray-700"></div>
            <span className="px-4 text-gray-500 text-sm">O</span>
            <div className="flex-1 h-px bg-gray-700"></div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-gray-400">
              ¿Nuevo aventurero?{' '}
              <Link to="/register" className="text-metin-primary hover:text-violet-400 font-medium">
                Crear una cuenta
              </Link>
            </p>
          </div>
        </div>

        {/* RPG Footer */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>Completa misiones (tareas) para ganar EXP y subir de nivel</p>
          <p className="mt-1">Cada nivel requiere más EXP: Nivel² × 50</p>
        </div>
      </div>
    </div>
  );
};

export default Login;