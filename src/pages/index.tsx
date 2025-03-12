import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../redux/taskSlice';
import { RootState } from '../redux/store';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

export default function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.items);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="mb-8 text-3xl font-bold text-center">Task Management</h1>
        <TaskForm />
        <div className="mt-8">
          <TaskList />
        </div>
      </div>
    </div>
  );
}