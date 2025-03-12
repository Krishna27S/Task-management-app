import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters } from '../redux/taskSlice';
import { Task } from '../types/task';

interface TaskFiltersProps {
  onSearch: (searchTerm: string) => void;
}

const TaskFilters = ({ onSearch }: TaskFiltersProps) => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState<Task['status'] | 'ALL'>('ALL');
  const [priority, setPriority] = useState<Task['priority'] | 'ALL'>('ALL');

  useEffect(() => {
    dispatch(setFilters({ searchTerm, status, priority }));
  }, [searchTerm, status, priority, dispatch]);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Tasks
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              onSearch(e.target.value);
            }}
            placeholder="Search by title..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Task['status'] | 'ALL')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Statuses</option>
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task['priority'] | 'ALL')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ALL">All Priorities</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;