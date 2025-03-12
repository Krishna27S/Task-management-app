import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, updateTask } from '../redux/taskSlice';
import { RootState } from '../redux/store';

const TaskList = () => {
  const dispatch = useDispatch();
  const { items: tasks, loading, error } = useSelector((state: RootState) => state.tasks);

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

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 p-4">
        No tasks found. Add a new task to get started!
      </div>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-100 text-red-800';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800';
      case 'LOW':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <div key={task._id} className="bg-white rounded-lg shadow-md p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <span className={`px-2 py-1 rounded text-sm ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
          <p className="text-gray-600 mb-4">{task.description}</p>
          <div className="flex justify-between items-center">
            <select
              value={task.status}
              onChange={(e) => dispatch(updateTask({ 
                id: task._id, 
                changes: { status: e.target.value } 
              }))}
              className="px-2 py-1 rounded border border-gray-300 text-sm"
            >
              <option value="TODO">Todo</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
            <button
              onClick={() => dispatch(deleteTask(task._id))}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;