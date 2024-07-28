import React from 'react';
import { FaTasks, FaHourglassHalf, FaCheckCircle } from 'react-icons/fa';

function TaskStats({ total, inProgress, completed }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Total Tasks</h3>
          <p className="text-2xl font-bold text-gray-900">{total}</p>
        </div>
        <div className="bg-blue-100 text-blue-500 p-4 rounded-full">
          <FaTasks className="w-8 h-8" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">In Progress</h3>
          <p className="text-2xl font-bold text-gray-900">{inProgress}</p>
        </div>
        <div className="bg-yellow-100 text-yellow-500 p-4 rounded-full">
          <FaHourglassHalf className="w-8 h-8" />
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
          <p className="text-2xl font-bold text-gray-900">{completed}</p>
        </div>
        <div className="bg-green-100 text-green-500 p-4 rounded-full">
          <FaCheckCircle className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

export default TaskStats;
