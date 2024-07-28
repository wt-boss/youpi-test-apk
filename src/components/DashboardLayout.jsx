import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskStats from './TaskStats';
import axios from '../axios' ;


function DashboardLayout({ children, stats }) {
const navigate = useNavigate() ;
const token = localStorage.getItem('token');

const onLogout = async () => {
        try {
          // Appel à l'API de déconnexion
          await axios.post(
            'http://localhost:8000/api/logout',
            {},
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'X-Requested-With': 'XMLHttpRequest',
              },
            }
          );
          
          // Supprimer le token d'authentification du stockage local
          localStorage.removeItem('token');
    
          // Redirection vers la page de connexion
          navigate('/login');
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-[#e0e7fc] to-[#f3f7fb]">
      <header className="bg-white shadow-md py-4 px-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-extrabold text-gray-800">TaskManager</h1>
          <p className="text-gray-600"></p>
          <button
            onClick={onLogout}
            className="bg-secondary text-white px-4 py-2 rounded-lg shadow-md opacity-80 hover:opacity-100 transition duration-300"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex-grow p-6">
        <TaskStats total={stats.total}
    inProgress={stats.inProgress}
    completed={stats.completed}></TaskStats>
        <div className="container mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
