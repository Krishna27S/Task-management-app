import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../redux/taskSlice';

const TaskForm = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createTask(task));
    setTask({
      title: '',
      description: '',
      priority: 'MEDIUM',
      dueDate: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg p-6 mx-auto bg-white rounded-lg shadow">
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">Title</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">Description</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          rows={3}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">Priority</label>
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-2 text-sm font-bold text-gray-700">Due Date</label>
        <input
          type="date"
          value={task.dueDate}
          onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
          className="w-full px-3 py-2 border rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;