import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.items);
  const loading = useSelector((state: RootState) => state.tasks.loading);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {tasks.map((task) => (
        <div key={task._id} className="p-4 bg-white rounded-lg shadow">
          <h3 className="mb-2 text-lg font-semibold">{task.title}</h3>
          <p className="mb-3 text-gray-600">{task.description}</p>
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded ${
              task.priority === 'HIGH' ? 'bg-red-100 text-red-800' :
              task.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {task.priority}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;