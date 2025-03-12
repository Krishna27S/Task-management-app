import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import TaskFilters from './TaskFilters';

const TaskList = () => {
  const { filteredItems: tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  const handleSearch = (searchTerm: string) => {
    // Search is handled through Redux now
    console.log('Searching for:', searchTerm);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <TaskFilters onSearch={handleSearch} />
      
      {tasks.length === 0 ? (
        <div className="text-center text-gray-500 p-4">
          No tasks found. Try adjusting your filters or add a new task.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* ... existing task card rendering ... */}
        </div>
      )}
    </div>
  );
};

export default TaskList;