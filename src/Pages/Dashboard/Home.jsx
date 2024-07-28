import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { format } from 'date-fns';
import DashboardLayout from '../../components/DashboardLayout';

function Home() {
  const token = localStorage.getItem('token');
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    titre: '',
    description: '',
    date_echeance: '',
    statut: 'NON_COMMENCEE',
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (task) => {
    setEditingTask(task.id);
    setFormData({
      titre: task.titre,
      description: task.description,
      date_echeance: task.date_echeance,
      statut: task.statut,
    });
  };

  const handleSave = async () => {
    try {
      if (editingTask != 1) {
        // Update an existing task
        await axios.put(`http://localhost:8000/api/tasks/${editingTask}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
      } else {
        // Add a new task
        await axios.post('http://localhost:8000/api/tasks', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
      }
      fetchTasks();
      setFormData({
        titre: '',
        description: '',
        date_echeance: '',
        statut: 'NON_COMMENCEE',
      });
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  //calcule des statistiques
  const calculateStats = () => {
    const total = tasks.length;
    const inProgress = tasks.filter(task => task.statut === 'EN_COURS').length;
    const completed = tasks.filter(task => task.statut === 'TERMINEE').length;
    return { total, inProgress, completed };
  };
  const stats = calculateStats();


  return (
    <DashboardLayout stats ={stats}>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-primary">Tasks</h2>
          <button
            onClick={() => {
              setEditingTask(1); // Ensure no task is being edited
              setFormData({
                titre: 'New Task',
                description: '',
                date_echeance: '',
                statut: 'NON_COMMENCEE',
              });
            }}
            className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition"
          >
            Add Task
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{task.titre}</h3>
              <p className="text-gray-600">Due Date: {format(new Date(task.date_echeance), 'MMM dd, yyyy')}</p>
              <p className={`mt-2 px-3 py-1 rounded-full text-white ${task.statut === 'EN_COURS' ? 'bg-yellow-500' : task.statut === 'TERMINEE' ? 'bg-green-500' : 'bg-gray-500'}`}>
                {task.statut.replace('_', ' ').toUpperCase()}
              </p>
              <div className="mt-4 flex justify-end gap-4">
                <button onClick={() => handleEdit(task)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit className="w-5 h-5" />
                </button>
                <button onClick={() => handleDelete(task.id)} className="text-red-500 hover:text-red-700">
                  <FaTrashAlt className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        {(editingTask !== null ) && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">
                {editingTask == 1 ? 'Add Task': 'Edit Task' }
              </h3>
              <input
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                placeholder="Title"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <input
                type="date"
                name="date_echeance"
                value={formData.date_echeance}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              />
              <select
                name="statut"
                value={formData.statut}
                onChange={handleChange}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
              >
                <option value="NON_COMMENCEE">Not Started</option>
                <option value="EN_COURS">In Progress</option>
                <option value="TERMINEE">Completed</option>
              </select>
              <button
                onClick={handleSave}
                className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingTask(null);
                  setFormData({
                    titre: '',
                    description: '',
                    date_echeance: '',
                    statut: 'NON_COMMENCEE',
                  });
                }}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow ml-4 hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Home;
