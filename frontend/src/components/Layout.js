import React from 'react';
import Navbar from './Navbar';
import StatBar from './StatBar';
import { useAuth } from '../contexts/AuthContext';

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-metin-dark">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        {user && (
          <div className="mb-8 rpg-border bg-metin-card p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-2">
                  Bienvenido, <span className="text-metin-primary">{user.username}</span>
                </h1>
                <p className="text-gray-400">
                  Nivel {user.level} • {user.exp}/{user.requiredExp} EXP • {user.gold} oro
                </p>
              </div>
              <div className="flex-1 max-w-2xl">
                <StatBar
                  label="HP"
                  current={user.hp}
                  max={100}
                  color="metin-hp"
                  icon="❤️"
                />
                <StatBar
                  label="EXP"
                  current={user.exp}
                  max={user.requiredExp}
                  color="metin-exp"
                  icon="⭐"
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="rpg-border bg-metin-card p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>Metin RPG • Sistema de productividad • {new Date().getFullYear()}</p>
          <p className="mt-1">Completa tareas para ganar EXP y oro</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;